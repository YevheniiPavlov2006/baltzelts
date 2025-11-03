(function(){
  const gallery = document.getElementById('gallery');
  const mainImg = gallery.querySelector('.product-main-img');
  const thumbsContainer = gallery.querySelector('.thumbs');
  const nextBtn = gallery.querySelector('[data-action="next"]');
  const prevBtn = gallery.querySelector('[data-action="prev"]');
  const GAP = 12;
  const THUMB_WIDTH = 115;

  const images = [
    {src:'img/earrings-img.png', alt:'Фото 1'},
    {src:'img/earrings-img.png', alt:'Фото 2'},
    {src:'img/earrings-img.png', alt:'Фото 3'},
    {src:'img/earrings-img.png', alt:'Фото 4'},
    {src:'img/earrings-img.png', alt:'Фото 5'},
    {src:'img/earrings-img.png', alt:'Фото 6'},
    {src:'img/earrings-img.png', alt:'Фото 7'},
    {src:'img/earrings-img.png', alt:'Фото 8'},
    {src:'img/earrings-img.png', alt:'Фото 9'},
    {src:'img/earrings-img.png', alt:'Фото 10'}
  ];

  let active = 0;
  let offset = 0;
  let visibleCount = getVisibleCount();

  // создаём миниатюры
  images.forEach((img, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb';
    btn.dataset.index = i;
    btn.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    thumbsContainer.appendChild(btn);
  });

  const thumbs = Array.from(thumbsContainer.children);

  // функция для определения количества видимых картинок
  function getVisibleCount() {
    if (window.innerWidth <= 450) return 2;
    if (window.innerWidth <= 580) return 3;
    return 4;
  }

  // обновляем активное изображение
  function updateActive(n){
    active = (n + images.length) % images.length;
    mainImg.style.opacity = 0;
    setTimeout(()=>{
      mainImg.src = images[active].src;
      mainImg.alt = images[active].alt;
      mainImg.style.opacity = 1;
    }, 100);

    thumbs.forEach(t=>t.classList.toggle('active', Number(t.dataset.index)===active));

    // если вышли за пределы видимых — скроллим
    if (active < offset) offset = active;
    else if (active >= offset + visibleCount) offset = active - visibleCount + 1;

    thumbsContainer.style.transform = `translateX(-${offset * (THUMB_WIDTH + GAP)}px)`;
  }

  // пересчитать при изменении ширины окна
  window.addEventListener('resize', ()=>{
    const newCount = getVisibleCount();
    if (newCount !== visibleCount) {
      visibleCount = newCount;
      // корректируем оффсет при изменении количества видимых миниатюр
      if (active < offset) offset = active;
      else if (active >= offset + visibleCount) offset = active - visibleCount + 1;
      thumbsContainer.style.transform = `translateX(-${offset * (THUMB_WIDTH + GAP)}px)`;
    }
  });

  thumbs.forEach(t => t.addEventListener('click', e=>{
    updateActive(Number(e.currentTarget.dataset.index));
  }));

  nextBtn.addEventListener('click', ()=>updateActive(active + 1));
  prevBtn.addEventListener('click', ()=>updateActive(active - 1));

  updateActive(0);
})();


