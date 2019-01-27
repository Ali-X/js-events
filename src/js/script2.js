let menuOffsetHeight = document.getElementsByClassName("scroll-menu")[0].offsetHeight;
let sectionOffsetHeight = document.getElementsByClassName("scroll-section")[0].offsetHeight;

function upTheScreen() {
  window.scrollTo(0, 0);
}

function goToFirstSection() {
  window.scrollTo(0, menuOffsetHeight);
}

function goToSecondSection() {
  window.scrollTo(0, menuOffsetHeight + sectionOffsetHeight);
}

function goToThirdSection() {
  window.scrollTo(0, menuOffsetHeight + 2 * sectionOffsetHeight);
}

function goToFourthSection() {
  window.scrollTo(0, menuOffsetHeight + 3 * sectionOffsetHeight);
}

function goToFifthSection() {
  window.scrollTo(0, menuOffsetHeight + 4 * sectionOffsetHeight);
}