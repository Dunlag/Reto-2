console.log("hola mundo");


// Selecciona correctamente el enlace con la clase a__abrir
document.querySelector(".a__abrir").addEventListener("click", () => {
    document.querySelector("aside.offcanvas").classList.toggle("show");
});

// Funcionalidad para el botón de cerrar
document.querySelector("button.close").addEventListener("click", () => {
    document.querySelector("aside.offcanvas").classList.toggle("show");
});

