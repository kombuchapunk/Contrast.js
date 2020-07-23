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

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---

## License
>You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
