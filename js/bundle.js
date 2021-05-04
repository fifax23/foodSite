/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
 }

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector) {
    // Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal(modalSelector);
    });
    });

    modal.addEventListener('click', (e) => {
    if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector);
    }
    });

    // const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
    if (Math.round(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
        openModal(modalSelector);
        window.removeEventListener('scroll', showModalByScroll);
    }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider

    const sliderPrev = document.querySelector(previousArrow),
        slider = document.querySelector(container),
        sliderNext = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slides = slidesWrapper.querySelectorAll(slide),
        totalNumber = document.querySelector(totalCounter),
        currentNumber = document.querySelector(currentCounter),
        slidesField = document.querySelector(field),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    // Timer
    
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
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
    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
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

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        previousArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        field: '.offer__slider-inner',
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map