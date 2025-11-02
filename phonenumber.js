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



const customSelect = document.querySelector('.phone-input-select');

const hiddenCode = document.querySelector('input[name="phone_code"]');
const hiddenCountry = document.querySelector('input[name="country"]');

options.forEach(option => {
  option.addEventListener('click', () => {
    // Меняем отображение выбранного
    selected.innerHTML = option.innerHTML;

    // Обновляем hidden inputs
    hiddenCode.value = option.textContent.trim().split(' ')[0]; // получаем код
    hiddenCountry.value = option.getAttribute('data-country');

    console.log('Selected phone code:', hiddenCode.value);
    console.log('Selected country:', hiddenCountry.value);

    // Закрытие списка (если нужно)
    customSelect.classList.remove('active');
  });
});






 

