function tabs() {
    //Tabs
    const tabContent = document.querySelectorAll(".tabcontent"), 
          tabsParent = document.querySelector('.tabheader__items'),
          tabs = tabsParent.querySelectorAll('.tabheader__item');

    function hideTabContent() {
        tabContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }
    

    function showTabContent(id = '0') {
        tabContent[id].classList.add('show', 'fade');
        tabContent[id].classList.remove('hide');
        tabs[id].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if (e.target == tab) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

module.exports = tabs;