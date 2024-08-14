let mensajeEncriptado = '';
let mensajeDesencriptado = '';

function encriptar() {
    //Se obtiene el valor que el usuario ingreso en el input
    let mensajeDeUsuario = document.getElementById('valorUsuario').value;
    mensajeEncriptado = mensajeDeUsuario;
    //Se comprueba si existen vocales dentro de la cadena y se sustituyen
    if (mensajeDeUsuario.includes('e')) {
        mensajeEncriptado = mensajeEncriptado.replace(/e/g, 'enter');
    }
    if (mensajeDeUsuario.includes('i')) {
        mensajeEncriptado = mensajeEncriptado.replace(/i/g, 'imes');
    }
    if (mensajeDeUsuario.includes('a')) {
        mensajeEncriptado = mensajeEncriptado.replace(/a/g, 'ai');
    }
    if (mensajeDeUsuario.includes('o')) {
        mensajeEncriptado = mensajeEncriptado.replace(/o/g, 'ober');
    }
    if (mensajeDeUsuario.includes('u')) {
        mensajeEncriptado = mensajeEncriptado.replace(/u/g, 'ufat');
    }
    //manda el texto a la función para que se muestre en el contenedor
    asignarTextoElemento(mensajeEncriptado);
    //Se muestra el boton de copiar
    document.querySelector('.contenedor_derecha_boton').removeAttribute('hidden');

    //Limpia el input
    borrarTextoInput();
}

function desencriptar() {
    //Se obtiene el valor que el usuario ingreso en el input
    let mensajeDeUsuario = document.getElementById('valorUsuario').value;
    mensajeDesencriptado = mensajeDeUsuario;
    //Se comprueba si existen vocales dentro de la cadena y se sustituyen
    if (mensajeDeUsuario.includes('enter')) {
        mensajeDesencriptado = mensajeDesencriptado.replace(/enter/g, 'e');
    }
    if (mensajeDeUsuario.includes('imes')) {
        mensajeDesencriptado = mensajeDesencriptado.replace(/imes/g, 'i');
    }
    if (mensajeDeUsuario.includes('ai')) {
        mensajeDesencriptado = mensajeDesencriptado.replace(/ai/g, 'a');
    }
    if (mensajeDeUsuario.includes('ober')) {
        mensajeDesencriptado = mensajeDesencriptado.replace(/ober/g, 'o');
    }
    if (mensajeDeUsuario.includes('ufat')) {
        mensajeDesencriptado = mensajeDesencriptado.replace(/ufat/g, 'u');
    }
    asignarTextoElemento(mensajeDesencriptado);
    document.querySelector('.contenedor_derecha_boton').removeAttribute('hidden');

    borrarTextoInput();
}

//Coloca el mensaje encriptado o desencriptado dentro del contenedor
function asignarTextoElemento(texto) {
    let elementoHTML = document.getElementById('contenedor_mensaje');
    elementoHTML.innerHTML = texto;
    return;
}

//Copia el texto 
async function copiar() {
    let texto = document.getElementById('contenedor_mensaje').innerHTML;
    
    try {
        await navigator.clipboard.writeText(texto);
        alert('Mensaje copiado');
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
}

//Limpia el input
function borrarTextoInput() {
    let mensajeInput = document.getElementById('valorUsuario');
    mensajeInput.value= '';
}

//Valida que la cadena de entrada cumpla con los requisitos
function validarTexto(e) {
    let botonEncriptar = document.querySelector('.boton_izquierda');
    let botonDesencriptar = document.querySelector('.boton_derecha');
    let arreglo = e.split('');
    let bandera = false;
    let regex = /[a-z|\s|.,]+/;

    //Valida la expresion regex en cada una de las letras de la cadena
    arreglo.map(letra => {
        if (!regex.test(letra)) {
            bandera = true
        } 
    });

    //Si la bandera es true desactiva los botones de encriptar y desencriptar
    if (bandera) {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
        //Si el usuario ingresa un caracter no válido, se le mandará una alerta y se borrará el ultimo valor
        let mensajeInput = document.getElementById('valorUsuario').value;
        document.getElementById('valorUsuario').value = mensajeInput.slice(0, mensajeInput.length - 1);
        alert('Favor de ingresar solamente letras minúsculas y espacios');
        //Vuelve a mandar el valor del input para comprobar una vez que se borro el valor no permitido
        validarTexto(document.getElementById('valorUsuario').value);
        //Si la bandera es false activa los botones de encriptar y desencriptar
    } else {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    } 
}