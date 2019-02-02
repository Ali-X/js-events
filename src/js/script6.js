;(function() {
  let rowElements = document.querySelectorAll('tbody > tr');
  let rowsPerPage = parseInt(document.getElementsByName('rowsPerPage')[0].getAttribute('value'));
  let filterCountry = document.getElementsByClassName('filter__input')[0].getAttribute('value');

  let selectedPage = document.getElementsByClassName('pager__page--current')[0].textContent;
  let pageInfoElement = document.getElementsByClassName('pager__info')[0];

  rowElements.forEach(function(elem, num) {
    if (!(elem.getElementsByClassName('country')[0].textContent.startsWith(filterCountry))) {
      elem.style.display = 'none';
    }
  });

  rowElements.forEach(function(elem, num) {
    if (!(num >= (selectedPage * rowsPerPage) && num <= (selectedPage * rowsPerPage + rowsPerPage))) {
      elem.style.display = 'none';
    } else {
      elem.getElementsByClassName('position')[0].textContent = num;
    }
  });

  pageInfoElement.textContent = 'Show ' + selectedPage * rowsPerPage + ' to ' + (selectedPage * rowsPerPage + rowsPerPage) + ' of ' + rowElements.length + ' rows';
})();