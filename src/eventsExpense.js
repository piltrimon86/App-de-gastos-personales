import { openSpendForm } from './eventBtnFormExpend'

const containerExpenses = document.getElementById('gastos')
containerExpenses.addEventListener('click', (e) => {
    const expense = e.target.closest('.gasto')

    // Comprobamos si estamos haciendo click en un gasto
    if (expense) {
        if (expense.scrollLeft > 0) {
            expense.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            })
        } else {
            expense.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            })
        }
    }

    // Comprobamos si estamos haciendo click en Editar
    if (e.target.closest('[data-accion="editar-gasto"]')) {
        // Obtenemos el id del gasto que queremos editar
        const id = expense.dataset.id

        // Obtenemos los gastos guardados en localStorage
        const savedExpenses = JSON.parse(
            window.localStorage.getItem('expenses')
        )

        let amount = ''
        let description = ''

        // Comprobamos si hay gastos guardados
        if (savedExpenses && savedExpenses.length > 0) {
            savedExpenses.forEach((expense) => {
                if (expense.id === id) {
                    amount = expense.price
                    description = expense.description
                }
            })

            // Le ponemos la descripcion y el precio a los inputs del formulario
            document.querySelector('#formulario-gasto #descripcion').value =
                description
            document.querySelector('#formulario-gasto #precio').value = amount
            document.querySelector('#formulario-gasto').dataset.id = id

            openSpendForm('editExpense')
        }
    }
})
