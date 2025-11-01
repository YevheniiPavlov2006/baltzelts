document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".delivery-order-list-checkpoint-dalivery");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // снимаем отметку со всех остальных
        checkboxes.forEach(other => {
          if (other !== checkbox) {
            other.checked = false;
          }
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".delivery-order-list-checkpoint-payment");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // снимаем отметку со всех остальных
        checkboxes.forEach(other => {
          if (other !== checkbox) {
            other.checked = false;
          }
        });
      }
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



