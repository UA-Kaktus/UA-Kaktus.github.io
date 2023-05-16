document.addEventListener('DOMContentLoaded', () => {
    menu();
    modal();
    slider('section.offers');
    slider('section.production-slider');
    slider('section.work-slider');
    calc();
    collage();
    timer();

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

    function slider(sliderParent) {
        const parent = document.querySelector(sliderParent);
        let slides = parent.querySelectorAll('.slider-item');
        const sliderWrapper = parent.querySelector('.slider-wrapper');
        const arrowNextSlide = parent.querySelector('.slider-right');
        const arrowPrevSlide = parent.querySelector('.slider-left');
        const dotsWrapper = parent.querySelector('.slider-dots');
        let currentSlideIndex = 0;
        let dotsItems = [];

        slides.forEach(el => el.remove());

        sliderWrapper.append(slides[0]);

        arrowNextSlide.addEventListener('click', nextSlide);
        arrowPrevSlide.addEventListener('click', prevSlide);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dots__item');
            i == currentSlideIndex ? dot.classList.add('slider-dots__item-active') : null;
            dotsItems.push(dot);
            dotsWrapper.append(dot);
        }

        function nextSlide() {
            arrowNextSlide.disabled = true;
            arrowPrevSlide.disabled = true;

            if (currentSlideIndex == slides.length - 1) {
                currentSlideIndex = 0;
            } else {
                currentSlideIndex++;
            }

            dotsItems.forEach((el,ind) => {
                el.classList.remove('slider-dots__item-active');
                ind == currentSlideIndex ? el.classList.add('slider-dots__item-active') : null;
            });

            const oldSlide = parent.querySelector('.slider-item');
            const newSlide = slides[currentSlideIndex];

            sliderWrapper.append(slides[currentSlideIndex]);
            newSlide.classList.add('slider-item__move-right');
            oldSlide.classList.add('slider-item__move-right');

            setTimeout(() => {
                oldSlide.remove();

                newSlide.classList.remove('slider-item__move-right');
                oldSlide.classList.remove('slider-item__move-right');

                arrowNextSlide.disabled = false;
                arrowPrevSlide.disabled = false;
            }, 400);
        };

        function prevSlide() {
            arrowNextSlide.disabled = true;
            arrowPrevSlide.disabled = true;

            if (currentSlideIndex == 0) {
                currentSlideIndex = slides.length - 1;
            } else {
                currentSlideIndex--;
            }

            dotsItems.forEach((el,ind) => {
                el.classList.remove('slider-dots__item-active');
                ind == currentSlideIndex ? el.classList.add('slider-dots__item-active') : null;
            });

            const oldSlide = parent.querySelector('.slider-item');
            const newSlide = slides[currentSlideIndex];

            sliderWrapper.prepend(slides[currentSlideIndex]);
            newSlide.classList.add('slider-item__move-left');
            oldSlide.classList.add('slider-item__move-left');

            setTimeout(() => {
                oldSlide.remove();

                newSlide.classList.remove('slider-item__move-left');
                oldSlide.classList.remove('slider-item__move-left');

                arrowNextSlide.disabled = false;
                arrowPrevSlide.disabled = false;
            }, 400);
        }
    }

    function calc() {
        const tabsContent = document.querySelectorAll('.calc-tabs__item');
        const tabsMenu = document.querySelectorAll('.calc-main__list-item');
        const summary = document.querySelector('.calc-main__price-num');

        usingInput('horizontal', 'window', 28, 72);
        usingInput('vertical', 'window', 4, 87);
        
        usingInput('horizontal', 'double-window', 12, 88);
        usingInput('vertical', 'double-window', 4, 87);

        usingInput('horizontal', 'triple-window', 12, 88);
        usingInput('vertical', 'triple-window', 17, 74);

        usingInput('horizontal', 'door', 19.5, 41);
        usingInput('vertical', 'door', 38, 81.5);
        usingInput('horizontal1', 'door', 63, 88);
        usingInput('vertical1', 'door', 10.5, 81);

        usingInput('horizontal', 'lodge', 11, 89);
        usingInput('vertical', 'lodge', 25, 66.5);

        usingInput('horizontal', 'balkony', 28, 71.5);
        usingInput('horizontal1', 'balkony', 10, 25);
        usingInput('horizontal2', 'balkony', 75, 90);
        usingInput('vertical', 'balkony', 29, 56.5);

        tabsMenu.forEach((el,ind) => {
            el.addEventListener('click', event => {
                tabsContent.forEach(el => {
                    el.classList.remove('calc-tabs__item-active');
                });
                tabsContent[ind].classList.add('calc-tabs__item-active');

                tabsMenu.forEach(el => el.classList.remove('calc-main__list-active'));
                el.classList.add('calc-main__list-active');

                calculateSimpleWindow();
            });

        });

        function usingInput(dataSide ,dataType, minLeft, maxLeft) {
            const rangeInput = document.querySelector(`[data-type=${dataType}] input[data-side=${dataSide}]`);
            const labelForInput = document.querySelector(`[data-type=${dataType}] [data-value=${dataSide}]`);

            const maxValue = rangeInput.getAttribute("max");
            const minValue = rangeInput.getAttribute("min");
            const step = (maxLeft - minLeft) / (maxValue - minValue);

            changingRangeValue();
            rangeInput.addEventListener('input', changingRangeValue);

            function changingRangeValue() {
                let offset = (minLeft + (rangeInput.value - minValue) * step);
                let offsetSide;

                (dataSide == 'horizontal' || dataSide == 'horizontal1' || dataSide == 'horizontal2') ? offsetSide = 'left' : offsetSide = 'bottom';

                if (dataType == 'balkony' && (dataSide == 'horizontal1' || dataSide == 'horizontal2')) {
                    let additionalOffset;
                    let additionalMax = 200;
                    let additionalMin = 163

                    window.innerWidth < 768 ? (additionalMin = 143, additionalMax = 180) : null;
                    window.innerWidth < 576 ? (additionalMin = 96, additionalMax = 127) : null;
                    window.innerWidth < 425 ? (additionalMin = 60, additionalMax = 86) : null;

                    dataSide == 'horizontal1' ? additionalOffset = (additionalMin + (rangeInput.value - minValue) * ((additionalMax - additionalMin)/200)) : additionalOffset = (additionalMax - (rangeInput.value - minValue) * ((additionalMax - additionalMin)/200));
                    labelForInput.style.bottom = `${additionalOffset}px`;
                }

                labelForInput.style[offsetSide] = `${offset}%`;
                labelForInput.innerHTML = `${rangeInput.value}мм`;
                calculateSimpleWindow();
            }
        }

        function calculateSimpleWindow() {
            tabsContent.forEach(el => {
                if (el.classList.contains('calc-tabs__item-active')) {
                    let windowWidth = el.querySelector('input[data-side="horizontal"]').value;
                    let windowHeight = el.querySelector('input[data-side="vertical"]').value;
                    const kof = el.dataset.kof;
                    let price;

                    if (el.dataset.type == 'door') {
                        const secondWindowWidth = el.querySelector('input[data-side="horizontal1"]').value;
                        const secondWindowHeight = el.querySelector('input[data-side="vertical1"]').value;

                        price = Math.floor((((windowWidth / 1000) * (windowHeight / 1000)) + ((secondWindowWidth / 1000) * (secondWindowHeight / 1000)))* kof);
                    } else if (el.dataset.type == 'balkony') {
                        const secondWindowWidth = el.querySelector('input[data-side="horizontal1"]').value;
                        const thirdWindowWidth = el.querySelector('input[data-side="horizontal2"]').value;

                        price = Math.floor((((windowWidth / 1000) * (windowHeight / 1000)) + ((secondWindowWidth / 1000) * (windowHeight / 1000)) + ((thirdWindowWidth / 1000) * (windowHeight / 1000))) * kof);
                    } else {
                        price = Math.floor(((windowWidth / 1000) * (windowHeight / 1000)) * kof);
                    }
                    
                    summary.innerHTML = `${price} грн`;
                }
            });
        }
    }

    function collage() {
        const contentItems = document.querySelectorAll('.collage__main .collage__main-item');
        const tabItems = document.querySelectorAll('.collage__nav .collage__nav-item');

        if (window.innerWidth < 768) {
            tabItems.forEach((el,ind) => {
                el.innerHTML = `${ind + 1}`;
            });
        }

        let currentPhoto = 0;

        tabItems.forEach( (el,ind) => el.addEventListener('click', e => {
            currentPhoto = ind;
            tabItems.forEach( (el,ind) => {
                el.classList.remove('nav-item__active');
                el.classList.remove('nav-item__prev');
                if (ind < currentPhoto) {
                    el.classList.add('nav-item__prev');
                }
            });
            e.currentTarget.classList.add('nav-item__active');

            contentItems.forEach(el => el.classList.remove('main-item__active'));
            contentItems[ind].classList.add('main-item__active');
        }));
    }

    function timer() {
        let date = new Date();
        const deadline = String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') + '/' + date.getFullYear();
    
        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()) + 86400000,
                days = Math.floor( (t/(1000*60*60*24)) ),
                seconds = Math.floor( (t/1000) % 60 ),
                minutes = Math.floor( (t/1000/60) % 60 ),
                hours = Math.floor( (t/(1000*60*60) % 24) );

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime, num, arg1, arg2, arg3, arg4) {
    
            const timer = document.querySelectorAll(selector)[num],
                days = timer.querySelector(arg1),
                hours = timer.querySelector(arg2),
                minutes = timer.querySelector(arg3),
                seconds = timer.querySelector(arg4),
                timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            }
        }
    
        setClock('.timer', deadline, +0, "#days", '#hours', '#minutes', '#seconds');
        setClock('.timer', deadline, +1, "#days2", '#hours2', '#minutes2', '#seconds2');
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