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
//# sourceMappingURL=bundle.js.map
