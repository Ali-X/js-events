;(function() {
  updatePagination();
  updateTable();
  setPaginationLinks();

  let rowsPerPageElement = document.getElementsByName('rowsPerPage')[0];
  rowsPerPageElement.oninput = updatePagination;
  rowsPerPageElement.min = 1;
  rowsPerPageElement.max = document.querySelectorAll('tbody > tr').length;

  let filterCountryElement = document.getElementsByName('countryName')[0];
  filterCountryElement.oninput = updateCountryFilter;

  function setPaginationLinks() {
    let pageListElem = document.getElementsByClassName('pager__list')[0];

    pageListElem.onclick = function(event) {
      let pageElements = document.getElementsByClassName('pager__page');
      let target = event.target;

      if (target.className !== 'pager__page') {
        return;
      } else {
        for (let i = 0; i < pageElements.length; i++) {
          if (pageElements[i] === target) {
            debugger;
            pageElements[i].classList.add("pager__page--current");
          } else {
            pageElements[i].classList.remove("pager__page--current");
          }
        }
      }
      updateNumPerPageFilter();
    };
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

    updateNumPerPageFilter();
  }

  function updateCountryFilter() {
    resetSelectedPagination();
    let rowElements = document.querySelectorAll('tbody > tr');

    let filterCountry = document.getElementsByClassName('filter__input')[0].value;

    rowElements.forEach(function(elem) {
      if (!(elem.getElementsByClassName('country')[0].textContent.startsWith(filterCountry))) {
        elem.classList.add('js-filter-hidden');
      } else {
        elem.classList.remove('js-filter-hidden');
      }
    });
    updatePagination();
    updateNumPerPageFilter();
  }

  function updateNumPerPageFilter() {
    let rowElements = document.querySelectorAll('tbody > tr:not(.js-filter-hidden)');

    let rowsPerPage = parseInt(document.getElementsByName('rowsPerPage')[0].value);
    let selectedPageElements = document.getElementsByClassName('pager__page--current');
    let pageInfoElement = document.getElementsByClassName('pager__info')[0];

    if (selectedPageElements.length > 0) {
      let selectedPage = selectedPageElements[0].textContent - 1;

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
    } else {
      pageInfoElement.textContent = 'No results';
    }
  }

  function resetSelectedPagination() {
    let pageElements = document.getElementsByClassName('pager__page');

    for (let i = 0; i < pageElements.length; i++) {
      if (i === 0) {
        pageElements[i].classList.add('pager__page--current');
      } else {
        pageElements[i].classList.remove('pager__page--current');
      }
    }

  }

  function updateTable() {
    updateCountryFilter();
    updateNumPerPageFilter();
  }
})();