// This is an example of how it's possible to dynamically change the font color
// based on the page or element background - including responsive BG image.

// (You can also set bw value to true like invertColor(hex, true) and in this case
// the font color will switch between black/white or any color pair you set based on
// the background behind the target element)

// It is inspired by https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript 
// and the following npm package https://github.com/onury/invert-color
// As well as CS50's image filter project and 
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

// Function that returns the average color of the section of the
// background image right under the supplied element
// using the target element's bounding box
function getAverageHEX(imgEl, contentEl) {

    let blockSize = 5, // only check every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.getElementById('canvas'),
        // canvas1 = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data,
        width, 
        height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
  
    // Then let's get the active area from the first canvas 
    // and draw it to the second canvas to preserve the
    // responsive size (not the actual size) of the background image
    if (!context) {
        return defaultRGB;
        console.log("CONTEXT UNDEFINED")
    }
    // Let's find the reverse scale factor of the image
    // so we can multiply our bounding box coordinates by it
    // console.log("CLIENT WIDTH: " + imgEl.clientWidth);
    // console.log("NATURAL WIDTH: " + imgEl.naturalWidth);
    // console.log("REVERSE SCALE FACTOR: " + imgEl.naturalWidth/imgEl.clientWidth);
    let revScale =  imgEl.naturalWidth / imgEl.clientWidth;
    context.drawImage(imgEl, contentEl.left * revScale, contentEl.top * revScale, (contentEl.right * revScale) - (contentEl.left * revScale), (contentEl.bottom * revScale) - (contentEl.top * revScale), 0, 0, contentEl.right - contentEl.left, contentEl.bottom - contentEl.top);
    
    try {
      data = context.getImageData(0, 0, contentEl.right-contentEl.left, contentEl.bottom-contentEl.top);
    } catch(e) {
        /* security error, img on diff domain */alert('Make sure the image is hosted on the same domain');
        return rgbToHex(defaultRGB.r, defaultRGB.g, defaultRGB.b);
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    console.log(rgb);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// This function will find the good contrast color 
// based on the provided RGB values
// https://github.com/onury/invert-color
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// Function to convert RGB to HEX
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Change the color
function changeColor() {
  let h1 = document.getElementById("h1").getBoundingClientRect();
  let hex = getAverageHEX(document.getElementById('i'), h1);
  console.log("HEX: " + hex);
  document.getElementById("h1").style.color = invertColor(hex, false);
  console.log("INVERTED: " + invertColor(hex, false))
}

// Let's test this
changeColor();
window.addEventListener('resize', function() {
  changeColor();
});

