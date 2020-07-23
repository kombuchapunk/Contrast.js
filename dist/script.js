let contrast = new Contrast({
  isCustomColors: false,    // Set to true if you want to prebuild light/dark colors
  customLight: "#bddfe0",   // dark color HEX if isCustomColors is set to true
  customDark: "#334054",    // light color HEX if isCustomColors is set to true
  backgroundSize: "cover",  // "cover" or "100%" based on the background-size property in css
  bgClass: "contrast-bg",   // Option to rename the class for the element containing bg image
  elementClass: "contrast-el",   // Option to rename the class for the target element
  isDiv: false,             // Set to true if the element is a div (to change it's background)
  isResponsive: true        // Turn this so the module runs on window resize
});

contrast.launch();
