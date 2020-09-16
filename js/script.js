$(document).ready(function(){
    $('.carousel__inner').slick(
        {
            speed: 1200,
            // adaptiveHeight: true,
            autoplay: true,
            prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="prev"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="next"></button>',
            responsive:[
                {
                    breakpoint: 570,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      dots: true,
                      arrows: false
                      
                    }
                  }
                  
            ]
    });
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item){
    $(item).each(function(i) {
      $(this).on('click' ,function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
  
    });
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

          //modal 
          
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation' ).fadeIn('slow');

  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks #order').fadeOut('slow');
  });

  $('.button_mini').each( function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($ ('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });
 
  
  function validateForms(form){
    $(form).validate({
      rules:{
        name:{
          required: true,
          minlength: 2
        },
        phone:"required",
        email: {
          required: true,
          email:true 
        }
      },
      messages: {
        name: {
          required: "пожалуйста, введите ваше имя",
          minlength: jQuery.validator.format("введите не менее {0} симвлов!")
        },
        phone: "пожалуйста, введите ваш номер телефона",
        email: {
          required: "пожалуйста, введите ваш электронный адрес",
          email:"неправильно введен электронный адрес"
        }
      }
  
    });
  }
  validateForms('#consultation form');
  validateForms('#order form');
  validateForms('#consultation-form');

  $('input[name=phone').mask("+7(999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "../mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

 
var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
  }
);
wow.init();


  
   

});
