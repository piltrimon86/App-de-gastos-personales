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

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

const containerExpenses = document.querySelector('#gastos .gastos__lista');

const uploadExpense = () => {
    const expenses = JSON.parse(window.localStorage.getItem('expenses'));

    if (expenses && expenses.length > 0) {
        // Si hay gastos, desactivamos el mensaje que indica que no los hay
        document
            .querySelector('#gastos .gastos__mensaje')
            .classList.remove('gastos__mensaje--active');

        //No aseguramos que no haya gastos en el DOM
        containerExpenses.innerHTML = '';

        expenses.forEach((expense) => {
            containerExpenses.innerHTML += `
            <div class="gasto" data-id="${expense.id}">
				<div class="gasto__info">
					<div>
						<p class="gasto__nombre">${expense.description}</p>
						<p class="gasto__cantidad">${expense.price}</p>
					</div>
					<p class="gasto__fecha">${expense.date}</p>
				</div>
				<div class="gasto__acciones">
					<button class="gasto__btn" data-accion="editar-gasto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-pencil-square"
							viewBox="0 0 16 16"
						>
							<path
								d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
							/>
							<path
								fill-rule="evenodd"
								d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
							/>
							</svg>
								<span>Editar</span>
						</button>
						<button class="gasto__btn gasto__btn--rojo" data-accion="eliminar-gasto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
							    class="bi bi-trash3-fill"
								viewBox="0 0 16 16"
							>
							    <path
									d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
								/>
							</svg>
								<span>Eliminar</span>
						</button>
				</div>
			</div>
            `;
        });
    } else {
        //No aseguramos que no haya gastos en el DOM
        containerExpenses.innerHTML = '';
        // Si no hay gastos, activamos el mensaje que indica que no los hay
        document
            .querySelector('#gastos .gastos__mensaje')
            .classList.add('gastos__mensaje--active');
    }
};

// Dependencia de rollup para crear id únicos

const form = document.querySelector('#formulario-gasto form');
const description = form.descripcion;
const price = form.precio;

const expRegDescription = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrice = /^\d+(\.\d+)?$/;

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

const checkPrice = () => {
    if (!expRegPrice.test(precio.value)) {
        price.classList.add('formulario-gasto__input--error');

        form.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.add('formulario-gasto__leyenda--active');

        return false
    } else {
        price.classList.remove('formulario-gasto__input--error');

        form.precio.parentElement
            .querySelector('.formulario-gasto__leyenda')
            .classList.remove('formulario-gasto__leyenda--active');

        return true
    }
};

// EventListener para cuando el input de Descripción pierde el focus
description.addEventListener('blur', (e) => checkDescription());
// EventListener para cuando el input tiene un error y el usuario comienza a escribir para corregirlo
description.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        checkDescription();
    }
});

// EventListener para cuando el input de Precio pierde el focus
price.addEventListener('blur', (e) => checkPrice());
// EventListener para cuando el input tiene un error y el usuario comienza a escribir para corregirlo
price.addEventListener('keyup', (e) => {
    if ([...e.target.classList].includes('formulario-gasto__input--error')) {
        checkPrice();
    }
});
// EventListener para detectar cuando se agrega un gasto usando el botón correspondiente
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkDescription() && checkPrice()) {
        const newExpenditure = {
            id: v4(),
            date: new Date(),
            description: description.value,
            price: price.value,
        };

        const savedExpenses = JSON.parse(
            window.localStorage.getItem('expenses')
        );
        // Comprobamos si hay gastos guardados en localStorage
        if (savedExpenses) {
            // Creamos una lista nueva de gastos que incluya el nuevo o nuevos
            const newEspenses = [...savedExpenses, newExpenditure];
            window.localStorage.setItem('expenses', JSON.stringify(newEspenses));
        } else {
            // Agregamos el primer gasto
            window.localStorage.setItem(
                'expenses',
                JSON.stringify([{ ...newExpenditure }])
            );
        }

        description.value = '';
        price.value = '';

        uploadExpense();
        closeSpendForm();
    }
});

uploadExpense();
//# sourceMappingURL=bundle.js.map
