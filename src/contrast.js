// This is an example of how it's possible to dynamically change the font color
// based on the page or element background - including responsive BG image.

// (You can also set bw value to true like invertColor(hex, true) and in this case
// the font color will switch between black/white or any color pair you set based on
// the background behind the target element)

// It is inspired by https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
// and the following npm package https://github.com/onury/invert-color
// As well as CS50's image filter project and
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

// Developed by @devmishka at FictionTribe

class Contrast {
  constructor(options) {
    options = options || {};
    this.isCustomColors = typeof options.isCustomColors !== 'undefined' ? options.isCustomColors : false;
    this.customLight = typeof options.customLight !== 'undefined' ? options.customLight : "#FFFFFF";
    this.customDark = typeof options.customDark !== 'undefined' ? options.customDark : "#000000";
    this.isDiv = typeof options.isDiv !== 'undefined' ? options.isDiv : false;
    this.isResponsive = typeof options.isResponsive !== 'undefined' ? options.isResponsive : true;
    this.bgClass = typeof options.bgClass !== 'undefined' ? options.bgClass : 'contrast-bg';
    this.elementClass = typeof options.elementClass !== 'undefined' ? options.elementClass : 'contrast-el';
    this.backgroundSize = typeof options.backgroundSize !== 'undefined' ? options.backgroundSize : 'cover';
    this.rgb = {r:0,g:0,b:0};
    this.blockSize = 5; // only check every 5 pixels
    this.defaultRGB = {r:0,g:0,b:0}; // for non-supporting envs
    this.hex;
    this.invertedHex;
    this.canvas;
    this.context;
    this.width;
    this.height;
    this.length;
    this.imgEl;
    this.imgSrc;
    this.contentEl;
    this.contentElBox;
  }
  prepare() {
    this.contentEl = document.getElementsByClassName(this.elementClass)[0];
    this.contentElBox = document.getElementsByClassName(this.elementClass)[0].getBoundingClientRect();
    this.bgBlock = document.getElementsByClassName(this.bgClass)[0];
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext && this.canvas.getContext('2d');
    return this;
  }
  // Function that loads Image dynamically from the CSS background-image value
  // RETURNS A PROMISE
  loadImage() {
    // Let's create an image to draw from
    let style = getComputedStyle(this.bgBlock);
    // Find css background-image property and check whether it has url wrapped
    // in "" or '' or without quotes, then extract it
    if (style.backgroundImage.indexOf("url") != -1) {
      let startOfString, endOfString;
      if (style.backgroundImage.indexOf("'") > -1 || style.backgroundImage.indexOf('"') > -1) {
        startOfString = 5;
        endOfString = style.backgroundImage.indexOf(")")-1;
      } else {
        startOfString = 4;
        endOfString = style.backgroundImage.indexOf(")");
      }
      this.imgSrc = style.backgroundImage.slice(startOfString, endOfString);
    } else {
      console.log("Check your element styles. Looks like you haven't set the background-image property correctly.");
    }
    // Make sure the image is loaded before calling the next function
    return new Promise((resolve, reject) => {
      this.imgEl = new Image();
      this.imgEl.crossOrigin = "anonymous";
      this.imgEl.onload = () => resolve(this.imgEl);
      this.imgEl.onerror = reject;
      this.imgEl.src = this.imgSrc;
    });
  }

  // This function is used to assist with background-size:cover
  getCoverScaleFactor() {
    /* Get the ratio of the div + the image */
    let imageRatio = this.imgEl.width / this.imgEl.height;
    let coverRatio = this.bgBlock.offsetWidth / this.bgBlock.offsetHeight;
    let coverHeight, coverWidth, scale;
    /* Figure out which ratio is greater */
    if (imageRatio >= coverRatio) {
      coverHeight = this.bgBlock.offsetHeight;
      scale = (coverHeight / this.imgEl.height);
      coverWidth = this.imgEl.width * scale;
    } else {
      coverWidth = this.bgBlock.offsetWidth;
      scale = (coverWidth / this.imgEl.width);
      coverHeight = this.imgEl.height * scale;
    }
    return scale;
  }

  // Function that returns the average color of the section of the
  // background image right under the supplied element
  // using the target element's bounding box
  getAverageHEX() {
    if (!this.context) {
      return defaultRGB;
      console.log("CONTEXT UNDEFINED")
    }

    let revScale;
    if (this.backgroundSize == "cover") {
      // Call the function to get the current scale factor of the cover property
      revScale = this.getCoverScaleFactor();
      // Let's draw the area of the image behind the text (contentEL)
      this.context.drawImage(this.imgEl, this.contentElBox.left / revScale, this.contentElBox.top / revScale, this.contentElBox.width / revScale, this.contentElBox.height / revScale, 0, 0, this.contentElBox.width, this.contentElBox.height);
    } else {
      // Let's find the reverse scale factor of the image
      // so we can multiply our bounding box coordinates by it
      revScale =  this.imgEl.naturalWidth / this.bgBlock.clientWidth;
      // Let's draw the area of the image behind the text (contentEL)
      this.context.drawImage(this.imgEl, this.contentElBox.left * revScale, this.contentElBox.top * revScale, this.contentElBox.width * revScale, this.contentElBox.height * revScale, 0, 0, this.contentElBox.width, this.contentElBox.height);
    }

    try {
      this.data = this.context.getImageData(0, 0, this.contentElBox.width, this.contentElBox.height);
    } catch(e) {
      /* security error, img on diff domain */
      console.log('Make sure the image is hosted on the same domain');
      return this;
    }

    this.length = this.data.data.length;

    let i = -4;
    let count = 0;
    while ( (i += this.blockSize * 4) < this.length ) {
      ++count;
      this.rgb.r += this.data.data[i];
      this.rgb.g += this.data.data[i+1];
      this.rgb.b += this.data.data[i+2];
    }

    // ~~ used to floor values
    this.rgb.r = ~~(this.rgb.r/count);
    this.rgb.g = ~~(this.rgb.g/count);
    this.rgb.b = ~~(this.rgb.b/count);

    return this;
  }

  // This function will find the good contrast color
  // based on the provided RGB values
  // https://github.com/onury/invert-color
  invertColor() {
    if (this.hex.indexOf('#') === 0) {
      this.hex = this.hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (this.hex.length === 3) {
      this.hex = this.hex[0] + this.hex[0] + this.hex[1] + this.hex[1] + this.hex[2] + this.hex[2];
    }
    if (this.hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = parseInt(this.hex.slice(0, 2), 16),
        g = parseInt(this.hex.slice(2, 4), 16),
        b = parseInt(this.hex.slice(4, 6), 16);
    if (this.isCustomColors == true) {
      // http://stackoverflow.com/a/3943023/112731
      if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
        this.invertedHex = this.customDark;
      } else {
        this.invertedHex = this.customLight;
      }
      return this;
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    this.invertedHex = "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    return this;
  }

  padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  // Function to convert RGB to HEX
  rgbToHex() {
    this.hex = "#" + ((1 << 24) + (this.rgb.r << 16) + (this.rgb.g << 8) + this.rgb.b).toString(16).slice(1);
    return this;
  }

  // Change the color
  setElementColor() {
    if (this.isDiv) {
      this.contentEl.style.background = this.invertedHex;
    } else {
      this.contentEl.style.color = this.invertedHex;
    }
  }

  // Add event listener
  resize() {
    let self = this;
    window.addEventListener('resize', function() {
      self.prepare().loadImage().then(image => {
        self.getAverageHEX().rgbToHex().invertColor().setElementColor();
      })
    });
  }
  launch() {
    let self = this;
    this.prepare().loadImage().then(image => {
      self.getAverageHEX().rgbToHex().invertColor().setElementColor();
    })
    if (this.isResponsive) {
      this.resize();
    }
  }

}

// Let's test this
// Background-position isn't supported yet

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
