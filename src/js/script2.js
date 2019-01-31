;(function() {
  let menuOffsetHeight = document.getElementsByClassName("scroll-menu")[0].offsetHeight;
  let links = document.querySelectorAll('a');
  let duration = 600;
  let elemOffset;

  for (let i = 0; i < links.length; i++) {
    let linkElem = links[i];
    linkElem.addEventListener('click', function(event) {
      event.preventDefault();
      let now = null;
      let id = event.currentTarget.getAttribute("href");

      if (id === "#") {
        elemOffset = window.pageYOffset;
        window.requestAnimationFrame(stepUp);
      } else {
        elemOffset = document.querySelector(id).offsetTop;
        window.requestAnimationFrame(stepDown);
      }

      function stepDown(timestamp) {
        if (!now) {
          now = timestamp;
        }

        let progress = timestamp - now;
        window.scrollTo(0, elemOffset * (progress / duration) + menuOffsetHeight);

        if (progress < duration) {
          requestAnimationFrame(stepDown);
        }
      }

      function stepUp(timestamp) {

        if (!now) {
          now = timestamp;
        }

        let progress = timestamp - now;
        window.scrollTo(0, -elemOffset * (progress / duration));

        if (progress < duration) {
          requestAnimationFrame(stepUp);
        }
      }
    })
  }
})();