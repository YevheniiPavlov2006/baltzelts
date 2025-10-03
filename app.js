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

document.querySelectorAll('.fiter-block-item-size').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.fiter-block-item-size').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});



/*------------------------------range-------------------------------*/

const ranges = Array.from(document.querySelectorAll('[data-range]'))

ranges.forEach(range => {
  const control1 = range.querySelector('[data-range-control-1]')
  const control2 = range.querySelector('[data-range-control-2]')

  const track = range.querySelector('[data-range-track]')
  const priceOutput = document.querySelector('.filter-range-price') // 👈 добавил

  if (!control1 || !control2 || !track) return console.log('cidioc')

  const rangeMin = Number(range.getAttribute('data-range-min'))
  const rangeMax = Number(range.getAttribute('data-range-max'))

  let value1 = 0
  let value2 = 1

  let isControlMoving1 = false
  let isControlMoving2 = false

  updateCSSVariables()
  updateLabels()

  control1.addEventListener('mousedown', () => {
    isControlMoving1 = true
  })
  control1.addEventListener('touchstart', () => {
    isControlMoving1 = true
  })

  control2.addEventListener('mousedown', () => {
    isControlMoving2 = true
  })
  control2.addEventListener('touchstart', () => {
    isControlMoving2 = true
  })

  window.addEventListener('mousemove', (e) => {
    if(!isControlMoving1 && !isControlMoving2) return 

    const mouseX = e.touches ? e.touches[0].clientX : e.clientX
    const trackX = track.getBoundingClientRect().x
    const trackWidth = track.getBoundingClientRect().width

    const value = normalize((mouseX - trackX) / trackWidth)

    if(isControlMoving1) return updateValue1(value)
    if(isControlMoving2) return updateValue2(value)
  })

  window.addEventListener('touchmove', (e) => {
    if(!isControlMoving1 && !isControlMoving2) return 

    const mouseX = e.touches ? e.touches[0].clientX : e.clientX
    const trackX = track.getBoundingClientRect().x
    const trackWidth = track.getBoundingClientRect().width

    const value = normalize((mouseX - trackX) / trackWidth)

    if(isControlMoving1) return updateValue1(value)
    if(isControlMoving2) return updateValue2(value)
  })

  function updateValue1(value) {
    value1 = value
    updateCSSVariables()
    updateLabels()
  }
  function updateValue2(value) {
    value2 = value
    updateCSSVariables()
    updateLabels()
  }

  function updateLabels() {
    const amplitude = rangeMax - rangeMin
    const val1 = Math.round(value1 * amplitude + rangeMin)
    const val2 = Math.round(value2 * amplitude + rangeMin)

    // всегда берём min и max для отображения
    const minVal = Math.min(val1, val2)
    const maxVal = Math.max(val1, val2)

    if (priceOutput) {
      const formatted1 = minVal.toLocaleString('ru-RU')
      const formatted2 = maxVal.toLocaleString('ru-RU')
      priceOutput.textContent = `Price: ${formatted1} € - ${formatted2} €`
    }
  }

  function updateCSSVariables() {
    range.style.setProperty('--value-1', value1)
    range.style.setProperty('--value-2', value2)
    range.style.setProperty('--min', Math.min(value1, value2))
    range.style.setProperty('--max', Math.max(value1, value2))
  }

  window.addEventListener('mouseup', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('touchend', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('mouseleave', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('touchcancel', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
})

function normalize(value) {
  return clamp (0, value, 1)
}
function clamp(min, value, max) {
  if(value < min) return min
  if(value > max) return max
  return value
}
