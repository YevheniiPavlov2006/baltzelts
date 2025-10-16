document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.delivery-list-item-delivery');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      // опционально: если внутри есть кнопка/ссылка и ты не хочешь срабатывать по её клику — проверяй e.target
      // e.stopPropagation(); // не обязательно

      // снимаем active у всех checkpoint'ов
      document.querySelectorAll('.delivery-order-list-checkpoint-dalivery').forEach(ch => ch.classList.remove('active'));

      // находим checkpoint внутри текущего item и активируем его
      const checkpoint = item.querySelector('.delivery-order-list-checkpoint-dalivery');
      if (checkpoint) checkpoint.classList.add('active');
      else console.warn('Checkpoint not found inside item', item);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.delivery-list-item-pay');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      // опционально: если внутри есть кнопка/ссылка и ты не хочешь срабатывать по её клику — проверяй e.target
      // e.stopPropagation(); // не обязательно

      // снимаем active у всех checkpoint'ов
      document.querySelectorAll('.delivery-order-list-checkpoint-payment').forEach(ch => ch.classList.remove('active'));

      // находим checkpoint внутри текущего item и активируем его
      const checkpoint = item.querySelector('.delivery-order-list-checkpoint-payment');
      if (checkpoint) checkpoint.classList.add('active');
      else console.warn('Checkpoint not found inside item', item);
    });
  });
});



const checkPoint = document.querySelectorAll('.delivery-list-item');

checkPoint.forEach(btn => {
  btn.addEventListener('click', () => {
    // убираем фон у всех карточек
    document.querySelectorAll('.delivery-list-item').forEach(card => {
      card.classList.remove('gray-bkg');
    });

    // добавляем фон только у карточки, на кнопку которой нажали
    const card = btn.closest('.delivery-list-item');
    if (card) {
      card.classList.add('gray-bkg');
    }
  });
});


const checkPoint1 = document.querySelectorAll('.payment-list-item');

checkPoint1.forEach(btn => {
  btn.addEventListener('click', () => {
    // убираем фон у всех карточек
    document.querySelectorAll('.payment-list-item').forEach(card => {
      card.classList.remove('gray-bkg');
    });

    // добавляем фон только у карточки, на кнопку которой нажали
    const card = btn.closest('.payment-list-item');
    if (card) {
      card.classList.add('gray-bkg');
    }
  });
});



