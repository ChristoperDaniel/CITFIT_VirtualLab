const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("open-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

window.onload = () => {
    if(!sessionStorage.username){ //kalau blm login
        location.href = '/';
    }
}