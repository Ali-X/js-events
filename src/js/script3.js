(function() {
  document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function() {
    let menuElemStyle = document.getElementById("menu");
    menuElemStyle.classList.toggle("hidden");
    this.classList.toggle("change");
  })
})();