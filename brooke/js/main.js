document.addEventListener("DOMContentLoaded",()=> {
    //ховер для соц сетей
    const socialLinks = document.querySelectorAll('.contact-us__icons-item');

    socialLinks.forEach(el => {
        el.addEventListener('mouseenter', event => {
            socialLinks.forEach(el => el.style.opacity = 0.5);
            event.target.style.opacity = 1;
        });
        el.addEventListener('mouseleave', event => {
            socialLinks.forEach(el => el.style.opacity = 1);
        });
    });

    //Валидация формы
    const formInputs = document.querySelectorAll('.discuss__form input');
    const formBtn = document.querySelector('.discuss__form button');

    formBtn.addEventListener('click', event => {
        event.preventDefault();
        let dataValidation = true;
        formInputs.forEach(el => {
            if (!el.value) {
                dataValidation = false;
                el.labels[0].classList.add('incorrect');
            }
        });
        if(dataValidation) {
            //отправляем данные и чистим форму
            document.querySelector('form.discuss__form').reset();
            openModal();
        }
    });

    formInputs.forEach(el => {
        el.addEventListener('input', event => {
            el.labels[0].classList.remove('incorrect');
        })
    });

    //модальное окно - thanks page
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelector('.modal .modal__btn');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });
    modalBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        closeModal();
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    //Слайдер
    const slider = document.querySelector('.news__slider');
    const sliderWrapper = document.querySelector('.slider__wrapper');
    const slides = document.querySelectorAll('.slider__wrapper .slider__item');

    let slideWith = window.getComputedStyle(slides[0]).width;
    let sliderWrapperWidth = slides.length * (deleteNotDigits(slideWith) + 20) - 20;

    sliderWrapper.style.width = `${sliderWrapperWidth}px`;
    sliderWrapper.style.display = `flex`;

    let test = window.innerWidth;
    console.log(test);

   const controllers = document.querySelector('.slider__nav .slider__nav-list');
   let offset = 0;
   let slydesPerSwipe = 1;
   let howManyDotsDelete = window.innerWidth > 1200 ? 2 : 1;
   let dotQuantity = slides.length / slydesPerSwipe - howManyDotsDelete;
   for (let i = 0; i < dotQuantity; i++) {
        let listItem = document.createElement('li');
        i == 0 ? listItem.classList.add('active-dot') : null;
        listItem.addEventListener('click', (e) => {
            offset = (deleteNotDigits(slideWith) + 20) * slydesPerSwipe * i;
            sliderWrapper.style.left = `-${offset}px`;
            let dots = document.querySelectorAll('.slider__nav .slider__nav-list li');
            dots.forEach(el => {
                el.classList.remove('active-dot');
            });
            e.target.classList.add('active-dot');
        });
        controllers.append(listItem);
   }

   function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    //Моб меню
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


});