import {

  initHorizontalScroll,
  initPinSidebarScroll,
  initHeadScroll,
  initAboutScroll
} from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {

  initHeadScroll();
  initAboutScroll();
  initHorizontalScroll();
  initPinSidebarScroll();
});
