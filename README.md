# TurboDOMBuilder
TurboDOMBuilder is a lightweight TypeScript library designed to accelerate the process of creating and appending DOM elements. With TurboDOMBuilder, you can quickly generate HTML elements with specified properties and seamlessly integrate them into your web applications, all in one line of code.

For now, the library allows you to create any generic HTML element, and has more specialized functions for creating images, inputs, simple text buttons, icons, and icon buttons. You can refer to the API documentation to discover all the possible actions.

## Installation

You can install TurboDOMBuilder via npm:

```bash
npm install turbodombuilder
```

Alternatively, you can include it directly in your HTML:

```html
<script src="https://raw.githack.com/Carln02/TurboDOMBuilder/main/bundle/turbodombuilder.js"></script>
```

## Usage
```javascript
// Example: Creating an H2 element and appending it to the body
const div = TurboDOMBuilder.element({tag: "h2", text: "Hello, TurboDOMBuilder!", parent: document.body});
```

## License
TurboDOMBuilder is licensed under the MIT License.
