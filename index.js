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



// ================================================ //
//              RENDERIZADO DE EQUIPOS              //
// =================================================//

const equiposRender = (equiposList) => {
    librosContainer.innerHTML += equiposList.map(createProductTemplate).join(""); 
}

// ================================================ //
//                      INIT                        //
// =================================================//

const init = () => {
    
};

init();