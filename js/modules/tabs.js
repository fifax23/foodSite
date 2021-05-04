function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs
    const tabsParent = document.querySelector(tabsParentSelector),
          tabs = tabsParent.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }
    

    function showTabContent(id = '0') {
        tabContent[id].classList.add('show', 'fade');
        tabContent[id].classList.remove('hide');
        tabs[id].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, index) => {
                if (e.target == tab) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

export default tabs;