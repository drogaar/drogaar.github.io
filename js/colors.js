var Colors = new Object();

Colors.google_Modern = {
  "Cocoa":        "#795548", 
  "Flamingo":     "#e67c73", 
  "Tomato":       "#d50000", 
  "Tangerine":    "#f4511e" , 
  "Pumpkin":      "#ef6c00", 
  "Mango":        "#f09300", 
  "Eucalyptus":   "#009688", 
  "Basil":        "#0b8043", 
  "Pistachio":    "#7cb342", 
  "Avocado":      "#c0ca33", 
  "Citron":       "#e4c441", 
  "Banana":       "#f6bf26", 
  "Sage":         "#33b679", 
  "Peacock":      "#039be5", 
  "Cobalt":       "#4285f4", 
  "Blueberry":    "#3f51b5", 
  "Lavender":     "#7986cb", 
  "Wisteria":     "#b39ddb", 
  "Graphite":     "#616161", 
  "Birch":        "#a79b8e", 
  "Beetroot":     "#ad1457", 
  "Cherryblossom":"#d81b60", 
  "Grape":        "#8e24aa", 
  "Amythyst":     "#9e69af"
}

Colors.merfolk11_2 = {
  "Tomato": "#d5638f",
  "Tangerine": "#f99797",
  "Banana": "#f4df98",
  "Basil": "#50a48b",
  "Sage": "#41d38b",
  "Peacock": "#57ebe2",
  "Blueberry": "#6bb8e1",
  "Lavender": "#636c91",
  "Grape": "#54515b",
  "Flamingo": "#effdcf",
  "Graphite": "#363636",
}

Colors.colorgorical1001 = {
    "Basil" : "#75eab6",
    "Graphite" : "#cda19a",
    "Blueberry" : "#d4eabc",
    "Grape" : "#f597fa",
    "Flamingo" : "#a5e841",
    "Lavender" : "#94a6fd",
    "Banana" : "#cfcc44",
    "Peacock" : "#53c6ef",
    "Tangerine" : "#ed9845",
    "Sage" : "#2af464",
    "Tomato" : "#fb899b"
}

// const colors = ["#0099cc","#E6E6FA","#fde2a3","#cfdfc4","#f6c2a8","#1C8200","#987baa","#981890","#AA8971","#1987FC","#99081E"]; // old pastel

let palette = Colors.colorgorical1001;
Colors.eventById = {1:palette.Lavender, 2:palette.Sage, 3:palette.Grape, 4:palette.Flamingo, 5:palette.Banana, 6:palette.Tangerine, 7:palette.Peacock, 8:palette.Graphite, 9:palette.Blueberry, 10:palette.Basil, 11:palette.Tomato}
// Colors.calendarById = {1:palette.Cocoa, 2:palette.Flamingo, 3:palette.Tomato, 4:palette.Tangerine, 5:palette.Pumpkin, 6:palette.Mango, 7:palette.Eucalyptus, 8:palette.Basil, 9:palette.Pistachio, 10:palette.Avocado, 11:palette.Citron, 12:palette.Banana, 13:palette.Sage, 14:palette.Peacock, 15:palette.Cobalt, 16:palette.Blueberry, 17:palette.Lavender, 18:palette.Wisteria, 19:palette.Graphite, 20:palette.Birch, 21:palette.Beetroot, 22:palette.Cherryblossom, 23:palette.Grape, 24:palette.Amythyst};

//   Converters using https://css-tricks.com/converting-color-spaces-in-javascript/
Colors.RGBStringToRGBArr = function (rgbString) {
  let str = rgbString.split('(').pop();
  str = str.substring(0, str.length - 1);
  str = str.split(',');
  return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])];
}

Colors.RGBToHex = function (rgbArray) {
  let r=0,g=0,b=0;
  [r,g,b] = [rgbArray[0].toString(16), rgbArray[1].toString(16), rgbArray[2].toString(16)];
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  return "#" + r + g + b;
}

Colors.hexToRGBarr = function (hexCol) {
  if(hexCol.length !== 7){
      console.log("Colors.hexToRGB: invalid Hex string: " + hexCol);
      return [0,0,0];
  }
  let r = parseInt(hexCol.substring(1, 3), 16);
  let g = parseInt(hexCol.substring(3, 5), 16);
  let b = parseInt(hexCol.substring(5, 7), 16);
  return [r,g,b];
}

Colors.hexToHSL = function(hexCol){ // returns [degrees, %, %]
  let r=0,g=0,b=0;
  [r,g,b] = Colors.hexToRGBarr(hexCol);
  [r,g,b] = [r/255,g/255,b/255];

  let cmax = Math.max(r, g, b);
  let cmin = Math.min(r, g, b);
  let delta= cmax-cmin; 
  let h=0, s=0, l=0;

  if (cmax === r) h = ((g - b) / delta) % 6;
  if (cmax === g) h = (b - r) / delta + 2;
  if (cmax === b) h = (r - g) / delta + 4;    
  h = Math.round(h * 60);
  if(h < 0) h += 360;

  l = (cmin+cmax)/2;
  if (delta > 0) s = delta / (1 - Math.abs(2 * l - 1));

  s = (s * 100).toFixed(1);
  l = (l * 100).toFixed(1);

  return [h,s,l];
}

Colors.HSLToHex = function(hslArr){
  let h=0,s=0,l=0;
  [h,s,l] = hslArr;
  s/=100;
  l/=100;
  let chroma = (1 - Math.abs(2 * l - 1)) * s;
  let x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - chroma/2;
  let r=0,g=0,b=0;

  if (0 <= h && h < 60) {
      r = chroma; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
      r = x; g = chroma; b = 0;
  } else if (120 <= h && h < 180) {
      r = 0; g = chroma; b = x;
  } else if (180 <= h && h < 240) {
      r = 0; g = x; b = chroma;
  } else if (240 <= h && h < 300) {
      r = x; g = 0; b = chroma;
  } else if (300 <= h && h < 360) {
      r = chroma; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return Colors.RGBToHex([r,g,b]);
}

Colors.scaleLightness = function(hexCol, scalar){ 
  let h=0,s=0,l=0;
  [h,s,l] = Colors.hexToHSL(hexCol);

  if(scalar < 1) l *= scalar; //darken
  if(scalar > 1) {//lighten
      l = 100 - (100 - l)/scalar;
      l = Math.min(l, 100);
  }

  return Colors.HSLToHex([h, s, l]);
}