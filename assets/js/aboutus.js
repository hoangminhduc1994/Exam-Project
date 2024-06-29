

// Carousel slider info
$(document).ready(function(){
    $('.added-info-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:4
            },
            600:{
                items:4
            },
            1000:{
                items:4
            }
        }
    })
  });  