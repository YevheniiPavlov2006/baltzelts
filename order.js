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