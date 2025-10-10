import {ValidElement, ValidTag} from "../../core.types";

/**
 * @type {ChildHandler}
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Node | ShadowRoot;

declare module "../turboSelector" {
    interface TurboSelector {

        //Readonly fields

        /**
         * @description The child handler object associated with the node. It is the node itself (if it is handling
         * its children) or its shadow root (if defined). Set it to change the node where the children are added/
         * removed/queried from when manipulating the node's children.
         */
        childHandler: ChildHandler;

        /**
         * @description Static array of all the child nodes of the node.
         */
        readonly childNodesArray: Node[];

        /**
         * @description Static array of all the child elements of the node.
         */
        readonly childrenArray: Element[];

        /**
         * @description Static array of all the sibling nodes (including the node itself) of the node.
         */
        readonly siblingNodes: Node[];

        /**
         * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
         */
        readonly siblings: Element[];

        //Self manipulation

        bringToFront(): this;

        sendToBack(): this;

        /**
         * @description Removes the node from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;

        //Parent manipulation

        /**
         * @description Add one or more children to the referenced parent node.
         * @param {Node} [parent] - Array of (or single) child nodes.
         * @param {number} [index] - The position at which to add the child relative to the parent's child list.
         * Leave undefined to add the child at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addToParent(parent: Node, index?: number, referenceList?: Node[] | NodeListOf<Node>): this;

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
        addChild(children?: Node | Node[], index?: number, referenceList?: Node[] | NodeListOf<Node>): this;

        /**
         * @description Remove one or more children from the referenced parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {this} Itself, allowing for method chaining.
         */
        remChild(children?: Node | Node[]): this;

        /**
         * @description Add one or more children to the referenced parent node before the provided sibling. If the
         * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
         * @param {Node} [sibling] - The sibling node to insert the children before.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChildBefore(children?: Node | Node[], sibling?: Node): this;

        /**
         * @description Remove one or more child nodes from the referenced parent node.
         * @param {number} [index] - The index of the child(ren) to remove.
         * @param {number} [count=1] - The number of children to remove.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeChildAt(index?: number, count?: number, referenceList?: Node[] | NodeListOf<Node>): this;

        /**
         * @description Remove all children of the node.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * representing all the nodes to remove. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllChildren(referenceList?: Node[] | NodeListOf<Node>): this;

        //Child identification

        /**
         * @description Returns the child of the parent node at the given index. Any number inputted (including negatives)
         * will be reduced modulo length of the list size.
         * @param {number} [index] - The index of the child to retrieve.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {Node | Element | null} The child at the given index, or `null` if the index is invalid.
         */
        childAt<ChildType extends Node | Element>(index?: number, referenceList?: ChildType[] | NodeListOf<ChildType>)
            : ChildType | null;

        /**
         * @description Returns the index of the given child.
         * @param {Node} [child] - The child element to find.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
         */
        indexOfChild(child?: Node, referenceList?: Node[] | NodeListOf<Node>): number;

        /**
         * @description Identify whether one or more children belong to this parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
         */
        hasChild(children?: Node | Node[]): boolean;

        /**
         * @description Finds whether one or more children belong to this node.
         * @param {Node | Node[]} [children] - The child or children to check.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        findInSubTree(children?: Node | Node[]): boolean;

        //Parent identification

        /**
         * @description Finds whether this node is within the given parent(s).
         * @param {Node | Node[]} [parents] - The parent(s) to check.
         * @returns {boolean} True if the node is within the given parents, false otherwise.
         */
        findInParents(parents?: Node | Node[]): boolean;

        /**
         * @description Finds whether one or more children belong to this node.
         * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
         * reference for index placement. Defaults to the node's `siblings`.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        indexInParent(referenceList?: Node[]): number;

        /**
         * @description Removes the element from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;

        /**
         * Finds the closest ancestor of the current element (or the current element itself) that matches the provided
         * CSS selector or element type.
         * @param {ValidTag | (new (...args: any[]) => Element)} type - The (valid) CSS selector string, or element
         * constructor/class to match.
         * @returns {Element | null} The matching ancestor element, or null if no match is found.
         */
        closest<Type extends ValidTag>(type: Type): ValidElement<Type> | null;
        closest<Type extends Element>(type: new (...args: any[]) => Type): Type | null;
    }
}

export {ChildHandler};
