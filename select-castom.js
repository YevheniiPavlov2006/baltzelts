// ========== Модуль 1 (первый IIFE) ==========
(function () {
  const root = document.getElementById('langSelect');
  if (!root) return;

  const toggle = root.querySelector('.custom-select-toggle');
  const list = root.querySelector('.custom-select-list');
  const valueEl = root.querySelector('.custom-select-value');
  const options = Array.from(list.querySelectorAll('[role="option"]'));

  let open = false;
  let focusedIndex = options.findIndex(o => o.getAttribute('aria-selected') === 'true');

  // Helper: focus без скролла (fallback для старых браузеров)
  function safeFocus(el) {
    try {
      el.focus({ preventScroll: true });
    } catch (err) {
      try { el.focus(); } catch (e) {}
    }
  }

  // Helper: прокрутка внутри контейнера list, чтобы элемент был видим,
  // но при этом не прокручивалась вся страница.
  function ensureVisible(container, el) {
    if (!container || !el) return;
    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    if (elTop < viewTop) {
      container.scrollTop = elTop;
    } else if (elBottom > viewBottom) {
      container.scrollTop = elBottom - container.clientHeight;
    }
  }

  function openList() {
    root.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    list.style.display = 'block';
    open = true;
    // focus на выбранный пункт или на первый
    focusedIndex = focusedIndex >= 0 ? focusedIndex : 0;
    focusItem(focusedIndex);
    // не даём браузеру прокрутить при фокусе на списке
    safeFocus(list);
  }

  function closeList() {
    root.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    list.style.display = 'none';
    open = false;
    // убрать классы фокуса
    options.forEach(o => o.classList.remove('focused'));
    // focus toggle без скролла
    safeFocus(toggle);
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
        // скроллим **только внутри** списка (не страницу)
        ensureVisible(list, o);
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


// ========== Модуль 2 (второй IIFE) ==========
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const roots = Array.from(document.querySelectorAll('.custom-select.delivery-details-select'));
      if (!roots.length) return;

      // Helper: focus без скролла
      function safeFocus(el) {
        try {
          el.focus({ preventScroll: true });
        } catch (err) {
          try { el.focus(); } catch (e) {}
        }
      }

      // Helper: прокрутка внутри контейнера
      function ensureVisible(container, el) {
        if (!container || !el) return;
        const elTop = el.offsetTop;
        const elBottom = elTop + el.offsetHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;

        if (elTop < viewTop) {
          container.scrollTop = elTop;
        } else if (elBottom > viewBottom) {
          container.scrollTop = elBottom - container.clientHeight;
        }
      }

      function closeAllExcept(exceptRoot) {
        roots.forEach(r => {
          if (r !== exceptRoot) {
            r.classList.remove('open');
            const t = r.querySelector('.custom-select-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
            const l = r.querySelector('.custom-select-list');
            if (l) l.style.display = 'none';
            (r._csOptions || []).forEach(o => o.classList.remove('focused'));
            if (r._cs) r._cs.open = false;
          }
        });
      }

      // Закрытие по клику вне
      document.addEventListener('click', (ev) => {
        roots.forEach(r => {
          if (!r.contains(ev.target)) {
            r.classList.remove('open');
            const t = r.querySelector('.custom-select-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
            const l = r.querySelector('.custom-select-list');
            if (l) l.style.display = 'none';
            (r._csOptions || []).forEach(o => o.classList.remove('focused'));
            if (r._cs) r._cs.open = false;
          }
        });
      });

      window.addEventListener('resize', () => roots.forEach(r => r.classList.remove('open')));
      window.addEventListener('scroll', () => roots.forEach(r => r.classList.remove('open')), true);

      roots.forEach(root => {
        if (root._csInitialized) return;
        root._csInitialized = true;

        const toggle = root.querySelector('.custom-select-toggle');
        const list = root.querySelector('.custom-select-list');
        const valueEl = root.querySelector('.custom-select-value');

        if (!toggle || !list) {
          console.warn('custom-select init: отсутствует .custom-select-toggle или .custom-select-list', root);
          return;
        }

        const options = Array.from(list.querySelectorAll('[role="option"], li'));
        root._csOptions = options;

        const inst = {
          root,
          toggle,
          list,
          valueEl,
          options,
          open: false,
          focusedIndex: options.findIndex(o => o.getAttribute('aria-selected') === 'true')
        };
        if (inst.focusedIndex < 0) inst.focusedIndex = 0;
        root._cs = inst;

        if (!toggle.hasAttribute('tabindex')) toggle.setAttribute('tabindex', '0');
        list.setAttribute('tabindex', '-1');

        (function initValue() {
          const selIdx = options.findIndex(o => o.getAttribute('aria-selected') === 'true');
          const idx = selIdx >= 0 ? selIdx : 0;
          const opt = options[idx];
          if (opt) {
            const txt = opt.textContent.trim();
            if (valueEl) valueEl.textContent = txt;
            const val = opt.dataset.value ?? opt.getAttribute('data-value') ?? txt;
            root.setAttribute('data-value', val);
            options.forEach((o,i) => o.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
            inst.focusedIndex = idx;
          }
        })();

        function openList() {
          closeAllExcept(root);
          root.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
          list.style.display = 'block';
          inst.open = true;
          focusItem(inst.focusedIndex);
          try { safeFocus(list); } catch (e) {}
        }
        function closeList() {
          root.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          list.style.display = 'none';
          inst.open = false;
          options.forEach(o => o.classList.remove('focused'));
          try { safeFocus(toggle); } catch (e) {}
        }
        function toggleList() {
          inst.open ? closeList() : openList();
        }
        function clearFocused() { options.forEach(o => o.classList.remove('focused')); }
        function focusItem(idx) {
          if (idx == null) idx = 0;
          idx = Math.max(0, Math.min(options.length - 1, idx));
          clearFocused();
          const el = options[idx];
          if (!el) return;
          el.classList.add('focused');
          // вместо scrollIntoView — внутренняя прокрутка
          ensureVisible(list, el);
          inst.focusedIndex = idx;
        }
        function selectIndex(idx, emitEvent = true) {
          const chosen = options[idx];
          if (!chosen) return;
          options.forEach(o => o.setAttribute('aria-selected', 'false'));
          chosen.setAttribute('aria-selected', 'true');

          const txt = chosen.textContent.trim();
          const val = chosen.dataset.value ?? chosen.getAttribute('data-value') ?? txt;
          if (valueEl) valueEl.textContent = txt;
          root.setAttribute('data-value', val);

          if (emitEvent) {
            const ev = new CustomEvent('change', { detail: { value: val, index: idx, text: txt }, bubbles: true });
            root.dispatchEvent(ev);
          }

          closeList();
        }

        // События
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleList();
        });

        options.forEach((opt, i) => {
          opt.addEventListener('click', (e) => {
            e.stopPropagation();
            if (opt.getAttribute('aria-disabled') === 'true') return;
            selectIndex(i, true);
          });
          opt.addEventListener('mouseover', () => focusItem(i));
        });

        root.addEventListener('keydown', (e) => {
          const key = e.key;
          if (key === 'ArrowDown') {
            e.preventDefault();
            if (!inst.open) { openList(); return; }
            focusItem(Math.min(inst.focusedIndex + 1, options.length - 1));
          } else if (key === 'ArrowUp') {
            e.preventDefault();
            if (!inst.open) { openList(); return; }
            focusItem(Math.max(inst.focusedIndex - 1, 0));
          } else if (key === 'Enter' || key === ' ') {
            e.preventDefault();
            if (!inst.open) { openList(); return; }
            selectIndex(inst.focusedIndex, true);
          } else if (key === 'Escape') {
            if (inst.open) { e.preventDefault(); closeList(); }
          } else if (key === 'Tab') {
            if (inst.open) closeList();
          }
        });

        // Инициализация: выставить css / aria согласно current focusedIndex
        focusItem(inst.focusedIndex);
      }); // roots.forEach

    } catch (err) {
      console.error('custom-select.init error', err);
    }
  });
})();


(function () {
  // Helper: focus без скролла (fallback)
  function safeFocus(el) {
    if (!el) return;
    try {
      el.focus({ preventScroll: true });
    } catch (err) {
      try { el.focus(); } catch (e) {}
    }
  }

  // Helper: прокрутка внутри container, чтобы el был видим (без прокрутки страницы)
  function ensureVisible(container, el) {
    if (!container || !el) return;
    // вычисляем позицию el относительно container
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // расстояние сверху элемента внутри контейнера
    const offsetTop = el.offsetTop;
    const offsetBottom = offsetTop + el.offsetHeight;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    if (offsetTop < viewTop) {
      container.scrollTop = offsetTop;
    } else if (offsetBottom > viewBottom) {
      container.scrollTop = offsetBottom - container.clientHeight;
    }
  }

  // глобальные коллекции и обработчики
  const roots = Array.from(document.querySelectorAll('.custom-select'));
  if (!roots.length) return;

  // Закрыть все, кроме переданного (или все, если null)
  function closeAllExcept(exceptRoot) {
    roots.forEach(r => {
      if (r !== exceptRoot) {
        r.classList.remove('open');
        const t = r.querySelector('.custom-select-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
        const l = r.querySelector('.custom-select-list');
        if (l) l.style.display = 'none';
        const opts = Array.from(r.querySelectorAll('[role="option"], li'));
        opts.forEach(o => o.classList.remove('focused'));
        if (r._cs) r._cs.open = false;
      }
    });
  }

  // Обработчик клика по документу: закрываем те селекты, куда не кликнули
  document.addEventListener('click', (ev) => {
    roots.forEach(r => {
      if (!r.contains(ev.target)) {
        r.classList.remove('open');
        const t = r.querySelector('.custom-select-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
        const l = r.querySelector('.custom-select-list');
        if (l) l.style.display = 'none';
        const opts = Array.from(r.querySelectorAll('[role="option"], li'));
        opts.forEach(o => o.classList.remove('focused'));
        if (r._cs) r._cs.open = false;
      }
    });
  });

  // Закрывать при ресайзе/скролле (опционально)
  window.addEventListener('resize', () => roots.forEach(r => r.classList.remove('open')));
  window.addEventListener('scroll', () => roots.forEach(r => r.classList.remove('open')), true);

  // Инициализируем каждый корневой селект
  roots.forEach(root => {
    if (root._csInitialized) return; // не инициализируем дважды
    root._csInitialized = true;

    const toggle = root.querySelector('.custom-select-toggle');
    const list = root.querySelector('.custom-select-list');
    const valueEl = root.querySelector('.custom-select-value');

    if (!toggle || !list) {
      console.warn('custom-select init: отсутствует .custom-select-toggle или .custom-select-list', root);
      return;
    }

    // Собираем опции
    const options = Array.from(list.querySelectorAll('[role="option"], li'));
    root._csOptions = options;

    // Гарантируем, что только одна опция имеет aria-selected="true"
    (function normalizeSelected() {
      let firstTrueIndex = options.findIndex(o => o.getAttribute('aria-selected') === 'true');
      if (firstTrueIndex === -1 && options.length) {
        firstTrueIndex = 0;
      }
      options.forEach((o, i) => o.setAttribute('aria-selected', i === firstTrueIndex ? 'true' : 'false'));
    })();

    const inst = {
      root,
      toggle,
      list,
      valueEl,
      options,
      open: false,
      focusedIndex: options.findIndex(o => o.getAttribute('aria-selected') === 'true')
    };
    if (inst.focusedIndex < 0) inst.focusedIndex = 0;
    root._cs = inst;

    // tabindex для доступности
    if (!toggle.hasAttribute('tabindex')) toggle.setAttribute('tabindex', '0');
    list.setAttribute('tabindex', '-1');

    // Инициализация значения (видимый текст и data-value)
    (function initValue() {
      const selIdx = options.findIndex(o => o.getAttribute('aria-selected') === 'true');
      const idx = selIdx >= 0 ? selIdx : 0;
      const opt = options[idx];
      if (opt) {
        const txt = opt.textContent.trim();
        if (valueEl) valueEl.textContent = txt;
        const val = opt.dataset.value ?? opt.getAttribute('data-value') ?? txt;
        root.setAttribute('data-value', val);
        inst.focusedIndex = idx;
      }
    })();

    // Вспомогательные функции для инстанса
    function openList() {
      closeAllExcept(root);
      root.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      list.style.display = 'block';
      inst.open = true;
      focusItem(inst.focusedIndex);
      safeFocus(list);
    }
    function closeList() {
      root.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      list.style.display = 'none';
      inst.open = false;
      options.forEach(o => o.classList.remove('focused'));
      safeFocus(toggle);
    }
    function toggleList() {
      inst.open ? closeList() : openList();
    }
    function clearFocused() { options.forEach(o => o.classList.remove('focused')); }

    function focusItem(idx) {
      if (idx == null) idx = 0;
      idx = Math.max(0, Math.min(options.length - 1, idx));
      clearFocused();
      const el = options[idx];
      if (!el) return;
      el.classList.add('focused');
      // вместо scrollIntoView — внутренняя прокрутка
      ensureVisible(list, el);
      inst.focusedIndex = idx;
    }

    function selectIndex(idx, emitEvent = true) {
      const chosen = options[idx];
      if (!chosen) return;
      options.forEach(o => o.setAttribute('aria-selected', 'false'));
      chosen.setAttribute('aria-selected', 'true');

      const txt = chosen.textContent.trim();
      const val = chosen.dataset.value ?? chosen.getAttribute('data-value') ?? txt;
      if (valueEl) valueEl.textContent = txt;
      root.setAttribute('data-value', val);

      if (emitEvent) {
        const ev = new CustomEvent('change', { detail: { value: val, index: idx, text: txt }, bubbles: true });
        root.dispatchEvent(ev);
      }

      closeList();
    }

    // События
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleList();
    });

    options.forEach((opt, i) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        if (opt.getAttribute('aria-disabled') === 'true') return;
        selectIndex(i, true);
      });
      opt.addEventListener('mouseover', () => focusItem(i));
    });

    // Клавиатура на root: стрелки, Enter, Space, Esc, Tab
    root.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'ArrowDown') {
        e.preventDefault();
        if (!inst.open) { openList(); return; }
        focusItem(Math.min(inst.focusedIndex + 1, options.length - 1));
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (!inst.open) { openList(); return; }
        focusItem(Math.max(inst.focusedIndex - 1, 0));
      } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        if (!inst.open) { openList(); return; }
        selectIndex(inst.focusedIndex, true);
      } else if (key === 'Escape') {
        if (inst.open) { e.preventDefault(); closeList(); }
      } else if (key === 'Tab') {
        if (inst.open) closeList();
      }
    });

    // Инициално подсветим текущий индекс (без прокрутки страницы)
    focusItem(inst.focusedIndex);
  }); // roots.forEach
})();

