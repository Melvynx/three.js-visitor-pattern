// generate random hex color
export const randomHexColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
