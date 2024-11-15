const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("open-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());




const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.username){ //kalau blm login
        location.href = '/';
    } else {    
        greeting.innerHTML = `Hi, <span>${sessionStorage.username}</span>!`;
    }
}


const logout = document.querySelector('.navbutton-logout');

logout.onclick = () => {
    sessionStorage.clear();
    location.reload();
}

