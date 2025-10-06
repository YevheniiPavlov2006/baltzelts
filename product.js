(function(){
const gallery = document.getElementById('gallery');
const mainImg = gallery.querySelector('.product-main-img');
const thumbs = Array.from(gallery.querySelectorAll('.thumb'));
const nextBtn = document.getElementById('nextBtn');
let active = 0;


const images = [
  {src: 'img/earrings-img.png', thumb: 'img/earrings-img.png', alt: 'Гора'},
  {src: 'img/earrings-img.png', thumb: 'img/earrings-img.png', alt: 'Гора'},
  {src: 'img/earrings-img.png', thumb: 'img/earrings-img.png', alt: 'Гора'},
  {src: 'img/earrings-img.png', thumb: 'img/earrings-img.png', alt: 'Гора'},
];


function setActive(n){
active = (n + images.length) % images.length;
// плавное затухание
mainImg.style.opacity = 0;
setTimeout(()=>{
mainImg.src = images[active].src;
mainImg.alt = images[active].alt;
mainImg.dataset.index = active;
mainImg.style.opacity = 1;
}, 160);


thumbs.forEach(t=> t.classList.toggle('active', Number(t.dataset.index) === active));
}


thumbs.forEach(t=> t.addEventListener('click', e=>{
setActive(Number(e.currentTarget.dataset.index));
}));


nextBtn.addEventListener('click', ()=>{
setActive(active + 1);
});


// поддержка стрелок клавиатуры
document.addEventListener('keydown', e=>{
if (e.key === 'ArrowRight') setActive(active + 1);
if (e.key === 'ArrowLeft') setActive(active - 1);
});


// если нужно - можно заменить картинки на свои: замените массив images или скиньте файлы


})();