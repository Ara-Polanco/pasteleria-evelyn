
const formElement = document.querySelector('.contacto__form')
const elementosAValidar = document.querySelectorAll('.contacto__form .contacto__input') /* Seleccionamos todos los elementos a validar, obtenemos un array */

const expresiones = {
	message: /^[a-zA-ZÀ-ÿ0-9\s\_\-/*+:,;.%$()&=¿?!¡]{4,80}$/, // Diversos caracteres
	name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	number: /^\d{10,14}$/ // 10 a 14 numeros.
}

const estadoValidacionElementos = {
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  
}

elementosAValidar.forEach( (element) => {
    element.addEventListener('blur', validandoFormulario) /* Al salir del campo validado */
})

function validandoFormulario(e) {
    switch (e.target.name) {
        case 'name':
            if(expresiones.name.test(e.target.value)) {
                estadoValidacionElementos.name = true
            }  
        break
        case 'email':
            if(expresiones.email.test(e.target.value)) {
                estadoValidacionElementos.email = true
            }  
        break
        case 'phone':
            if(expresiones.number.test(e.target.value)) {
                estadoValidacionElementos.phone = true
            }  
        break
        case 'subject':
            if(expresiones.message.test(e.target.value)) {
                estadoValidacionElementos.subject = true
            }     
        break
        case 'message':
            if(expresiones.message.test(e.target.value)) {
                estadoValidacionElementos.message = true
            } 
        break
    }
}

formElement.addEventListener('submit', (e) => {
    e.preventDefault()

    if(estadoValidacionElementos.name && estadoValidacionElementos.email && estadoValidacionElementos.phone && estadoValidacionElementos.subject && estadoValidacionElementos.message) {
        formElement.reset()
        imprimirAlerta('Enviado correctamente')
        

        /* Reseteamos los valores para validar de nuevo al hacer click en submit */
        estadoValidacionElementos.name  = false
        estadoValidacionElementos.email = false
        estadoValidacionElementos.phone = false
        estadoValidacionElementos.subject = false
        estadoValidacionElementos.message = false
    } else {
        imprimirAlerta('Todos los campos son obligatorios', 'error')

        if(estadoValidacionElementos.name == false) {
            imprimirAlerta('Error, nombre inválido', 'error')
        }
        if(estadoValidacionElementos.email == false) {
            imprimirAlerta('Error, email inválido', 'error')
        }
        if(estadoValidacionElementos.phone == false) {
            imprimirAlerta('Error, teléfono inválido', 'error')
        }
        if(estadoValidacionElementos.subject == false) {
            imprimirAlerta('Error, asunto inválido', 'error')
        }
        if(estadoValidacionElementos.message == false) {
            imprimirAlerta('Error, mensaje inválido', 'error')
        }
    }
})


function imprimirAlerta(mensaje, tipoMensaje) {
    const alerta = document.querySelector('.alerta')

    if(!alerta) {
        /* Creamos la alerta */
        const alertaContenedor = document.createElement('P')
        alertaContenedor.classList.add('mensajeAlerta')

        if(tipoMensaje === 'error') {
            alertaContenedor.classList.add('error')
        } else {
            alertaContenedor.classList.add('correcto')
        }

        alertaContenedor.textContent = mensaje
        formElement.insertBefore(alertaContenedor,formElement[5]) /* Elegir la ubicacion donde se generara */

        setTimeout(() => {
            alertaContenedor.remove()
        }, 2000);
    } 
}

/* Slider  */
window.swiper = new Swiper( {
    el: '.galeria',
    slideClass: 'galeria__categoria',
    createElements: true,
    autoplay: {
        delay: 4000
    },
    loop: true,
    spaceBetween: 50,
    pagination: true,
    navigation: true
})