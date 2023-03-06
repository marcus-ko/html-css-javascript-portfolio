// var target = document.querySelector('#articles');

// document.addEventListener('scroll', () => {
//   if (window.scrollY >= target.getBoundingClientRect().top) {
//     console.log('I have been reached');
//   }
// })
const observer = lozad();
observer.observe();

const images = document.getElementsByClassName('lozad');
for (const image of images) {
  if (!image.getAttribute('data-background-image')) {
    image.onload = function() {
      this.setAttribute('data-fully-loaded', true);
    };
  }
}

$(window).load(function() {
  $("body").removeClass("preload");
});

$( document ).ready(function() {
  $('#tab-1').click();
});

// toggle mobile nav

var $mobileNav = $("#mobileNav");
var $menuToggle = $('#menuToggle');
var $mobileNavLink = $mobileNav.find("a");

$($menuToggle).click(function() {
  $($mobileNav).toggleClass("active")
})

$($mobileNavLink).click(function() {
  $($menuToggle).click();
})