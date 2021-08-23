var addBtn = document.querySelector("#addButton a");
var popup = document.querySelector("#popupbackground");
var closeBtn = document.querySelector("#popup form a");

addBtn.addEventListener("click", ()=>{
    // O que vai acontecer quando clicar no botão adicionar
    popup.style.display = "flex";
    popup.style.transition = "display 5s";
})

closeBtn.addEventListener("click", ()=>{
    popup.style.display = "none";
    popup.style.transition = "display 5s";
})