document.querySelectorAll('.burger-button').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu').classList.add('opened');

    const body = document.body;
    const scrollY = window.scrollY;

    body.style.position = 'fixed';
    body.style.top = `0px`;
    body.dataset.scrollY = scrollY; 
  });
});

document.querySelectorAll('.close-main-menu').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu').classList.remove('opened');

    const body = document.body;
    const scrollY = body.dataset.scrollY;

    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
    delete body.dataset.scrollY;
  });
});



document.querySelectorAll('.adaptive-menu-list-line').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu-subcategory').classList.add('opened');
  });
});


document.querySelectorAll('.close-subcategory').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.adaptive-menu-subcategory').classList.remove('opened');
  });
});
