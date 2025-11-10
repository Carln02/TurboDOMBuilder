/**
 * @type {ChildHandler}
 * @group Types
 * @category Hierarchy
 *
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

        /**
         * @function bringToFront
         * @description Brings the element to the front amongst its siblings in the DOM.
         * @return {this} Itself for chaining.
         */
        bringToFront(): this;

        /**
         * @function sendToBack
         * @description Sends the element to the back amongst its siblings in the DOM.
         * @return {this} Itself for chaining.
         */
        sendToBack(): this;

        /**
         * @function remove
         * @description Removes the node from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;

        //Parent manipulation

        /**
         * @function addToParent
         * @description Add the element to the given parent node
         * @param {Node} parent - The parent node to attach the element to.
         * @param {number} [index] - The position at which to add the element relative to the parent's child list.
         * Leave undefined to add the element at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=parent.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the parent's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addToParent(parent: Node, index?: number, referenceList?: Node[] | NodeListOf<Node>): this;

        //Child manipulation

        /**
         * @function addChild
         * @description Add one or more children to the element.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @param {number} [index] - The position at which to add the child relative to the parent's child list.
         * Leave undefined to add the child at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChild(children?: Node | Node[], index?: number, referenceList?: Node[] | NodeListOf<Node>): this;

        /**
         * @function remChild
         * @description Remove one or more children from the element.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {this} Itself, allowing for method chaining.
         */
        remChild(children?: Node | Node[]): this;

        /**
         * @function addChildBefore
         * @description Add one or more children to the element before the provided sibling. If the
         * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
         * @param {Node} [sibling] - The sibling node to insert the children before.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChildBefore(children?: Node | Node[], sibling?: Node): this;

        /**
         * @function removeChildAt
         * @description Remove one or more child nodes from the element.
         * @param {number} [index] - The index of the child(ren) to remove.
         * @param {number} [count=1] - The number of children to remove.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeChildAt(index?: number, count?: number, referenceList?: Node[] | NodeListOf<Node>): this;

        /**
         * @function removeAllChildren
         * @description Remove all children of the node.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * representing all the nodes to remove. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllChildren(referenceList?: Node[] | NodeListOf<Node>): this;

        //Child identification

        /**
         * @function childAt
         * @description Returns the child of the parent node at the given index. Any number inputted (including
         * negatives) will be reduced modulo length of the list size.
         * @param {number} [index] - The index of the child to retrieve.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {Node} The child at the given index, or `null` if the index is invalid.
         */
        childAt(index?: number, referenceList?: Node[] | NodeListOf<Node>): Node;

        /**
         * @function indexOfChild
         * @description Returns the index of the given child.
         * @param {Node} [child] - The child element to find.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
         */
        indexOfChild(child?: Node, referenceList?: Node[] | NodeListOf<Node>): number;

        /**
         * @function hasChild
         * @description Identify whether one or more children belong to this parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
         */
        hasChild(children?: Node | Node[]): boolean;

        /**
         * @function findInSubTree
         * @description Finds whether one or more children belong to this node.
         * @param {Node | Node[]} [children] - The child or children to check.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        findInSubTree(children?: Node | Node[]): boolean;

        //Parent identification

        /**
         * @function findInParents
         * @description Finds whether this node is within the given parent(s).
         * @param {Node | Node[]} [parents] - The parent(s) to check.
         * @returns {boolean} True if the node is within the given parents, false otherwise.
         */
        findInParents(parents?: Node | Node[]): boolean;

        /**
         * @function indexInParent
         * @description Finds whether one or more children belong to this node.
         * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
         * reference for index placement. Defaults to the node's `siblings`.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        indexInParent(referenceList?: Node[]): number;

        /**
         * @overload
         * @function closest
         * @description Finds the closest ancestor of the current element (or the current element itself) that matches
         * the provided CSS selector.
         * @param {Type} type - The (valid) CSS selector string.
         * constructor/class to match.
         * @returns {Element} The matching ancestor element, or null if no match is found.
         */
        closest(type: string): Element;

        /**
         * @overload
         * @function closest
         * @template {Element} Type - The type of element to find.
         * @description Finds the closest ancestor of the current element (or the current element itself) that is an
         * instance of the given class.
         * @param {new (...args: any[]) => Type} type - The class to match.
         * constructor/class to match.
         * @returns {Element} The matching ancestor element, or null if no match is found.
         */
        closest<Type extends Element>(type: new (...args: any[]) => Type): Type;
    }
}

export {ChildHandler};
