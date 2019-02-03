;(function() {
  let rowsPerPageElement = document.getElementsByName('rowsPerPage')[0];
  rowsPerPageElement.oninput = updateTable;
  rowsPerPageElement.min = 1;
  rowsPerPageElement.max = document.querySelectorAll('tbody > tr').length;


  function updateTable() {
    let rowElements = document.querySelectorAll('tbody > tr');

    let rowsPerPage = parseInt(document.getElementsByName('rowsPerPage')[0].value);
    let filterCountry = document.getElementsByClassName('filter__input')[0].value;

    let selectedPage = document.getElementsByClassName('pager__page--current')[0].textContent;
    let pageInfoElement = document.getElementsByClassName('pager__info')[0];

    rowElements.forEach(function(elem, num) {
      if (!(elem.getElementsByClassName('country')[0].textContent.startsWith(filterCountry))) {
        elem.style.display = 'none';
      } else {
        elem.style.display = 'table-row';
      }
    });

    rowElements.forEach(function(elem, num) {
      if (!(num >= (selectedPage * rowsPerPage) && num < (selectedPage * rowsPerPage + rowsPerPage))) {
        elem.style.display = 'none';
      } else {
        elem.style.display = 'table-row';
        elem.getElementsByClassName('position')[0].textContent = num;
      }
    });

    pageInfoElement.textContent = 'Show ' + selectedPage * rowsPerPage + ' to ' + (selectedPage * rowsPerPage + rowsPerPage) + ' of ' + rowElements.length + ' rows';
  }
})();