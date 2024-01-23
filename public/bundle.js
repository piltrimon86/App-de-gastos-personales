'use strict';

const button = document.getElementById('toggle-form-gasto');
const spendForm = document.getElementById('formulario-gasto');

const openSpendForm = () => {
    button.classList.add('agregar-gasto__btn--active');
    spendForm.classList.add('formulario-gasto--active');
};

const closeSpendForm = () => {
    button.classList.remove('agregar-gasto__btn--active');
    spendForm.classList.remove('formulario-gasto--active');
};

button.addEventListener('click', (e) => {
    if ([...spendForm.classList].includes('formulario-gasto--active')) {
        closeSpendForm();
    } else {
        openSpendForm();
    }
});

const form = document.querySelector('#formulario-gasto form');
const description = form.descripcion;

const expRegDescription = /^[a-zA-Z0-9\_\- ]{4,30}$/;

const checkDescription = () => {
    if (!expRegDescription.test(descripcion.value)) {
        description.classList.add('formulario-gasto__input--error');

        form.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active');

        return false
    } else {
        description.classList.remove('formulario-gasto__input--error');

        form.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true
    }
};

description.addEventListener('blur', (e) => checkDescription());
description.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        checkDescription();
    }

    // checkDescription()
});
//# sourceMappingURL=bundle.js.map
