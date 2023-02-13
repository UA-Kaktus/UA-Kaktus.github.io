document.addEventListener("DOMContentLoaded", () => {
    const mobMenu = document.querySelector('.mobile-menu');
    const burger = document.querySelector('.hamburger');
    const mobLinks = document.querySelectorAll('.mobile-menu__list-item');
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

    mobLinks.forEach(el => el.addEventListener('click', ()=> {
        if (mobMenuActive) {
            burger.classList.remove('hamburger-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        }
    }));

    //Скріпт на показ прихованих тегів
    const hiddenCategory =  document.querySelectorAll('.hidden-category');
    const counterCategory = document.querySelector('.counter-category');

    counterCategory.textContent = hiddenCategory.length;

    counterCategory.addEventListener('click', (e) => {
        hiddenCategory.forEach(el => el.classList.remove('hidden-category'));
        e.target.style.display = 'none';
    })
})