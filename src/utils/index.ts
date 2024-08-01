export const featuresList = [
  {
    id: 1,
    name: "Color Palette Generater",
    icon: "palette.png",
    view: "D",
  },
  // {
  //   id: 2,
  //   name: "Pick Color Outside Browser",
  //   icon: "browser.png",
  // },
  {
    id: 3,
    name: "Color Picker Panel",
    icon: "pick-color.png",
    view: "A",
  },
  {
    id: 4,
    name: "Copy Special Colors",
    icon: "square.png",
    view: "B",
  },
  {
    id: 5,
    name: "Picked Color History",
    icon: "refresh.png",
    view: "C",
  },
  {
    id: 5,
    name: "Webpage Color Analyzer",
    icon: "webpage.png",
    view: "E",
  },
  // {
  //   id: 10,
  //   name: "Options",
  //   icon: "cogwheel.png",
  // },
];

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function sortRgbStringsByBrightness(rgbArray: string[]) {
  return rgbArray.sort((a, b) => {
    // Function to extract RGB values from a string
    const getRgbValues = (rgbString) => {
      const matches = rgbString.match(/rgb\((\d+),(\d+),(\d+)\)/);
      if (matches) {
        const r = parseInt(matches[1], 10);
        const g = parseInt(matches[2], 10);
        const b = parseInt(matches[3], 10);
        return [r, g, b];
      }
      return [0, 0, 0];
    };

    // Calculate brightness for each color
    const [rA, gA, bA] = getRgbValues(a);
    const [rB, gB, bB] = getRgbValues(b);

    const brightnessA = 0.299 * rA + 0.587 * gA + 0.114 * bA;
    const brightnessB = 0.299 * rB + 0.587 * gB + 0.114 * bB;

    // Sort by brightness
    return brightnessA - brightnessB;
  });
}
