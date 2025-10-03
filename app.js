const collectionsCard = document.querySelectorAll(".collection-card-block");

collectionsCard.forEach(collectionsCard => {
  collectionsCard.addEventListener("mouseenter", () => {
    collectionsCard.classList.add("hoverable");  // добавляем класс при наведении
  });

  collectionsCard.addEventListener("mouseleave", () => {
    collectionsCard.classList.remove("hoverable"); // убираем класс при уходе курсора
  });
});


const bestSellerCard = document.querySelectorAll(".best-seller-img-part");

bestSellerCard.forEach(bestSellerCard => {
  bestSellerCard.addEventListener("mouseenter", () => {
    bestSellerCard.classList.add("hoverable");  // добавляем класс при наведении
  });

  bestSellerCard.addEventListener("mouseleave", () => {
    bestSellerCard.classList.remove("hoverable"); // убираем класс при уходе курсора
  });
});



document.querySelectorAll('.card-like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
  });
});


const faqItems = Array.from(document.querySelectorAll('[data-faq-item]'))
const faqItemOpenedClass = 'opened'

faqItems.forEach(faq => {
  const header = faq.querySelector('[data-faq-item-header]')

  header.addEventListener('click', function(){
    faq.classList.toggle(faqItemOpenedClass)
  })
})



document.querySelectorAll('.filter-block-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.filter-block-item').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});