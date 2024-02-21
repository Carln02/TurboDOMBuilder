/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base-functions.ts":
/*!*******************************!*\
  !*** ./src/base-functions.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeChild = exports.addChild = exports.toggleClass = exports.removeClass = exports.addClass = void 0;\nconst turbo_element_1 = __webpack_require__(/*! ./turbo-element */ \"./src/turbo-element.ts\");\n/**\n * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.\n * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element\n * @param {string | string[]} classes - String of classes separated by spaces, or array of strings\n */\nconst addClass = (element, classes) => {\n    if (!classes)\n        return;\n    //Extract HTML element\n    let el = element instanceof turbo_element_1.TurboElement ? element.element : element;\n    try {\n        // If string provided --> split by spaces\n        if (typeof classes === \"string\")\n            classes = classes.split(\" \");\n        classes.forEach(entry => el.classList.add(entry));\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return element;\n};\nexports.addClass = addClass;\n/**\n * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.\n * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element\n * @param {string | string[]} classes - String of classes separated by spaces, or array of strings\n */\nconst removeClass = (element, classes) => {\n    if (!classes)\n        return;\n    //Extract HTML element\n    let el = element instanceof turbo_element_1.TurboElement ? element.element : element;\n    try {\n        // If string provided --> split by spaces\n        if (typeof classes === \"string\")\n            classes = classes.split(\" \");\n        classes.forEach(entry => el.classList.remove(entry));\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return element;\n};\nexports.removeClass = removeClass;\n/**\n * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.\n * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element\n * @param {string | string[]} classes - String of classes separated by spaces, or array of strings\n */\nconst toggleClass = (element, classes) => {\n    if (!classes)\n        return;\n    //Extract HTML element\n    let el = element instanceof turbo_element_1.TurboElement ? element.element : element;\n    try {\n        // If string provided --> split by spaces\n        if (typeof classes === \"string\")\n            classes = classes.split(\" \");\n        classes.forEach(entry => el.classList.toggle(entry));\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return element;\n};\nexports.toggleClass = toggleClass;\n/**\n * @description Add children elements to a parent element.\n * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element\n * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child\n * Turbo or HTML DOM elements\n */\nconst addChild = (element, children) => {\n    if (!children)\n        return;\n    //Extract HTML element\n    let el = element instanceof turbo_element_1.TurboElement ? element.element : element;\n    //Try to append every provided child (according to its type)\n    try {\n        if (children instanceof turbo_element_1.TurboElement)\n            el.appendChild(children.element);\n        else if (children instanceof HTMLElement)\n            el.appendChild(children);\n        else\n            children.forEach(child => el.appendChild(child instanceof turbo_element_1.TurboElement ? child.element : child));\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return element;\n};\nexports.addChild = addChild;\n/**\n * @description Remove children elements from a parent element.\n * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element\n * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child\n * Turbo or HTML DOM elements\n */\nconst removeChild = (element, children) => {\n    if (!children)\n        return;\n    //Extract HTML element\n    let el = element instanceof turbo_element_1.TurboElement ? element.element : element;\n    //Try to remove every provided child (according to its type)\n    try {\n        if (children instanceof turbo_element_1.TurboElement)\n            el.removeChild(children.element);\n        else if (children instanceof HTMLElement)\n            el.removeChild(children);\n        else\n            children.forEach(child => el.removeChild(child instanceof turbo_element_1.TurboElement ? child.element : child));\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return element;\n};\nexports.removeChild = removeChild;\n\n\n//# sourceURL=webpack://turbodombuilder/./src/base-functions.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./turbo-element */ \"./src/turbo-element.ts\");\n__webpack_require__(/*! ./turbo-functions */ \"./src/turbo-functions.ts\");\n__webpack_require__(/*! ./base-functions */ \"./src/base-functions.ts\");\n\n\n//# sourceURL=webpack://turbodombuilder/./src/index.ts?");

/***/ }),

/***/ "./src/turbo-element.ts":
/*!******************************!*\
  !*** ./src/turbo-element.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TurboElement = void 0;\nconst base_functions_1 = __webpack_require__(/*! ./base-functions */ \"./src/base-functions.ts\");\n/**\n * @description A Turbo element. Basically an HTML element with added utility functions.\n */\nclass TurboElement {\n    /**\n     * @description Create a new Turbo element with the given properties.\n     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate\n     */\n    constructor(properties = {}) {\n        if (!properties.type)\n            properties.type = \"div\";\n        try {\n            //Create element of given type\n            this.element = document.createElement(properties.type);\n            //Set ID and custom CSS style (if any)\n            if (properties.id)\n                this.element.id = properties.id;\n            if (properties.style)\n                this.element.style.cssText = properties.style;\n            if (properties.text)\n                this.innerText = properties.text;\n            // Add classes and children\n            this.addClass(properties.classes);\n            this.addChild(properties.children);\n            // Append to parent (if provided)\n            if (properties.parent)\n                (0, base_functions_1.addChild)(properties.parent, [this.element]);\n        }\n        catch (e) {\n            //Create element of given type\n            this.element = document.createElement(\"div\");\n            console.error(e);\n        }\n    }\n    //Custom functions\n    /**\n     * @description Add one or more CSS classes to the element.\n     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.\n     * @returns This Turbo element instance for method chaining.\n     */\n    addClass(classes) {\n        (0, base_functions_1.addClass)(this.element, classes);\n        return this;\n    }\n    /**\n     * @description Remove one or more CSS classes from the element.\n     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.\n     * @returns This Turbo element instance for method chaining.\n     */\n    removeClass(classes) {\n        (0, base_functions_1.removeClass)(this.element, classes);\n        return this;\n    }\n    /**\n     * @description Toggle one or more CSS classes in the element.\n     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.\n     * @returns This Turbo element instance for method chaining.\n     */\n    toggleClass(classes) {\n        (0, base_functions_1.toggleClass)(this.element, classes);\n        return this;\n    }\n    /**\n     * @description Add one or more child elements to the element.\n     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child\n     * Turbo or HTML DOM elements\n     */\n    addChild(children) {\n        (0, base_functions_1.addChild)(this.element, children);\n        return this;\n    }\n    /**\n     * @description Remove one or more child elements from the element.\n     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child\n     * Turbo or HTML DOM elements\n     */\n    removeChild(children) {\n        (0, base_functions_1.removeChild)(this.element, children);\n        return this;\n    }\n    //Getters and setters\n    /**\n     * @description Get the underlying HTMLElement's style property.\n     */\n    get style() {\n        return this.element.style;\n    }\n    /**\n     * @description Get the underlying HTMLElement's classList property.\n     */\n    get classList() {\n        return this.element.classList;\n    }\n    /**\n     * @description Get the underlying HTMLElement's innerText property.\n     */\n    get innerText() {\n        return this.element.innerText;\n    }\n    /**\n     * @description Set the underlying HTMLElement's innerText property.\n     */\n    set innerText(text) {\n        this.element.innerText = text;\n    }\n    /**\n     * @description Get the underlying HTMLElement's innerHTML property.\n     */\n    get innerHTML() {\n        return this.element.innerHTML;\n    }\n    /**\n     * @description Set the underlying HTMLElement's innerHTML property.\n     */\n    set innerHTML(text) {\n        this.element.innerHTML = text;\n    }\n}\nexports.TurboElement = TurboElement;\n\n\n//# sourceURL=webpack://turbodombuilder/./src/turbo-element.ts?");

/***/ }),

/***/ "./src/turbo-functions.ts":
/*!********************************!*\
  !*** ./src/turbo-functions.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createSpacer = exports.iconButton = exports.icon = exports.textButton = exports.input = exports.image = exports.element = exports.setIconsPath = void 0;\nconst turbo_element_1 = __webpack_require__(/*! ./turbo-element */ \"./src/turbo-element.ts\");\nlet _pathToIcons = \"\";\nlet _iconsType = \"\";\n/**\n * @function setIconsPath\n * @description Define the path to icons and their type, to not type them again on every icon creation.\n * @example\n * setIconsPath(\"assets/icons/\", \"svg\");\n * icon({icon: \"icon\"}); // provide \"icon\" as parameter instead of \"assets/icons/icon.svg\"}\n * @param pathToIcons - a string representing the path to the icons' directory. E.g.: \"assets/icons/\". Keep empty to\n * not assign any path.\n * @param iconsType - a string representing the type of the icons. E.g.: \"svg\". Keep empty to not assign any type.\n */\nconst setIconsPath = (pathToIcons, iconsType) => {\n    if (pathToIcons)\n        _pathToIcons = pathToIcons;\n    if (iconsType && iconsType.length > 0)\n        _iconsType = \".\" + iconsType;\n};\nexports.setIconsPath = setIconsPath;\n/**\n * @description Create an HTML element with specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element.\n */\nconst element = (properties) => new turbo_element_1.TurboElement(properties);\nexports.element = element;\n/**\n * @description Create an image element with specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element.\n */\nconst image = (properties) => {\n    //Check for missing required field\n    if (!properties.src)\n        console.error(\"No src for image provided in the properties of the element\");\n    //Update properties as needed and create element\n    properties.tag = \"img\";\n    return (0, exports.element)(properties);\n};\nexports.image = image;\n/**\n * @description Create an input element with specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element\n */\nconst input = (properties) => {\n    //Check for missing required field\n    if (!properties.type)\n        console.error(\"Input type not provided in the properties of the element\");\n    //Update properties as needed and create element\n    properties.tag = \"input\";\n    return (0, exports.element)(properties);\n};\nexports.input = input;\n/**\n * @description Create a text button element with specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element\n */\nconst textButton = (properties) => {\n    //Check for missing required field\n    if (!properties.text)\n        console.error(\"Text content not provided in the properties of the element\");\n    //Update properties as needed and create element\n    properties.tag = \"input\";\n    properties.type = \"button\";\n    return (0, exports.element)(properties);\n};\nexports.textButton = textButton;\n/**\n * @description Create an icon element with the specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element\n */\nconst icon = (properties) => {\n    //Update properties as needed and create element\n    properties.src = _pathToIcons + properties.icon + _iconsType;\n    if (!properties.alt)\n        properties.alt = properties.icon;\n    return (0, exports.image)(properties);\n};\nexports.icon = icon;\n/**\n * @description Create a button with an icon element with specified properties.\n * @param {TurboElementProperties} properties - Object containing properties of the element.\n * @returns {TurboElement} The created Turbo element\n */\nconst iconButton = (properties) => {\n    //Update properties as needed and create element\n    properties.tag = \"button\";\n    properties.children = [(0, exports.icon)({ icon: properties.icon, alt: properties.alt })];\n    return (0, exports.element)(properties);\n};\nexports.iconButton = iconButton;\n/**\n * @description Create a spacer element.\n * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to\n * @returns {TurboElement} The created spacer element\n */\nconst createSpacer = (parent) => {\n    return (0, exports.element)({ style: \"flex-grow: 1\", parent: parent });\n};\nexports.createSpacer = createSpacer;\n\n\n//# sourceURL=webpack://turbodombuilder/./src/turbo-functions.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;