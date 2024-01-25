const button = document.getElementById('toggle-form-gasto')
const spendForm = document.getElementById('formulario-gasto')

const openSpendForm = (mode = 'addExpense') => {
    button.classList.add('agregar-gasto__btn--active')
    spendForm.classList.add('formulario-gasto--active')

    if (mode === 'editExpense') {
        document.querySelector('.formulario-gasto__titulo').innerText =
            'Editar Gasto'
        document.querySelector('.formulario-gasto__btn').innerText =
            'Editar Gasto'
        document.getElementById('formulario-gasto').dataset.mode = 'editExpense'
    } else {
        document.getElementById('descripcion').value = ''
        document.getElementById('precio').value = ''
        document.querySelector('.formulario-gasto__titulo').innerText =
            'Agregar Gasto'
        document.querySelector('.formulario-gasto__btn').innerText =
            'Agregar Gasto'
        document.getElementById('formulario-gasto').dataset.mode = 'addExpense'
    }
}

const closeSpendForm = () => {
    button.classList.remove('agregar-gasto__btn--active')
    spendForm.classList.remove('formulario-gasto--active')
}

button.addEventListener('click', (e) => {
    if ([...spendForm.classList].includes('formulario-gasto--active')) {
        closeSpendForm()
    } else {
        openSpendForm()
    }
})

export { closeSpendForm, openSpendForm }
