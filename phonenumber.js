const select = document.querySelector('.custom-select');
const selected = select.querySelector('.selected');
const options = select.querySelectorAll('.options li');

selected.addEventListener('click', () => {
  select.classList.toggle('open');
});

options.forEach(opt => {
  opt.addEventListener('click', () => {
    selected.innerHTML = opt.innerHTML;
    select.classList.remove('open');
  });
});