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

    const sliderPrev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        sliderNext = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slides = slidesWrapper.querySelectorAll('.offer__slide'),
        totalNumber = document.querySelector('#total'),
        currentNumber = document.querySelector('#current'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;


        let slideIndex = 1;
        let offset = 0;

        if (slides.length < 10) {
            totalNumber.textContent = `0${slides.length}`;
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            totalNumber.textContent = slides.length;
            currentNumber.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';
        
        slides.forEach(slide => {
            slide.style.width = width;
        });

        slider.style.position = 'relative';
        const indicators = document.createElement('ol'), 
            dots = [];

        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);

        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }

        sliderNext.addEventListener('click', () => {
            if (offset == parseInt(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += parseInt(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if (slides.length < 10) {
                currentNumber.textContent = `0${slideIndex}`;
            } else {
                currentNumber.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });

        sliderPrev.addEventListener('click', () => {
            if (offset == 0) {
                offset = parseInt(width) * (slides.length - 1);
            } else {
                offset -= parseInt(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if (slides.length < 10) {
                currentNumber.textContent = `0${slideIndex}`;
            } else {
                currentNumber.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = parseInt(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if (slides.length < 10) {
                    currentNumber.textContent = `0${slideIndex}`;
                } else {
                    currentNumber.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = '1';
            });
        });

        // Timer

        const deadLine = '2021-06-10';

        function getTimeRemaining(endTime) {
            const t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / (1000 * 60) % 60),
                seconds = Math.floor((t / 1000) % 60));
            
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            };

        }

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function setClock(selector, endTime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timerInterval = setInterval(updateClock, 1000);
                updateClock();

            function updateClock() {
                const t = getTimeRemaining(endTime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timerInterval);
                }
            }
        }
        setClock('.timer', deadLine);

        // Modal

        const modalTrigger = document.querySelectorAll('[data-modal]'),
                modal = document.querySelector('.modal');
               

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            // clearInterval(modalTimerId);
        }

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', () => {
                openModal();
            });
        });

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        

        modal.addEventListener('click', (e) => {
            if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // const modalTimerId = setTimeout(openModal, 3000);

        function showModalByScroll() {
            if (Math.round(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
        window.addEventListener('scroll', showModalByScroll);


        // Menu Cards
        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 425;
                this.changeToKZT(); 
            }

            changeToKZT() {
                this.price = this.price * this.transfer; 
            }

            render() {
                const element = document.createElement('div');

                if (this.classes.length === 0) {
                    this.classes = "menu__item";
                    element.classList.add(this.classes);
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }

                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
                    </div>
                `;
                this.parent.append(element);
            }
        }

        const getResource = async (url) => {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }

            return await res.json();
        };

        getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });
        
        //Forms

        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/spinner.svg',
            succes: 'Спасибо! Скоро мы с вами свяжемся.',
            failure: 'Что-то пошло не так...',
        };

        forms.forEach(item => {
            bindPostData(item);
        });

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                body: data
            });

            return await res.json();
        };

        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);

                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
        }

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide');
            openModal();
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);
        }

        fetch('http://localhost:3000/menu')
            .then(data => data.json())
            .then(res => console.log(res));


        //Calculator
        let result = document.querySelector('.calculating__result span');
        const calcData = {
            gender: 'female',
            height: 0,
            weight: 0,
            age: 0,
            currentActiveLevel: 1.375,
            calculateCalories() {
                if (!this.gender || !this.height || !this.weight || !this.age || !this.currentActiveLevel) {
                    result.textContent = '_____';
                    return;
                }
                if (this.gender == 'male') {
                    result.textContent = Math.round((88.36 + (13.4 * this.weight) +(4.8 * this.height) - (5.7 * this.age)) * this.currentActiveLevel);
                } else {
                    result.textContent = Math.round((447.6 + (9.2 * this.weight) +(3.1 * this.height) - (4.3 * this.age)) * this.currentActiveLevel);
                }
            }
        };

        if (localStorage.getItem('sex')) {
            calcData.gender = localStorage.getItem('sex');
        } else {
            calcData.gender = 'female';
            localStorage.setItem('sex', 'female');
        }

        if (localStorage.getItem('ratio')) {
            calcData.currentActiveLevel = localStorage.getItem('ratio');
        } else {
            calcData.currentActiveLevel = 1.375;
            localStorage.setItem('ratio', 1.375);
        }

        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach((element) => {
                element.classList.remove(activeClass);
                if (element.getAttribute('id') === localStorage.getItem('sex')) {
                    element.classList.add(activeClass);
                }
                if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    element.classList.add(activeClass);
                }
            });
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

        calcData.calculateCalories();

        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                element.addEventListener('click', (e) => {
                    elements.forEach(item => item.classList.remove(activeClass));
                    e.target.classList.add(activeClass);
                    if (e.target.getAttribute('data-ratio')) {
                        calcData.currentActiveLevel = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                         } else {
                        calcData.gender = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
                    calcData.calculateCalories();
                });
            });
        }        
        
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
            input.addEventListener('input', () => {
                if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
                switch(input.getAttribute('id')) {
                    case 'height':
                        calcData.height = +input.value;
                        break;
                    case 'weight':
                        calcData.weight = +input.value;
                        break;
                    case 'age':
                        calcData.age = +input.value;
                        break;
                }
                calcData.calculateCalories();
            });
        }
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
});