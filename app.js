
 // import Swiper JS
 import Swiper from 'swiper';
 // import Swiper styles
 import 'swiper/css';

 const swiper = new Swiper(...);

  // core version + navigation, pagination modules:
  import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  // init Swiper:
  const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
    ...
  });



const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });



// // const 요청url = "https://eulsoo.github.io/list.json"
// // const 요청객체 = new XMLHttpRequest();
// // 요청객체.open('GET', 요청url);
// // 요청객체.responseType = 'json';
// // 요청객체.send();
// // 요청객체.onload = () => {
// //     const obj = 요청객체.response;
// //     할일(obj);
// // }


// fetch("https://eulsoo.github.io/list.json")
// .then(function (res) {
//  return res.json()
// }).then(function(obj) {
//     console.log(obj);
// })

 
// function 할일 (obj) {
//     const UL = document.querySelector('.list')

//     for (let i = 0; i < obj.length; i++) {
//         const li = document.createElement('LI');
//         li.textContent = obj[i].item
//         UL.appendChild(li);
        


//     }

 
// };





 