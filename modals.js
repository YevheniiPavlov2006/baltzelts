document.querySelectorAll('.seacrh-open').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.search-panel').classList.add('opened');
    document.querySelector('.modals-bkg-blur').classList.add('opened')
  })
})

document.querySelectorAll('.search-panel-close').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.search-panel').classList.remove('opened');
    document.querySelector('.modals-bkg-blur').classList.remove('opened')
  })
})


document.querySelectorAll('.shop-panel-open').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.shop-panel').classList.add('opened');
    document.querySelector('.modals-bkg-blur').classList.add('opened')
  })
})

document.querySelectorAll('.shop-panel-close').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.shop-panel').classList.remove('opened');
    document.querySelector('.modals-bkg-blur').classList.remove('opened')
  })
})

document.querySelectorAll('.card-open-screen').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.card-screen').classList.add('opened');
  })
})

document.querySelectorAll('.card-screen-close').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.card-screen').classList.remove('opened');
  })
})



