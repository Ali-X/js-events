;(function() {
  let menuOffsetHeight = document.getElementsByClassName("scroll-menu")[0].offsetHeight;
  let duration = 600;
  let elemOffset;

  document.body.onclick = function(event) {
    event = event || window.event;
    event.preventDefault();
    let target = event.target || event.srcElement;

    while (target !== document.body) {
      if (target.tagName === 'A') {
        scrollWindow(target);
        return;
      }

      target = target.parentNode;
    }
  };

  function scrollWindow(target) {
    let now = null;
    let id = target.getAttribute("href");

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
      window.scrollTo(0, -elemOffset * (progress / duration) + elemOffset);

      if (progress < duration) {
        requestAnimationFrame(stepUp);
      }
    }
  }
})();