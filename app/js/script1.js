"use strict";

let imgs = ["slider-photo1.jpg", "slider-photo2.jpg", "slider-photo3.jpg", "slider-photo4.jpg"];
let currPos = 0;

console.log(getSlideInfo());
getNextSlide();
console.log(getSlideInfo());
getPrevSlide();
console.log(getSlideInfo());

function getNextSlide() {
  if (currPos < imgs.length - 1) {
    return ++currPos;
  } else {
    return currPos;
  }
}

function getPrevSlide() {
  if (currPos > 0) {
    return --currPos;
  } else {
    return currPos;
  }
}

function getSlideInfo() {
  return imgs[currPos];
}
