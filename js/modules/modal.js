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

export default modal;
export {closeModal, openModal};
