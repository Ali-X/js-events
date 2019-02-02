(function() {
  document.getElementById("modal").addEventListener('click', function(event) {
    let target = event.target;

    while (target.id !== "modal") {
      if (target.className === "modal-window") {
        return;
      } else if (target.classList.contains('modal-close') || target.className === "modal-overlay") {
        openCloseModalWindow();
        return;
      }
      target = target.parentNode;
    }
  });

  function openCloseModalWindow() {
    document.getElementById("window").classList.toggle("modal-window--hidden");
    document.getElementById("toggle").classList.toggle("change");
    document.getElementById("overlay").classList.toggle("modal-overlay--hidden");
  }
})();