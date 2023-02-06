document.addEventListener('DOMContentLoaded', () => {

    const menu = document.querySelector('.menu');
    const menuClose = document.querySelector('.menu__close');
    const menuBurger = document.querySelector('.hamburger');

    menuBurger.addEventListener('click', () => {
        menu.classList.add('active');
        menuBurger.style.opacity = '0';
    });

    menuClose.addEventListener('click', () => {
        menu.classList.remove('active');
        menuBurger.style.opacity = '1';
    });

    menu.addEventListener('click', (event) => {
        if (event.target == menu || event.target.tagName == 'A') {
            menu.classList.remove('active');
            menuBurger.style.opacity = '1';
        }
    });

    document.addEventListener('scroll', ()=> {
        if (window.scrollY > 700) {
            menuBurger.classList.add('hamburger-dark');
        } else if (window.scrollY < 700)
            menuBurger.classList.remove('hamburger-dark');
    });

    const arrPercent = document.querySelectorAll('.skills__numbers-item_percent'),
          arrScale = document.querySelectorAll('.skills__numbers-item_inner');

        arrScale.forEach( (el, ind) => {
            el.style.width = arrPercent[ind].textContent;
        });
    
    //Работающаяя отправка форм
    // $('form').submit(function(e){
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'POST',
    //         url: 'mailer/smart.php',
    //         data: $(this).serialize()
    //     }).done(function() {
    //         $(this).find('input').val('');

    //         $('form').trigger('reset');
    //     });
    //     return false;
    // });

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(form);

        fetch('mailer/smart.php', {
            method: "POST",
            body: formData
        }).then((response) => {
            console.log(response);
            return response.text();
        }).then(data => {
            console.log(data);
        }).catch(() => {
            console.log('some error');
        }).finally(()=> {
            form.reset();
        });

    });

    //Отправка через хмл, не работает
    // const forms = document.querySelectorAll('form');
    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'mailer/smart.php');
    //         // request.setRequestHeader('Content-type', 'multipart/form-data');

    //         const formData = new FormData(form);
    //         request.send(formData);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log('message is ok');
    //             }
    //         });
    //     });
    // }
    // forms.forEach(el => {
    //     postData(el);
    // });

});