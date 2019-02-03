;(function() {
  document.onclick = function(event) {
    let target = event.target;

    let id = target.getAttribute('data-toggle-id');
    if (id) {
      selectCurrentTab(target);
      showSelectedTranslation(id);
    }
  };

  function selectCurrentTab(target) {
    let tabsItems = document.getElementsByClassName('tabs-item');

    for (let i = 0; i < tabsItems.length; i++) {
      if (tabsItems[i] === target) {
        target.classList.add('selected');
      } else {
        tabsItems[i].classList.remove('selected');
      }
    }
  }

  function showSelectedTranslation(id) {
    let tabContent = document.getElementById(id);

    let tabsTexts = document.getElementsByClassName('tabs-text');

    for (let i = 0; i < tabsTexts.length; i++) {
      if (tabsTexts[i] === tabContent) {
        tabContent.classList.remove('hidden');
      } else {
        tabsTexts[i].classList.add('hidden');
      }
    }
  }
})();