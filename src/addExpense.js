// Dependencia de rollup para crear id únicos
import { v4 as uuidv4 } from 'uuid'
import { closeSpendForm } from './eventBtnFormExpend'
import uploadExpense from './uploadExpense'
import uploadTotalExpense from './uploadTotalExpense'

const form = document.querySelector('#formulario-gasto form')
const description = form.descripcion
const price = form.precio

const expRegDescription = /^[a-zA-Z0-9\_\- ]{4,30}$/
const expRegPrice = /^\d+(\.\d+)?$/

const checkDescription = () => {
    if (!expRegDescription.test(descripcion.value)) {
        description.classList.add('formulario-gasto__input--error')

        form.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active')

        return false
    } else {
        description.classList.remove('formulario-gasto__input--error')

        form.descripcion.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active')

        return true
    }
}

const checkPrice = () => {
    if (!expRegPrice.test(precio.value)) {
        price.classList.add('formulario-gasto__input--error')

        form.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active')

        return false
    } else {
        price.classList.remove('formulario-gasto__input--error')

        form.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active')

        return true
    }
}

// EventListener para cuando el input de Descripción pierde el focus
description.addEventListener('blur', (e) => checkDescription())
// EventListener para cuando el input tiene un error y el usuario comienza a escribir para corregirlo
description.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        checkDescription()
    }
})

// EventListener para cuando el input de Precio pierde el focus
price.addEventListener('blur', (e) => checkPrice())
// EventListener para cuando el input tiene un error y el usuario comienza a escribir para corregirlo
price.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        checkPrice()
    }
})
// EventListener para detectar cuando se agrega un gasto usando el botón correspondiente
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (checkDescription() && checkPrice()) {
        const newExpenditure = {
            id: uuidv4(),
            date: new Date(),
            description: description.value,
            price: price.value,
        }

        const savedExpenses = JSON.parse(
            window.localStorage.getItem('expenses')
        )
        // Comprobamos si hay gastos guardados en localStorage
        if (savedExpenses) {
            // Creamos una lista nueva de gastos que incluya el nuevo o nuevos
            const newEspenses = [...savedExpenses, newExpenditure]
            window.localStorage.setItem('expenses', JSON.stringify(newEspenses))
        } else {
            // Agregamos el primer gasto
            window.localStorage.setItem(
                'expenses',
                JSON.stringify([{ ...newExpenditure }])
            )
        }

        description.value = ''
        price.value = ''

        uploadExpense()
        closeSpendForm()
        uploadTotalExpense()
    }
})
