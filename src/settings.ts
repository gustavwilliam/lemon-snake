import { reDraw } from "./index";

const tilesetSelect = document.getElementById('tileset')! as HTMLSelectElement;
const themeSelect = document.getElementById('theme')! as HTMLSelectElement;
const previewSnake = document.getElementById('preview-snake')! as HTMLImageElement;

let activeTileset = "beard";
let activeTheme = "discord-dark";

const toThemeName = (theme: string) => {
  return `theme-${theme}`;
};

window.addEventListener('DOMContentLoaded', () => { 
  reDraw();
})

tilesetSelect.addEventListener('change', (e: { target }) => {
  activeTileset = e.target.value;
  previewSnake.src = `./snek_previews/${activeTileset}.svg`;
});

themeSelect.addEventListener('change', (e: { target }) => {
  const oldTheme = activeTheme;
  activeTheme = toThemeName(e.target.value);
  document.body.classList.remove(oldTheme);
  document.body.className = activeTheme;
  reDraw();
});