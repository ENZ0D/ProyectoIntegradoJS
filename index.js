// ================================================ //
//              PARTE DE LOCAL STORAGE              //
// =================================================//

let cart = JSON.parse(localStorage.getItem("cart")) || []; 
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ================================================ //
//                COSAS DEL CARRITO                 //
// =================================================//

const carritoBtn = document.querySelector(".iconCart"); 
const carrito = document.querySelector(".cart");
const cartBurbuja = document.querySelector(".cartIndicadorBurbuja");  
const total = document.querySelector(".total"); 
const btnComprar = document.querySelector(".btn-buy");
const btnDelete = document.querySelector(".btn-delete"); 
const carro = document.querySelector(".cart-container"); 

const showCart = () => {
    carrito.classList.toggle("carritoAbierto");
}

// ================================================ //
//                      MODELS                      //
// =================================================//

const modelsContainer = document.querySelector(".modelos");
const modelList = document.querySelectorAll(".model");

// ================================================ //
//              CONTENEDOR DE PRODUCTOS             //
// =================================================//

const productoscontainers = document.querySelector(".productoscontainer");

// ================================================ //
//                      MENU                        //
// =================================================//

const nav = document.getElementById ("navbar");
const open = document.getElementById ("open");
const close = document.getElementById ("close");

open.addEventListener("click", () => {
    nav.classList.add("visible");
});

close.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// ================================================ //
//                      VER MÁS                     //
// =================================================//

const btnVerMas = document.querySelector(".btnVerMas");

// ================================================ //
//                 COSAS DEL FORMULARIO             //
// =================================================//

const registerForm = document.querySelector("#contacto-form");
const nameInput = document.querySelector("#name"); 
const emailInput = document.querySelector("#email"); 
const messageInput = document.querySelector("#mensaje"); 

let users = [];

const validation = (input) => {
    const valid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return valid.test(input.value.trim());
}

const inputVacio = (input) =>{
    return !input.value.trim().length;
}

const  between = (input, min, max) =>{
    return input.value.length >= min && input.value.length <= max;
}

const errorInput = (input, mensaje) =>{
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = mensaje;
};

const correctInput = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

const checkEmail = (input) =>{
    let valid = false;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    if(!validateEmail(input)){
        showErrorInput(input, "- MAIL INVALIDO -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const checkInput = (input) =>{
    // código a checkear
    let valid = false;
    const MIN_CHARACTERS = 3;
    const MAX_CHARACTERS = 30;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    if(!isBetween(input, MIN_CHARACTERS, MAX_CHARACTERS)){
        showErrorInput(input, "- NOMBRE INVALIDO (MIN 3 - MAX 30) -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const checkMessage = (input) =>{
    let valid = false;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const formValidation = (e) =>{
    e.preventDefault();
    let nameValid = checkInput(nameInput);
    let emailValid = checkEmail(emailInput);
    let messageValid = checkMessage(messageInput);
    let isValidForm = nameValid && emailValid && messageValid;
    if(isValidForm){
        users.push({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
        })
        alert("Gracias por contactarte con nosotros. Pronto nos comunicaremos con usted!");
    }
}

// ================================================ //
//              RENDERIZADO DE EQUIPOS              //
// =================================================//

const equiposRender = (equiposList) => {
    librosContainer.innerHTML += equiposList.map(createProductTemplate).join(""); 
}

// ================================================ //
//                    FILTRADOS                     //
// =================================================//

const changeActiveBtn = (modelSelected) => {
    const modelss = [...modelList];
    modelss.forEach((btnMod) => {
        if(btnMod.dataset.model !== modelSelected){
            btnMod.classList.remove("btnActive");
            return
        }
        btnMod.classList.add("btnActive");
    })
}

const activeFilterChange = (btn) => {
    appState.activeFilter = btn.dataset.model;
    btnChangedState(appState.activeFilter);
    //setMore(appState.activeFilter);
}

const equiposFilterRender = () => {
    const filtradosDeEquipos = dataEquip.filter(
        (equipo) => equipo.model === appState.activeFilter
    );
    renderEquipos(filtradosDeEquipos);
}

const aplicationFilter = ({X}) => {
    if(!btnInact(X)) return;
    activeFilterChange(X);
    productoscontainers.innerHTML = "";
    if(appState.activeFilter) {
        equiposRender();
        appState.currentProductsIndex = 0;
        return;
    }
    renderEquipos(appState.products[0]);
}

// ================================================ //
//                      INIT                        //
// =================================================//

const init = () => {
    equiposRender(appState.products [0]);
    //btnVerMas.addEventListener("click", ver+);
    productoscontainers.addEventListener("click", showCart);
    carritoBtn.addEventListener("click", aplicationFilter);
    productoscontainers.addEventListener("click", addEquipos); //de acá llamo a dónde se renderiza los equipos (productos).
    carro.addEventListener("click", quantity); //llamo a el manejo de cantidad del carro.
    document.addEventListener("DOMContentLoaded", cartRendered); //llamo para que renderice para hacer compra.
    btnComprar.addEventListener("click", compraCompletada); //del carrito para hacer la compra.
    btnDelete.addEventListener("click", compraVaciada); // del carrito para vaciarlo.
    // (*)
    registerForm.addEventListener("submit", formValidation);
    nameInput.addEventListener("input" ,() => checkInput(nameInput));
    emailInput.addEventListener("input" ,() => checkEmail(emailInput));
    messageInput.addEventListener("input" ,() => checkMessage(messageInput));
};

init();


// • COSAS • A • TERMINAR / REVISAR • //
// - Revisar por si hay un error en como se hace la validación (revisar a lo último, prioridad a lo de abajo).
// - Falta terminar y perfeccionar el renderizado de los productos en la parte de las categorias.
// - Ver el tema del carro, hay algunas cosas que todavía no estan del todo terminadas.
// - Revisar nuevamente lo que se puso en el INIT, hay variables mal nombradas o nombradas de 2 formas distintas.
// - Testear nuevamente el tema de la funcionalidad del carro (esto es para REVISAR).
// - (*): falta poner lo del indicador de cantidad de cosas que hay en el carro.
