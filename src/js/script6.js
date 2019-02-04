;(function() {
  updatePagination();
  updateTable();

  let rowsPerPageElement = document.getElementsByName('rowsPerPage')[0];
  rowsPerPageElement.oninput = updatePage;
  rowsPerPageElement.min = 1;
  rowsPerPageElement.max = document.querySelectorAll('tbody > tr').length;

  let filterCountryElement = document.getElementsByName('countryName')[0];
  filterCountryElement.oninput = updatePage;


  function updatePage() {
    updateTable();
    updatePagination();
  }

  function updatePagination() {
    let paginationList = document.getElementsByClassName('pager__list')[0];
    paginationList.innerHTML = '';
    document.querySelectorAll('tbody > tr').length;

    let rowElements = document.querySelectorAll('tbody > tr:not(.js-filter-hidden)');
    let rowsPerPage = parseInt(document.getElementsByName('rowsPerPage')[0].value);

    for (let i = 0; i < rowElements.length; i += rowsPerPage) {
      let paginationItem = document.createElement('li');
      paginationItem.setAttribute('class', 'pager__list-item');
      let paginationLink = document.createElement('a');
      paginationLink.setAttribute('class', 'pager__page');

      if (i === 0) {
        paginationLink.classList.add('pager__page--current');
      }

      paginationLink.setAttribute('href', '#');
      paginationLink.innerText = i / rowsPerPage + 1;
      paginationItem.appendChild(paginationLink);

      paginationList.appendChild(paginationItem);
    }
  }

  function updateFilter() {
    let rowElements = document.querySelectorAll('tbody > tr');

    let filterCountry = document.getElementsByClassName('filter__input')[0].value;

    rowElements.forEach(function(elem, num) {
      if (!(elem.getElementsByClassName('country')[0].textContent.startsWith(filterCountry))) {
        elem.classList.add('js-filter-hidden');
      } else {
        elem.classList.remove('js-filter-hidden');
      }
    });
  }

  function updateTable() {
    updateFilter();
    let rowElements = document.querySelectorAll('tbody > tr:not(.js-filter-hidden)');

    let rowsPerPage = parseInt(document.getElementsByName('rowsPerPage')[0].value);
    let selectedPage = document.getElementsByClassName('pager__page--current')[0].textContent - 1;
    let pageInfoElement = document.getElementsByClassName('pager__info')[0];

    let resultNum = selectedPage * rowsPerPage + rowsPerPage;

    rowElements.forEach(function(elem, num) {
      if (resultNum > rowElements.length) {
        resultNum = rowElements.length;
      }
      if (!(num >= (selectedPage * rowsPerPage) && num < resultNum)) {
        elem.classList.add('js-pagination-hidden');
      } else {
        elem.classList.remove('js-pagination-hidden');
        elem.getElementsByClassName('position')[0].textContent = (num + 1);
      }
    });

    pageInfoElement.textContent = 'Show ' + (selectedPage * rowsPerPage + 1) + ' to ' + resultNum + ' of ' + rowElements.length + ' rows';
  }
})();