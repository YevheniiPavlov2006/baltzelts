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



