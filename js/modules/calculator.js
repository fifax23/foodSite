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

module.exports = calculator;