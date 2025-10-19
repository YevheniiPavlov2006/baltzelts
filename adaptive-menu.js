document.querySelectorAll('.burger-button').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu').classList.add('opened');
    document.querySelector('.header').classList.add('fixed')
    document.querySelector('.section').classList.add('mt')
  });
});

document.querySelectorAll('.close-main-menu').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu').classList.remove('opened');
    document.querySelector('.header').classList.remove('fixed')
    document.querySelector('.section').classList.remove('mt')
  });
});



document.querySelectorAll('.adaptive-menu-list-line').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu-subcategory').classList.add('opened');
    document.querySelector('.header').classList.add('fixed')
    document.querySelector('.section').classList.add('mt')
  });
});


document.querySelectorAll('.close-subcategory').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu-subcategory').classList.remove('opened');
    document.querySelector('.header').classList.remove('fixed')
    document.querySelector('.section').classList.remove('mt')
  });
});


document.querySelectorAll('.filter-open-btn').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-filter-block').classList.add('opened');
    document.querySelector('.header').classList.add('fixed')
    document.querySelector('.section').classList.add('mt')
  });
});


document.querySelectorAll('.close-filter').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-filter-block').classList.remove('opened');
    document.querySelector('.header').classList.remove('fixed')
    document.querySelector('.section').classList.remove('mt')
  });
});
