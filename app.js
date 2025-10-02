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



document.querySelectorAll(".like-btn").forEach(button => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    img.src = img.src.includes("img/card-like-icon.svg")
      ? "img/card-like-icon.svg"
      : "img/card-liked-icon.svg";
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