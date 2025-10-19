(function(){
  const gallery = document.getElementById('gallery');
  const mainImg = gallery.querySelector('.product-main-img');
  const thumbs = Array.from(gallery.querySelectorAll('.thumb'));
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

    thumbs.forEach(t => 
      t.classList.toggle('active', Number(t.dataset.index) === active)
    );
  }

  // клик по миниатюре
  thumbs.forEach(t => 
    t.addEventListener('click', e => {
      setActive(Number(e.currentTarget.dataset.index));
    })
  );

  // делегирование для кнопок "next" и "prev"
  gallery.addEventListener('click', e => {
    const nextBtn = e.target.closest('[data-action="next"]');
    const prevBtn = e.target.closest('[data-action="prev"]');

    if (nextBtn && gallery.contains(nextBtn)) {
      setActive(active + 1);
    }
    if (prevBtn && gallery.contains(prevBtn)) {
      setActive(active - 1);
    }
  });

  // поддержка стрелок клавиатуры
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') setActive(active + 1);
    if (e.key === 'ArrowLeft') setActive(active - 1);
  });

  // инициализация
  setActive(0);
})();

