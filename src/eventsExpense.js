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
})
