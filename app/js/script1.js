"use strict";

let imgs = ["slider-photo1-min.jpg", "slider-photo2-min.jpg", "slider-photo3-min.jpg", "slider-photo4-min.jpg"];
let currPos = 0;

function showSlide() {
  let sliderElement = document.getElementsByClassName("slider-photo")[0];
  sliderElement.style.backgroundImage = "url(\"../img/" + getSlideName() + "\")";
}

showSlide();

function getNextSlide() {
  if (currPos < imgs.length - 1) {
    ++currPos;
  }

  showSlide();
}

function getPrevSlide() {
  if (currPos > 0) {
    --currPos;
  }

  showSlide();
}

function getSlideName() {
  return imgs[currPos];
}


