window.addEventListener('DOMContentLoaded', () => {
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

    //Slider
    const slidePrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slides = slidesWrapper.querySelectorAll('.offer__slide'),
        totalNumber = document.querySelector('#total'),
        currentNumber = document.querySelector('#current');


        let slideIndex = 1;

        if (slides.length < 10) {
            totalNumber.textContent = `0${slides.length}`;
        } else {
            totalNumber.textContent = slides.length;
        }

        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 1;
            }

            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach(slide => {
                slide.classList.add('hide');
                slide.classList.remove('show');
            });

            slides[slideIndex - 1].classList.add('show');
            slides[slideIndex - 1].classList.remove('hide');

            if (slides.length < 10) {
                currentNumber.textContent = `0${slideIndex}`;
            } else {
                currentNumber.textContent = slideIndex;
            }
        }
        
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        slidePrev.addEventListener('click', () => {
            plusSlides(-1);
        });

        sliderNext.addEventListener('click', () => {
            plusSlides(+1);
        });

        slidesWrapper.addEventListener('click', (e) => {
            if (e.target && e.target.tagName == 'IMG') {
                plusSlides(+1);
            }
            
        });
});

