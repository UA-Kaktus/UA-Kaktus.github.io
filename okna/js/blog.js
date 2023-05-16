document.addEventListener('DOMContentLoaded', () => {
    modal();
    menu();

    function menu() {
        const mobMenu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.mobile-burger');
        const mobLinks = document.querySelectorAll('.mobile-menu ul li a');
        let mobMenuActive = false;
        
        burger.addEventListener('click', (e) => {
            if (mobMenuActive) {
                burger.classList.remove('mobile-burger-active');
                mobMenu.classList.remove('mobile-menu__active');
                mobMenuActive = false;
                document.body.style.overflow = '';
            } else {
                burger.classList.add('mobile-burger-active');
                mobMenu.classList.add('mobile-menu__active');
                mobMenuActive = true;
                document.body.style.overflow = 'hidden';
            }
        });
    
        mobLinks.forEach(el => el.addEventListener('click', ()=> {
            if (mobMenuActive) {
                burger.classList.remove('mobile-burger-active');
                mobMenu.classList.remove('mobile-menu__active');
                mobMenuActive = false;
                document.body.style.overflow = '';
            }
        }));

        mobMenu.addEventListener('click', (e) => {
            if (e.target == mobMenu) {
                burger.classList.remove('mobile-burger-active');
                mobMenu.classList.remove('mobile-menu__active');
                mobMenuActive = false;
                document.body.style.overflow = '';
            }
        });
    }

    function modal() {
        const modalButtons = document.querySelectorAll('[data-modal]');
        const modalOverlay = document.querySelector('.overlay');
        const modalClose = modalOverlay.querySelector('.modal__close');

        modalButtons.forEach( el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        modalClose.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });

        modalOverlay.addEventListener('click', event => {
            if (event.target == modalOverlay) {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});