const closeButtons = document.querySelectorAll('.cart-list-item-delete');

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    // Анимация перед удалением
    card.classList.add('removed');
    setTimeout(() => card.remove(), 300); // удаляем после анимации
  });
});