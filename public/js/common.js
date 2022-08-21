 // dg hover
 var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
 var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
   return new bootstrap.Popover(popoverTriggerEl)
 })

 // Map
 var exampleEl = document.querySelectorAll('#tooltip')
 exampleEl.forEach((ele) => {
   new bootstrap.Tooltip(ele)
 })

 //ncc count dashboard
 var flag = 0;
 $(window).scroll(function () {

   if ($(window).scrollTop() > 100) {
     $(".dtc").addClass("animate__animated animate__fadeInLeft ");
   }
   if ($(window).scrollTop() > 200) {
     $(".ncc_count").addClass("animate__animated animate__fadeInLeft ");
     if (flag == 0) {
       flag = 1;
       $('.counter').each(function () {
         $(this).prop('Counter', 0).animate({
           Counter: $(this).text()
         }, {
           duration: 5000,
           easing: 'swing',
           step: function (now) {
             $(this).text(Math.ceil(now));
           }
         });
       });
     }

   }
 });





 


 