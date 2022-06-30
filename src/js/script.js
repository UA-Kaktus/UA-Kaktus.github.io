window.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger'),
          menuBlock = document.querySelector('.nav-menu'),
          menuLinks = document.querySelectorAll('.nav-item');

    burgerBtn.addEventListener('click', (event) => {
        burgerBtn.classList.toggle('burger-active');
        menuBlock.classList.toggle('nav-menu-active');
    });
    menuLinks.forEach(el => {
        el.addEventListener('click', () => {
            burgerBtn.classList.toggle('burger-active');
            menuBlock.classList.toggle('nav-menu-active');
        });
    });
});