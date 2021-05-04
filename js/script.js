import tabs from './modules/tabs';
import modal  from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2021-06-11');
    cards();
    calculator();
    forms('form');
    slider({
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