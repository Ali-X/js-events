;(function() {
  executeFilters();
  executePagination();

  let rowsPerPageElement = document.getElementsByName('rowsPerPage')[0];
  rowsPerPageElement.oninput = createPaginationList;
  rowsPerPageElement.min = 1;
  rowsPerPageElement.max = document.querySelectorAll('tbody > tr').length;

  let filterCountryElement = document.getElementsByName('countryName')[0];
  filterCountryElement.oninput = updateCountryFilter;

  function addClickEventForEachPaginationLink() {
    let pageListElem = document.getElementsByClassName('pager__list')[0];

    pageListElem.onclick = function(event) {
      let pageElements = document.getElementsByClassName('pager__page');
      let target = event.target;

      if (!target.classList.contains('pager__page')) {
        return;
      } else {
        for (let i = 0; i < pageElements.length; i++) {
          if (pageElements[i] === target) {
            pageElements[i].classList.add("pager__page--current");
          } else {
            pageElements[i].classList.remove("pager__page--current");
          }
        }
      }

      updateNumPerPageFilter();
      updatePaginationControl();
      groupPaginationLinks();
    };
  }

  function groupPaginationLinks() {
    let pageListElements = document.getElementsByClassName('pager__list-item');
    let selectedPageElem = document.getElementsByClassName('pager__page--current')[0];
    let length = pageListElements.length;

    if (length < 4) {
      return;
    } else {
      let nums = [];
      let currPos = selectedPageElem.innerHTML;

      if (length < 7) {
        for (let i = 1; i < length - 1; i++) {
          nums.push(i);
        }
      } else {
        for (let i = 1; i < parseInt(currPos) - 2; i++) {
          nums.push(i);
        }
        for (let i = parseInt(currPos) + 1; i < length - 1; i++) {
          nums.push(i);
        }
      }

      hideLinksByNumbers(nums);
      setDots(length);
    }

    function hideLinksByNumbers(...nums) {
      let elements = document.getElementsByClassName('pager__list-item');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('js-pagination-grouped');
      }

      nums[0].forEach(function(elem) {
        document.getElementsByClassName('pager__list-item')[elem].classList.add('js-pagination-grouped');
      });
    }

    function setDots(length) {
      let spanBefore = document.createElement('span');
      spanBefore.className = 'js-pagination-dots-before';

      let spanAfter = document.createElement('span');
      spanAfter.className = 'js-pagination-dots-after';


      for (let i = 0; i < length; i++) {
        let elem = document.getElementsByClassName("js-pagination-dots-before")[0];

        if (elem) elem.parentNode.removeChild(elem);

        elem = document.getElementsByClassName("js-pagination-dots-after")[0];

        if (elem) elem.parentNode.removeChild(elem);
      }

      if (document.getElementsByClassName('pager__list-item')[length - 2].classList.contains('js-pagination-grouped')) {
        document.getElementsByClassName('pager__list-item')[length - 1].insertAdjacentElement('beforebegin', spanBefore);
      }

      if (document.getElementsByClassName('pager__list-item')[1].classList.contains('js-pagination-grouped')) {
        document.getElementsByClassName('pager__list-item')[0].insertAdjacentElement('afterend', spanAfter);
      }
    }
  }

  function addClickEventForEachPaginationControl() {
    let prevPageElem = document.getElementsByClassName('pager__prev')[0];
    let nextPageElem = document.getElementsByClassName('pager__next')[0];

    prevPageElem.onclick = function() {
      let selectedPageElem = document.getElementsByClassName('pager__page--current')[0];
      if (selectedPageElem.innerHTML > 1) {
        selectedPageElem.classList.remove('pager__page--current');
        let newSelectedElem = document.getElementsByClassName('pager__page')[parseInt(selectedPageElem.innerHTML - 2)];
        newSelectedElem.classList.add('pager__page--current');

        if (parseInt(newSelectedElem.innerHTML) !== 1) {
          prevPageElem.setAttribute('href', '#');
        } else {
          prevPageElem.removeAttribute('href');
        }

        nextPageElem.setAttribute('href', '#');
      }

      updateNumPerPageFilter();
      groupPaginationLinks()
    };

    nextPageElem.onclick = function() {
      let selectedPageElem = document.getElementsByClassName('pager__page--current')[0];
      let paginationSize = document.getElementsByClassName('pager__page').length;
      if (selectedPageElem.innerHTML < paginationSize) {
        selectedPageElem.classList.remove('pager__page--current');
        let newSelectedElem = document.getElementsByClassName('pager__page')[selectedPageElem.innerHTML];
        newSelectedElem.classList.add('pager__page--current');

        if (parseInt(newSelectedElem.innerHTML) !== paginationSize) {
          nextPageElem.setAttribute('href', '#');
        } else {
          nextPageElem.removeAttribute('href');
        }

        prevPageElem.setAttribute('href', '#');
      }

      updateNumPerPageFilter();
      groupPaginationLinks()
    };
  }

  function updatePaginationControl() {
    let prevPageElem = document.getElementsByClassName('pager__prev')[0];
    let nextPageElem = document.getElementsByClassName('pager__next')[0];

    let selectedPageNum = parseInt(document.getElementsByClassName('pager__page--current')[0].innerHTML);
    let paginationSize = document.getElementsByClassName('pager__page').length;

    if (paginationSize === 1) {
      prevPageElem.removeAttribute('href');
      nextPageElem.removeAttribute('href');
    } else {
      if (selectedPageNum !== 1) {
        prevPageElem.setAttribute('href', '#');
      } else {
        prevPageElem.removeAttribute('href');
      }

      if (selectedPageNum !== paginationSize) {
        nextPageElem.setAttribute('href', '#');
      } else {
        nextPageElem.removeAttribute('href');
      }
    }
  }

  function createPaginationList() {
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
    groupPaginationLinks();
    updatePaginationControl();
  }

  function updateCountryFilter() {
    let rowElements = document.querySelectorAll('tbody > tr');

    let filterCountry = document.getElementsByClassName('filter__input')[0].value;

    rowElements.forEach(function(elem) {
      if (!(elem.getElementsByClassName('country')[0].textContent.startsWith(filterCountry))) {
        elem.classList.add('js-filter-hidden');
      } else {
        elem.classList.remove('js-filter-hidden');
      }
    });

    createPaginationList();
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

  function executeFilters() {
    updateCountryFilter();
    updateNumPerPageFilter();
  }

  function executePagination() {
    addClickEventForEachPaginationLink();
    addClickEventForEachPaginationControl();
    createPaginationList();
    groupPaginationLinks();
  }
})();