document.querySelectorAll('.delivery-order-list-checkpoint-dalivery').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.delivery-order-list-checkpoint-dalivery').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});

document.querySelectorAll('.delivery-order-list-checkpoint-payment').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.delivery-order-list-checkpoint-payment').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});


const checkPoint = document.querySelectorAll('.delivery-order-list-checkpoint-dalivery');

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


const checkPoint1 = document.querySelectorAll('.delivery-order-list-checkpoint-payment');

checkPoint1.forEach(btn => {
  btn.addEventListener('click', () => {
    // убираем фон у всех карточек
    document.querySelectorAll('.payment-list-item').forEach(card1 => {
      card1.classList.remove('gray-bkg');
    });

    // добавляем фон только у карточки, на кнопку которой нажали
    const card1 = btn.closest('.payment-list-item');
    if (card1) {
      card1.classList.add('gray-bkg');
    }
  });
});