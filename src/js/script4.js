(function() {
  document.getElementsByClassName("modal-overlay")[0].onclick = function(event) {
    let target = event.target;

    while (target.className !== "modal-overlay") {
      if (target.classList.contains('modal-close')) {
        // нашли элемент, который нас интересует!
        openCloseModalWindow();
        return;
      }
      target = target.parentNode;
    }
  };

  function openCloseModalWindow() {
    document.getElementById("modal").classList.toggle("modal--hidden");
    document.getElementById("toggle").classList.toggle("change");
    document.getElementById("overlay").classList.toggle("modal-overlay--hidden");
  }
})();