import "./childManipulation.types";
import {ValidElement, ValidTag} from "../../core.types";

function addChildManipulationToElementPrototype() {
    const originalRemoveChild = Node.prototype.removeChild;
    const originalRemove = Element.prototype.remove;
    const originalClosest = Element.prototype.closest;

    //Readonly fields

    /**
     * @description The child handler object associated with the node. It is the node itself (if it is handling
     * its children) or its shadow root (if defined). Set it to change the node where the children are added/removed/
     * queried from when manipulating the node's children.
     */
    Object.defineProperty(Node.prototype, "childHandler", {
        set: function (value?: Node) {
            this["__childHandler__"] = value;
        },
        get: function () {
            if (this["__childHandler__"]) return this["__childHandler__"];
            if (this instanceof Element && this.shadowRoot) return this.shadowRoot;
            return this;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the child nodes of the node.
     */
    Object.defineProperty(Node.prototype, "childNodesArray", {
        get: function () {
            return Array.from(this.childHandler.childNodes);
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the child elements of the node.
     */
    Object.defineProperty(Node.prototype, "childrenArray", {
        get: function () {
            return this.childNodesArray.filter((node: Node) => node.nodeType === 1);
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the sibling nodes (including the node itself) of the node.
     */
    Object.defineProperty(Node.prototype, "siblingNodes", {
        get: function () {
            return this.parentNode?.childNodesArray || [];
        },
        configurable: false,
        enumerable: true
    });

    /**
     * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
     */
    Object.defineProperty(Node.prototype, "siblings", {
        get: function () {
            return this.parentElement?.childrenArray;
        },
        configurable: false,
        enumerable: true
    });

    //Self manipulation

    Node.prototype.bringToFront = function _bringToFront<Type extends Node>(this: Type): Type {
        this.parentNode?.addChild(this);
        return this;
    }

    Node.prototype.sendToBack = function _sendToBack<Type extends Node>(this: Type): Type {
        this.parentNode?.addChild(this, 0);
        return this;
    }

    /**
     * @description Removes the node from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.remove = function _remove<Type extends Node>(this: Type): Type {
        this.parentNode?.removeChild(this);
        return this;
    };

    /**
     * @description Removes the element from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.remove = function _remove<Type extends Element>(this: Type): Type {
        originalRemove.call(this);
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
    Node.prototype.addChild = function _addChild<Type extends Node>(
        this: Type, children?: Node | Node[], index?: number,
        referenceList: Node[] | NodeListOf<Node> = this.childrenArray): Type {
        if (!this || !children) return this;

        if (index !== undefined && (index < 0 || index > referenceList.length)) index = undefined;

        if (index != undefined) this.addChildBefore(children, referenceList[index]);
        else try {
            // Try to append every provided child (according to its type)
            if (!Array.isArray(children)) children = [children];
            children.forEach((child: Element) => {
                this.childHandler.appendChild(child);
                if (child["__outName"] && !this[child["__outName"]]) this[child["__outName"]] = child;
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
    Node.prototype.removeChild = function _removeChild<Type extends Node>(this: Type, children?: Node | Node[]): Type {
        if (!this || !children) return this;

        // Try to remove every provided child (according to its type)
        try {
            if (!Array.isArray(children)) originalRemoveChild.call(this.childHandler, children);
            else children.forEach(child => originalRemoveChild.call(this.childHandler, child));
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
    Node.prototype.addChildBefore = function _addChildBefore<Type extends Node>
    (this: Type, children?: Node | Node[], sibling?: Node): Type {
        if (!this || !children) return this;
        if (!sibling) return this.addChild(children);

        // Try to append every provided child (according to its type)
        try {
            if (!Array.isArray(children)) {
                this.childHandler.insertBefore(children, sibling);
            } else {
                children.forEach((child: Element) => this.childHandler.insertBefore(child, sibling));
            }
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
    Node.prototype.removeChildAt = function _removeChildAt<Type extends Node>(
        this: Type, index?: number, count: number = 1,
        referenceList: Node[] | NodeListOf<Node> = this.childrenArray
    ): Type {
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
    Node.prototype.removeAllChildren = function _removeAllChildren<Type extends Node>(
        this: Type, referenceList: Node[] | NodeListOf<Node> = this.childrenArray): Type {
        if (!this) return this;

        try {
            for (let i = 0; i < referenceList.length; i++) {
                this.removeChild(referenceList[i]);
            }
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
    Node.prototype.childAt = function _childAt<ChildType extends Node | Element>(
        this: Node, index?: number,
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
    Node.prototype.indexOfChild = function _indexOfChild(
        this: Node, child?: Node,
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
    Node.prototype.hasChild = function _hasChild(this: Node, children?: Node | Node[]): boolean {
        if (!this || !children) return false;

        const nodesArray = Array.from(this.childNodes) as Node[];
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
    Element.prototype.closest = function _closest<TagOrType extends ValidTag | (new (...args: any[]) => Element)>(
        this: Element,
        type: TagOrType | (new (...args: any[]) => TagOrType)
    ): (TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType) | null {
        if (!this || !type) return null;

        if (typeof type === "string") {
            return originalClosest.call(this, type) as TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType;
        } else if (typeof type === "function") {
            let element: Element | null = this;
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
    Node.prototype.findInParents = function _findInParents(this: Node, parents?: Node | Node[]): boolean {
        if (!parents) return false;
        if (parents instanceof Node) parents = [parents];

        let element = this;
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
    Node.prototype.findInSubTree = function _findInSubTree(this: Node, children?: Node | Node[]): boolean {
        if (!children) return false;
        if (children instanceof Node) children = [children];
        let count = 0;

        const recur = (node: Node) => {
            if (children.includes(node)) count++;
            if (count >= children.length) return;
            node.childNodes.forEach(child => recur(child));
        };

        recur(this);
        return count >= children.length;
    };

    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
     * reference for index placement. Defaults to the node's `siblings`.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    Node.prototype.indexInParent = function _indexInParent(this: Node, referenceList: Node[] = this.siblings as Node[])
        : number {
        if (!referenceList) return -1;
        return referenceList.indexOf(this);
    };
}

export {addChildManipulationToElementPrototype};