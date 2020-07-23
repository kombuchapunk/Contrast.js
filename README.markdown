![Contrast.js logo](img/logo.png)
============
![npm](https://img.shields.io/npm/v/contrast-js?color=green&style=flat-square) [![GitHub Size](https://img.shields.io/github/size/MishaPetrov/Contrast.js/contrast.min.js?color=%23ff5757&style=flat-square)](https://github.com/mishapetrov/Contrast.js/contrast.min.js) ![GitHub issues](https://img.shields.io/github/issues/mishapetrov/Contrast.js?style=flat-square) [![GitHub stars](https://img.shields.io/github/stars/mishapetrov/Contrast.js?style=flat-square)](https://github.com/mishapetrov/Contrast.js) [![Live Demo](https://img.shields.io/badge/demo-online-blueviolet?style=flat-square)](https://contrastjs.com/example/index.html)

Contrast.js is a tiny (4.26kb) library with no dependencies that adds responsiveness to the color or background attributes of DOM elements based on the section of background image behind the target element.
The library analyzes the background behind the bounding box of the target element by getting the average RGB values of pixels in the sub-rectangle behind the element and finding the best contrasting color.

In simple words, never worry about your color matching the background image again! No more countless media queries.

![GIF demo](img/demo-2.gif)

---
## Buy me a coffee

Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee, so I can dedicate more time on open-source projects like this :)

<a href="https://www.buymeacoffee.com/mishka" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

---

## Features
- Vanilla JS - no jQuery or any other dependencies
- Very simple setup/activation
- Support for responsive font color
- Support for responsive div background color
- Support for background-size: cover;
- Support for background-size: 100%;
- Option to add custom colors to switch between (Light/Dark)
- Option to change activation class names
- Option to turn on/off activation on window resize event

---

## Install
To start working with Contrast.js right away, just add this line before your closing <body> tag:
```html
<script type="text/javascript" src="https//cdn.jsdelivr.net/npm/contrast-js@0.0.2/contrast.min.js">
```

Alternatively, Contrast.js can be installed with [`npm`](https://www.npmjs.com/package/contrast-js)
```sh
$ npm install contrast-js
```

…or include the file from this repo…
```html
<script src="contrast.min.js"></script>
```

---

## Run
Add `contrast-bg` and `contrast-el` classes to the element that has the background image and the target element, respectively like this:
```html
<div class="contrast-bg">
  <h1 class="contrast-el">Resize and watch my color change</h1>
</div>
```

To run Contrast.js, create new instance of Contrast class and invoke launch() method on it.
```javascript
const Contrast = require('contrast-js');

let contrast = new Contrast;
contrast.launch();
```

Contrast class also accepts options object like below:
```javascript
const Contrast = require('contrast-js');

let contrast = new Contrast({
  isCustomColors: false,        // Set to true if you want to prebuild light/dark colors
  customLight: "#bddfe0",       // dark color HEX if isCustomColors is set to true
  customDark: "#334054",        // light color HEX if isCustomColors is set to true
  backgroundSize: "cover",      // "cover" or "100%" based on the background-size property in css
  bgClass: "contrast-bg",       // Option to rename the class for the element containing bg image
  elementClass: "contrast-el",  // Option to rename the class for the target element
  isDiv: false,                 // Set to true if the element is a div (to change it's background)
  isResponsive: true            // Turn this so the module runs on window resize
});

contrast.launch();
```

---

## License
>You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
