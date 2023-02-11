document.addEventListener("DOMContentLoaded", () => {
    const mobMenu = document.querySelector('.mobile-menu');
    const burger = document.querySelector('.hamburger');
    let mobMenuActive = false;
    
    burger.addEventListener('click', (e) => {
        if (mobMenuActive) {
            burger.classList.remove('hamburger-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        } else {
            burger.classList.add('hamburger-active');
            mobMenu.style.left = 0;
            mobMenuActive = true;
            document.body.style.overflow = 'hidden';
        }
    });
})