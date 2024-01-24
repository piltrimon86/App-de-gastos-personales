const containerExpenses = document.querySelector('#gastos .gastos__lista')

const uploadExpense = () => {
    const expense = JSON.parse(window.localStorage.getItem('expenses'))

    if (expense && expense.length > 0) {
        console.log('si hay gastos')
    } else {
        //No aseguramos que no haya gastos en el DOM
        containerExpenses.innerHTML = ''
        // Si no hay gastos, activamos el mensaje que indica que no los hay
        document
            .querySelector('#gastos .gastos__mensaje')
            .classList.add('gastos__mensaje--active')
    }
}

export default uploadExpense
