import "./hierarchy.types";
import {ValidElement, ValidTag} from "../../core.types";
import {$, TurboSelector} from "../turboFunctions";
import {HierarchyFunctionsUtils} from "./hierarchy.utils";

const utils = new HierarchyFunctionsUtils();

function setupHierarchyFunctions() {
    //Readonly fields

    /**
     * @description The child handler object associated with the node. It is the node itself (if it is handling
     * its children) or its shadow root (if defined). Set it to change the node where the children are added/removed/
     * queried from when manipulating the node's children.
     */
    Object.defineProperty(TurboSelector.prototype, "childHandler", {
        set: function (value?: Node) {
            if (value instanceof TurboSelector) value = value.element;
            utils.data(this).childHandler = value;
        },
        get: function () {
            const childHandler = utils.data(this).childHandler;
            if (childHandler) return childHandler;
            if (this.element instanceof Element && this.element.shadowRoot) return this.element.shadowRoot;
            return this.element;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the child nodes of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "childNodesArray", {
        get: function () {
            return Array.from(this.childHandler?.childNodes) || [];
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the child elements of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "childrenArray", {
        get: function () {
            return this.childNodesArray.filter((node: Node) => node.nodeType === 1);
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the sibling nodes (including the node itself) of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "siblingNodes", {
        get: function () {
            const parent = this.element?.parentNode;
            if (!parent) return [];
            return $(parent).childNodesArray || [];
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "siblings", {
        get: function () {
            const parent = this.element?.parentElement;
            if (!parent) return [];
            return $(parent).childrenArray || [];
        },
        configurable: false,
        enumerable: true
    });

    //Self manipulation

    TurboSelector.prototype.bringToFront = function _bringToFront(this: TurboSelector): TurboSelector {
        const parent = this.element?.parentNode;
        if (!parent) return this;
        $(parent).addChild(this.element);
        return this;
    }

    TurboSelector.prototype.sendToBack = function _sendToBack(this: TurboSelector): TurboSelector {
        const parent = this.element?.parentNode;
        if (!parent) return this;
        $(parent).addChild(this.element, 0);
        return this;
    }

    /**
     * @description Removes the node from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.remove = function _remove(this: TurboSelector): TurboSelector {
        this.element?.parentNode?.removeChild(this.element);
        return this;
    };

    //Child manipulation

    /**
     * @description Add one or more children to the referenced parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @param {number} [index] - The position at which to add the child relative to the parent's child list.
     * Leave undefined to add the child at the end.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addChild = function _addChild(
        this: TurboSelector, children?: Node | Node[], index?: number,
        referenceList: Node[] | NodeListOf<Node> = this.childrenArray): TurboSelector {
        if (!this || !children) return this;

        if (index !== undefined && (index < 0 || index > referenceList.length)) index = undefined;

        if (index != undefined) this.addChildBefore(children, referenceList[index]);
        else try {
            // Try to append every provided child (according to its type)
            if (!Array.isArray(children)) children = [children];
            children.forEach((child: Element) => {
                if (!child) return;
                if (child instanceof TurboSelector) child = child.element;
                this.childHandler.appendChild(child);
                //TODO
                // if (child["__outName"] && !this[child["__outName"]]) this[child["__outName"]] = child;
            });
        } catch (e) {
            console.error(e);
        }

        return this;
    };

    /**
     * @description Remove one or more children from the referenced parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.remChild = function _remChild(this: TurboSelector, children?: Node | Node[]): TurboSelector {
        if (!this || !children) return this;

        // Try to remove every provided child (according to its type)
        try {
            if (!Array.isArray(children)) children = [children];
            children.forEach(child => {
                if (!child) return;
                if (child instanceof TurboSelector) child = child.element;
                this.childHandler.removeChild(child);
            });
        } catch (e) {
            console.error(e);
        }

        return this;
    };

    /**
     * @description Add one or more children to the referenced parent node before the provided sibling. If the
     * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
     * @param {Node} [sibling] - The sibling node to insert the children before.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addChildBefore = function _addChildBefore
    (this: TurboSelector, children?: Node | Node[], sibling?: Node): TurboSelector {
        if (!this || !children) return this;
        if (!sibling) return this.addChild(children);

        // Try to append every provided child (according to its type)
        try {
            if (!Array.isArray(children)) children = [children];
            children.forEach((child: Element) => {
                if (!child) return;
                if (child instanceof TurboSelector) child = child.element;
                this.childHandler.insertBefore(child, sibling);
            });
        } catch (e) {
            console.error(e);
        }

        return this;
    };

    /**
     * @description Remove one or more child nodes from the referenced parent node.
     * @param {number} [index] - The index of the child(ren) to remove.
     * @param {number} [count=1] - The number of children to remove.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeChildAt = function _removeChildAt(
        this: TurboSelector, index?: number, count: number = 1,
        referenceList: Node[] | NodeListOf<Node> = this.childrenArray
    ): TurboSelector {
        if (!this || index === undefined || index < 0) return this;

        if (index >= referenceList.length) return this;

        // Try to remove every provided child (according to its type)
        try {
            for (let i = index + count - 1; i >= index; i--) {
                if (i >= referenceList.length) continue;
                this.removeChild(referenceList[i]);
            }
        } catch (e) {
            console.error(e);
        }

        return this;
    };

    /**
     * @description Remove all children of the node.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * representing all the nodes to remove. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAllChildren = function _removeAllChildren(
        this: TurboSelector, referenceList: Node[] | NodeListOf<Node> = this.childrenArray): TurboSelector {
        if (!this) return this;

        try {
            for (let i = 0; i < referenceList.length; i++) this.removeChild(referenceList[i]);
        } catch (e) {
            console.error(e);
        }

        return this;
    };

    //Child identification

    /**
     * @description Returns the child of the parent node at the given index. Any number inputted (including negatives)
     * will be reduced modulo length of the list size.
     * @param {number} [index] - The index of the child to retrieve.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {Node | Element | null} The child at the given index, or `null` if the index is invalid.
     */
    TurboSelector.prototype.childAt = function _childAt<ChildType extends Node | Element>(
        this: TurboSelector, index?: number,
        referenceList: ChildType[] | NodeListOf<ChildType> = this.childrenArray as ChildType[]
    ): ChildType | null {
        if (!this || index === undefined) return null;

        if (index >= referenceList.length) index = referenceList.length - 1;
        while (index < 0) index += referenceList.length;
        return referenceList[index] as ChildType;
    };

    /**
     * @description Returns the index of the given child.
     * @param {Node} [child] - The child element to find.
     * @param {Node[] | Element[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
     */
    TurboSelector.prototype.indexOfChild = function _indexOfChild(
        this: TurboSelector, child?: Node,
        referenceList: Node[] | NodeListOf<Node> = this.childrenArray
    ): number {
        if (!this || !child) return -1;
        if (!(referenceList instanceof Array)) referenceList = Array.from(referenceList);
        return referenceList.indexOf(child);
    };

    /**
     * @description Identify whether one or more children belong to this parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
     */
    TurboSelector.prototype.hasChild = function _hasChild(this: TurboSelector, children?: Node | Node[]): boolean {
        if (!this || !children) return false;

        const nodesArray = Array.from(this.element?.childNodes) as Node[];
        if (children instanceof Node) return nodesArray.includes(children);

        for (const child of children) {
            if (!nodesArray.includes(child)) return false;
        }
        return true;
    };

    /**
     * Finds the closest ancestor of the current element (or the current element itself) that matches the provided
     * CSS selector or element type.
     * @param {ValidTag | (new (...args: any[]) => Element)} type - The (valid) CSS selector string, or element
     * constructor/class to match.
     * @returns {Element | null} The matching ancestor element, or null if no match is found.
     */
    TurboSelector.prototype.closest = function _closest<TagOrType extends ValidTag | (new (...args: any[]) => Element)>(
        this: TurboSelector,
        type: TagOrType | (new (...args: any[]) => TagOrType)
    ): (TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType) | null {
        if (!this || !type || !(this.element instanceof Element)) return null;

        if (typeof type === "string") {
            return this.element.closest(type) as TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType;
        } else if (typeof type === "function") {
            let element: Element | null = this.element;
            while (element && !(element instanceof type)) element = element.parentElement;
            return (element as TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType) || null;
        }
        return null;
    };

    //Parent identification

    /**
     * @description Finds whether this node is within the given parent(s).
     * @param {Node | Node[]} [parents] - The parent(s) to check.
     * @returns {boolean} True if the node is within the given parents, false otherwise.
     */
    TurboSelector.prototype.findInParents = function _findInParents(this: TurboSelector, parents?: Node | Node[]): boolean {
        if (!parents) return false;
        if (parents instanceof Node) parents = [parents];

        let element = this.element;
        let count = 0;

        while (element && count < parents.length) {
            if (parents.includes(element)) count++;
            element = element.parentNode;
        }

        return count === parents.length;
    };

    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node | Node[]} [children] - The child or children to check.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    TurboSelector.prototype.findInSubTree = function _findInSubTree(this: TurboSelector, children?: Node | Node[]): boolean {
        if (!children) return false;
        if (children instanceof Node) children = [children];
        let count = 0;

        const recur = (node: Node) => {
            if (children.includes(node)) count++;
            if (count >= children.length) return;
            node.childNodes.forEach(child => recur(child));
        };

        recur(this.element);
        return count >= children.length;
    };

    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
     * reference for index placement. Defaults to the node's `siblings`.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    TurboSelector.prototype.indexInParent = function _indexInParent(
        this: TurboSelector, referenceList: Node[] = this.siblings as Node[]): number {
        if (!referenceList) return -1;
        return referenceList.indexOf(this.element);
    };
}

export {setupHierarchyFunctions};