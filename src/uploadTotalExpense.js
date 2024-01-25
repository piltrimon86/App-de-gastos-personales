import parseISO from 'date-fns/parseISO'
import isThisMonth from 'date-fns/isThisMonth'

const uploadTotalExpense = () => {
    const containerTotalExpense = document.getElementById('total-gastado')
    const expenses = JSON.parse(window.localStorage.getItem('expenses'))
    let total = 0

    if (expenses) {
        const monthlyExpenses = expenses.filter((expense) => {
            if (isThisMonth(parseISO(expense.date))) {
                return expense
            }
        })

        if (monthlyExpenses) {
            monthlyExpenses.forEach((expense) => {
                total += parseFloat(expense.price)
            })
        }

        // Formateamos la moneda y lo agregamos al contenedor
        const currencyFormat = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        })
        containerTotalExpense.innerText = currencyFormat.format(total)
    }
}

export default uploadTotalExpense
