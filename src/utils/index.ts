export const optionList = [
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
  // {
  //   id: 5,
  //   name: "Webpack Color Analyzer",
  //   icon: "refresh.png",
  // },

  // {
  //   id: 10,
  //   name: "Options",
  //   icon: "cogwheel.png",
  // },
];

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
