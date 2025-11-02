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



const select = document.querySelector('.phone-input-select');
const selected = select.querySelector('.selected');
const options = select.querySelectorAll('.options li');
const hiddenInput = document.querySelector('#phone_code');

options.forEach(option => {
  option.addEventListener('click', () => {
    const code = option.dataset.code;
    selected.innerHTML = option.innerHTML; // Обновляем выбранный элемент
    hiddenInput.value = code; // Устанавливаем значение в hidden input

    // Триггерим событие change, чтобы можно было отловить изменение
    const event = new Event('change', { bubbles: true });
    hiddenInput.dispatchEvent(event);

    // (по желанию) закрываем список, если у тебя есть логика для этого
    select.classList.remove('open');
  });
});


document.querySelector('#phone_code').addEventListener('change', (e) => {
  console.log('Изменён телефонный код:', e.target.value);
});



/*--------------------------только цифры----------------------*/

const phoneInput = document.querySelector('.phone-input');

phoneInput.addEventListener('input', (e) => {
  // Удаляем всё, что не цифра
  e.target.value = e.target.value.replace(/\D/g, '');

  // Ограничиваем длину (на случай, если вставили текст)
  if (e.target.value.length > 9) {
    e.target.value = e.target.value.slice(0, 9);
  }
});




 

