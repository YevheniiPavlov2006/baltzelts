document.addEventListener('DOMContentLoaded', () => {
  // Находим все .custom-select на странице
  document.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.selected');
    const options = select.querySelectorAll('.options li');

    // Проверка на случай отсутствующих элементов
    if (!selected || !options.length) {
      console.warn('custom-select: отсутствует .selected или .options внутри', select);
      return;
    }

    // Клик по выбранному элементу — открывает/закрывает список
    selected.addEventListener('click', () => {
      select.classList.toggle('open');
    });

    // Клик по пункту списка — меняет выбранное значение
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        selected.innerHTML = opt.innerHTML;
        select.classList.remove('open');
      });
    });

    // Дополнительно: закрытие при клике вне селекта
    document.addEventListener('click', e => {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    });
  });
});




 

