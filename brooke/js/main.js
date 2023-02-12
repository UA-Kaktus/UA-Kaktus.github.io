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

    //Слайдер 2.0

    const sliderWrapper = document.querySelector('.slider__wrapper');
    const slides = document.querySelectorAll('.slider__wrapper .slider__item');
    const controllersWrap = document.querySelector('.slider__nav .slider__nav-list');
    let controllers = [];
    let activeSlide = 1;

    const slideWith = window.getComputedStyle(slides[0]).width;
    const sliderWrapperWidth = slides.length * (deleteNotDigits(slideWith) + 20) - 20;

    sliderWrapper.style.width = `${sliderWrapperWidth}px`;
    sliderWrapper.style.display = `flex`;

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.addEventListener('click', (e) => {
            controllers.forEach(el => el.classList.remove('active-dot'));
            e.target.classList.add('active-dot');
            activeSlide = e.target.getAttribute('data-slide-to');
            let offset = (activeSlide - 1) * (deleteNotDigits(slideWith) + 20);
            sliderWrapper.style.left = `-${offset}px`;
        })
        controllers.push(dot);
    }

    let visibleDots = controllers.length - (window.innerWidth > 1200 ? 2 : 1);

    controllers.forEach(el => {
        if (el.getAttribute('data-slide-to') <= visibleDots) {
            controllersWrap.append(el);
        }
    });
    controllers[0].classList.add('active-dot');

    sliderWrapper.addEventListener('touchstart', handleTouchStart, false);  
    sliderWrapper.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;                                                        
    let yDown = null;                                                        

    function handleTouchStart(evt) {                                         
        xDown = evt.touches[0].clientX;                                      
        yDown = evt.touches[0].clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                if (activeSlide < visibleDots) {
                    activeSlide++
                    controllers.forEach(el => el.classList.remove('active-dot'));
                    controllers[activeSlide-1].classList.add('active-dot');
                    let offset = (activeSlide - 1) * (deleteNotDigits(slideWith) + 20);
                    sliderWrapper.style.left = `-${offset}px`;
                }
            } else {
                if (activeSlide > 1) {
                    activeSlide--
                    controllers.forEach(el => el.classList.remove('active-dot'));
                    controllers[activeSlide-1].classList.add('active-dot');
                    let offset = (activeSlide - 1) * (deleteNotDigits(slideWith) + 20);
                    sliderWrapper.style.left = `-${offset}px`;                    
                }
            }
        }
        xDown = null;
        yDown = null;                                             
    };

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