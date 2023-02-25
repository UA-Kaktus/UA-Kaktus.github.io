!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function() {
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');
       modalButtons.forEach(function(item){
         item.addEventListener('click', function(e) {
         e.preventDefault();

         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); // end click

   }); // end foreach


   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });

    //Мобільне меню
    const mobMenu = document.querySelector('.mobile-menu');
    const burger = document.querySelector('.burger');
    const mobLinks = document.querySelectorAll('.mobile-menu_items li');
    let mobMenuActive = false;
    
    burger.addEventListener('click', (e) => {
        if (mobMenuActive) {
            burger.classList.remove('burger-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        } else {
            burger.classList.add('burger-active');
            mobMenu.style.left = 0;
            mobMenuActive = true;
            document.body.style.overflow = 'hidden';
        }
    });

    mobLinks.forEach(el => el.addEventListener('click', ()=> {
        if (mobMenuActive) {
            burger.classList.remove('burger-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        }
    }));

    //Анімації для головної
    const animatedItems = document.querySelectorAll('._animated-item-1, ._animated-item-2, ._animated-item-3');
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                if (change.target.classList.contains('_animated-item-1')) {
                    change.target.classList.add('animate-fade-out');
                } else if (change.target.classList.contains('_animated-item-2')) {
                    setTimeout(()=> {
                        change.target.classList.add('animate-fade-out');
                    }, 300);
                }
            }
        });
    }
    let options = { threshold: [0.3] };
    let observer = new IntersectionObserver(onEntry, options);
    for (let el of animatedItems) {
        observer.observe(el);
    }


}); // end ready

 $(document).ready(function(){


    
   $('.appointment').submit(function(e){
   var popup = $('#popup_text');
   e.preventDefault();
   $.ajax({
   url: "send_a.php",
   type: "POST",
   data: $('.appointment').serialize(),
   success: function(response) {
   //обработка успешной отправки
     $(".success_msg").css("display","block");
   
   $('.surname').val('');
   $('.name').val('');
   $('.tel').val('');
   $('.comments').val('');
   },
   error: function(response) {
   //обработка ошибок при отправке
   }
   });
    $('.appointment')[0].reset();
   });
 }); 


 jQuery(function($) {
    $('.phone').mask("+38(999) 999-99-99");
});
