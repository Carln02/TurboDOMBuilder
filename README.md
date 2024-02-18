# TurboDOMBuilder
TurboDOMBuilder is a lightweight JavaScript library designed to accelerate the process of creating and appending DOM elements. With TurboDOMBuilder, you can quickly generate HTML elements iwith specified properties and seamlessly integrate them into your web applications, all in one line of code.

For now, the library allows you to create any generic HTML element, and has more specialized functions for creating text nodes, images, inputs, simple text buttons, and icon buttons. You can refer to the API documentation (which is complete) to discover all the possible actions.

## Installation

To use TurboDOMBuilder in your web project, simply include the following script tag in your HTML file:

```html
<script src="https://path/to/cdn/or/local/file"></script>
```

## Usage
```javascript
// Example: Creating an H2 element and appending it to the body
const div = createText({ type: "h2", text: "Hello, TurboDOMBuilder!", parent: document.body});
```

## License
TurboDOMBuilder is licensed under the MIT License.