document.addEventListener('DOMContentLoaded', () => {
    menu();

    function menu() {
        const mobMenu = document.querySelector('.navigation');
        const burger = document.querySelector('.wrapper__burger');
        let mobMenuActive = false;
        
        burger.addEventListener('click', (e) => {
            if (mobMenuActive) {
                burger.classList.remove('wrapper__burger_active');
                mobMenu.style.left = "-100%";
                mobMenuActive = false;
                document.body.style.overflow = '';
            } else {
                burger.classList.add('wrapper__burger_active');
                mobMenu.style.left = 0;
                mobMenuActive = true;
                document.body.style.overflow = 'hidden';
            }
        });
    }
});