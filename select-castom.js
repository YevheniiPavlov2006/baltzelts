// JS: логика открытия/закрытия/выбора/клавиатуры
(function () {
  const root = document.getElementById('langSelect');
  if (!root) return;

  const toggle = root.querySelector('.custom-select-toggle');
  const list = root.querySelector('.custom-select-list');
  const valueEl = root.querySelector('.custom-select-value');
  const options = Array.from(list.querySelectorAll('[role="option"]'));

  let open = false;
  let focusedIndex = options.findIndex(o => o.getAttribute('aria-selected') === 'true');

  function openList() {
    root.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    list.style.display = 'block';
    open = true;
    // focus на выбранный пункт или на первый
    focusedIndex = focusedIndex >= 0 ? focusedIndex : 0;
    focusItem(focusedIndex);
  }

  function closeList() {
    root.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    list.style.display = 'none';
    open = false;
    // убрать классы фокуса
    options.forEach(o => o.classList.remove('focused'));
    toggle.focus();
  }

  function toggleList() {
    open ? closeList() : openList();
  }

  function selectIndex(idx) {
    const opt = options[idx];
    if (!opt) return;
    // снять выбранное у всех
    options.forEach(o => o.setAttribute('aria-selected', 'false'));
    opt.setAttribute('aria-selected', 'true');
    const val = opt.getAttribute('data-value') || opt.textContent.trim();
    // обновить визуально и в data-value root
    valueEl.textContent = val;
    root.setAttribute('data-value', val);

    // вызвать кастомное событие change
    root.dispatchEvent(new CustomEvent('change', { detail: { value: val } }));

    closeList();
  }

  function focusItem(idx) {
    options.forEach((o, i) => {
      o.classList.toggle('focused', i === idx);
      if (i === idx) {
        // скроллим, чтобы был видим
        o.scrollIntoView({ block: 'nearest' });
      }
    });
    focusedIndex = idx;
  }

  // клики
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleList();
  });

  // клик по опции
  options.forEach((opt, idx) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      selectIndex(idx);
    });
    // mouseover меняет фокус для клавиатурного поведения
    opt.addEventListener('mouseover', () => focusItem(idx));
  });

  // обработка клавиатуры для toggle и для списка
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { openList(); return; }
      const next = Math.min(focusedIndex + 1, options.length - 1);
      focusItem(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { openList(); return; }
      const prev = Math.max(focusedIndex - 1, 0);
      focusItem(prev);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) { openList(); return; }
      selectIndex(focusedIndex);
    } else if (e.key === 'Escape') {
      if (open) { e.preventDefault(); closeList(); }
    } else if (e.key === 'Tab') {
      // при табе — закрываем
      if (open) closeList();
    }
  });

  // Закрыть по клику вне
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) closeList();
  });

  // Закрыть при ресайзе и по scroll (опционально)
  window.addEventListener('resize', closeList);
  window.addEventListener('scroll', closeList, true);

  // Инициализация: установить value текст из выбранной опции
  (function init() {
    const sel = options.find(o => o.getAttribute('aria-selected') === 'true') || options[0];
    if (sel) {
      const val = sel.getAttribute('data-value') || sel.textContent.trim();
      valueEl.textContent = val;
      root.setAttribute('data-value', val);
    }
    // делаем root доступным для клавиатуры
    toggle.setAttribute('tabindex', '0');
    // делаем список фокусируемым для aria
    list.setAttribute('tabindex', '-1');
  })();

  // Пример слушателя на изменение
  root.addEventListener('change', (ev) => {
    // console.log('выбрано:', ev.detail.value);
  });
})();
