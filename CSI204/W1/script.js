const products = [
  {
    id: 1,
    name: 'Yamaha F310 Acoustic Guitar',
    category: 'guitar',
    price: 5790,
    rating: 4.8,
    badge: 'ขายดี',
    description: 'กีตาร์โปร่งเริ่มต้นที่บาลานซ์เสียงดี เล่นง่าย เหมาะกับผู้เริ่มต้นและซ้อมประจำ',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    name: 'Fender Player Stratocaster',
    category: 'guitar',
    price: 36900,
    rating: 4.9,
    badge: 'มืออาชีพ',
    description: 'กีตาร์ไฟฟ้าโทนคลาสสิกสำหรับงานอัดและแสดงสด พร้อมฮาร์ดแวร์คุณภาพ',
    image: 'https://unisoundbangkok.com/cdn/shop/files/IMG_3892_13ddd64b-8285-4c15-890f-6dc9512fefff.heic?v=1775979402&width=1800'
  },
  {
    id: 3,
    name: 'Casio CT-S1 Keyboard',
    category: 'keyboard',
    price: 12900,
    rating: 4.7,
    badge: 'แนะนำ',
    description: 'คีย์บอร์ดพกพา 61 คีย์ มีเสียงเครื่องดนตรีครบ ใช้ซ้อมและสอนดนตรีได้ดี',
    image: 'https://www.tradeinn.com/f/14323/143239293/casio-ct-s1-synthesizer.webp'
  },
  {
    id: 4,
    name: 'Roland TD-07KV Electronic Drum',
    category: 'drum',
    price: 29900,
    rating: 4.8,
    badge: 'สตูดิโอ',
    description: 'ชุดกลองไฟฟ้าเงียบกว่ากลองจริง เหมาะกับคอนโดและงานอัดเสียง',
    image: 'https://theeramusic.com/wp-content/uploads/2021/10/179.Roland-TD-07KV-V-Drums-Kits.png'
  },
  {
    id: 5,
    name: 'Shure SM58 Vocal Microphone',
    category: 'audio',
    price: 4990,
    rating: 5.0,
    badge: 'มาตรฐานเวที',
    description: 'ไมค์ร้องยอดนิยม ใช้งานทน เสียงกลางชัดสำหรับเวทีและงานพูด',
    image: 'https://i.ebayimg.com/images/g/LJAAAOSwTJhmtSur/s-l1600.webp'
  },
  {
    id: 6,
    name: 'Focusrite Scarlett 2i2',
    category: 'audio',
    price: 6990,
    rating: 4.9,
    badge: 'โปรดักชัน',
    description: 'ออดิโออินเตอร์เฟซสำหรับบันทึกเสียงคุณภาพสูง เชื่อมต่อใช้งานง่าย',
    image: 'https://www.tradeinn.com/f/14319/143196795/focusrite-scarlett-2i2-usb-c-4th-gen-audio-interface.webp'
  },
  {
    id: 7,
    name: 'Boss Katana 50 MkII',
    category: 'audio',
    price: 10900,
    rating: 4.8,
    badge: 'แอมป์กีตาร์',
    description: 'แอมป์กีตาร์อเนกประสงค์สำหรับซ้อมและแสดงสด ปรับโทนได้หลากหลาย',
    image: 'https://iguitarmusic.co.th/wp-content/uploads/2024/11/Boss-KATANA-50-EX-Gen-3-Guitar-Amplifier-600x600.jpg'
  },
  {
    id: 8,
    name: 'Guitar Accessories Kit',
    category: 'guitar',
    price: 1490,
    rating: 4.6,
    badge: 'อุปกรณ์เสริม',
    description: 'ชุดอุปกรณ์ครบ: ปิ๊ก สายสำรอง คาโป้ จูนเนอร์ และผ้าเช็ดเครื่อง',
    image: 'https://img-1.kwcdn.com/product/fancy/5db5fd1a-1597-4032-a025-abc584d56846.jpg?imageView2/2/w/500/q/80/format/avif'
  }
];

const state = {
  filter: 'all',
  sort: 'featured',
  query: '',
  cart: loadCart()
};

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('royal-sound-cart') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem('royal-sound-cart', JSON.stringify(state.cart));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  }).format(value);
}

function getVisibleProducts() {
  const filtered = products.filter((product) => {
    const matchesFilter = state.filter === 'all' || product.category === state.filter;
    const searchableText = `${product.name} ${product.description}`.toLowerCase();
    return matchesFilter && searchableText.includes(state.query);
  });

  if (state.sort === 'price-asc') {
    filtered.sort((left, right) => left.price - right.price);
  } else if (state.sort === 'price-desc') {
    filtered.sort((left, right) => right.price - left.price);
  } else if (state.sort === 'rating-desc') {
    filtered.sort((left, right) => right.rating - left.rating);
  }

  return filtered;
}

function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  const resultCount = document.getElementById('result-count');
  const visibleProducts = getVisibleProducts();

  resultCount.textContent = `แสดงสินค้า ${visibleProducts.length} รายการ`;

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft overflow-hidden">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition duration-300 hover:scale-105">
        <span class="absolute left-4 top-4 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1 text-xs font-bold text-white">${product.badge}</span>
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.08em] text-slate-400">
          <span>${product.category}</span>
          <span>คะแนน ${product.rating}</span>
        </div>
        <h3 class="mt-3 text-[1.05rem] font-bold tracking-tight text-white">${product.name}</h3>
        <p class="mt-2 text-sm leading-7 text-slate-400">${product.description}</p>
        <div class="mt-4 flex items-center justify-between gap-3">
          <strong class="text-lg font-extrabold text-white">${formatCurrency(product.price)}</strong>
          <button class="add-to-cart inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10" type="button" data-add-to-cart="${product.id}">เพิ่มลงรถเข็น</button>
        </div>
      </div>
    </article>
  `).join('');

  productGrid.querySelectorAll('[data-add-to-cart]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.addToCart)));
  });
}

function addToCart(productId) {
  const item = state.cart.find((entry) => entry.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function updateQuantity(productId, delta) {
  const target = state.cart.find((entry) => entry.id === productId);
  if (!target) {
    return;
  }

  target.quantity += delta;

  if (target.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((entry) => entry.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartEntries = state.cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const totalQuantity = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatCurrency(subtotal);

  if (cartEntries.length === 0) {
    cartItems.innerHTML = `
      <div class="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
        <strong class="block text-base font-bold text-white">รถเข็นยังว่าง</strong>
        <p class="mt-2 leading-7">เพิ่มสินค้าเพื่อดูสรุปรายการและยอดรวม</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cartEntries.map((item) => `
    <article class="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <img src="${item.image}" alt="${item.name}" class="h-20 w-20 rounded-xl object-cover">
      <div class="flex flex-1 flex-col gap-3">
        <div>
          <h3 class="text-sm font-bold leading-6 text-white">${item.name}</h3>
          <p class="text-sm text-slate-400">${formatCurrency(item.price)}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="rounded-xl bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20" data-decrease="${item.id}">-</button>
          <span class="min-w-6 text-center text-sm font-bold text-white">${item.quantity}</span>
          <button type="button" class="rounded-xl bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20" data-increase="${item.id}">+</button>
          <button type="button" class="ml-auto rounded-xl bg-rose-500/15 px-3 py-1.5 text-sm font-bold text-rose-200 transition hover:bg-rose-500/25" data-remove="${item.id}">ลบ</button>
        </div>
      </div>
    </article>
  `).join('');

  cartItems.querySelectorAll('[data-decrease]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.decrease);
      const entry = state.cart.find((item) => item.id === id);
      if (entry) {
        updateQuantity(id, -1);
      }
    });
  });

  cartItems.querySelectorAll('[data-increase]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.increase);
      const entry = state.cart.find((item) => item.id === id);
      if (entry) {
        updateQuantity(id, 1);
      }
    });
  });

  cartItems.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.remove)));
  });
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const panel = drawer.firstElementChild;

  drawer.classList.remove('pointer-events-none', 'opacity-0');
  drawer.classList.add('pointer-events-auto', 'opacity-100');
  panel.classList.remove('translate-x-full');
  backdrop.hidden = false;
  backdrop.classList.remove('opacity-0');
  backdrop.classList.add('opacity-100');
  document.body.style.overflow = 'hidden';
  drawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const panel = drawer.firstElementChild;

  drawer.classList.remove('pointer-events-auto', 'opacity-100');
  drawer.classList.add('pointer-events-none', 'opacity-0');
  panel.classList.add('translate-x-full');
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  window.setTimeout(() => {
    if (drawer.getAttribute('aria-hidden') === 'true') {
      backdrop.hidden = true;
    }
  }, 200);
}

function setActiveCategory(filter) {
  document.querySelectorAll('.category-card').forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('bg-white/10', isActive);
    button.classList.toggle('border-amber-400/30', isActive);
    button.classList.toggle('ring-1', isActive);
    button.classList.toggle('ring-amber-400/20', isActive);
    button.classList.toggle('bg-white/5', !isActive);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('site-nav');
  const searchToggle = document.getElementById('search-toggle');
  const headerSearch = document.getElementById('header-search');
  const searchInput = document.getElementById('search-input');
  const menuToggle = document.getElementById('menu-toggle');
  const sortSelect = document.getElementById('sort-select');
  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const backdrop = document.getElementById('drawer-backdrop');

  document.getElementById('year').textContent = new Date().getFullYear();
  setActiveCategory(state.filter);
  renderProducts();
  renderCart();

  searchToggle.addEventListener('click', () => {
    const isHidden = headerSearch.hasAttribute('hidden');

    if (isHidden) {
      headerSearch.hidden = false;
      searchInput.focus();
    } else {
      headerSearch.hidden = true;
      searchInput.value = '';
      state.query = '';
      renderProducts();
    }
  });

  menuToggle.addEventListener('click', () => {
    const isHidden = nav.classList.contains('hidden');

    if (isHidden) {
      nav.classList.remove('hidden');
      nav.classList.add('flex');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      nav.classList.add('hidden');
      nav.classList.remove('flex');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderProducts();
  });

  searchInput.addEventListener('input', (event) => {
    state.query = event.target.value.toLowerCase().trim();
    renderProducts();
  });

  document.querySelectorAll('.category-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      setActiveCategory(state.filter);
      renderProducts();
    });
  });

  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCart();
      if (!headerSearch.hidden) {
        headerSearch.hidden = true;
        searchInput.value = '';
        state.query = '';
        renderProducts();
      }
      nav.classList.add('hidden');
      nav.classList.remove('flex');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('cart-drawer').addEventListener('click', (event) => {
    if (event.target.id === 'cart-drawer') {
      closeCart();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('hidden');
      nav.classList.add('flex');
    } else {
      nav.classList.add('hidden');
      nav.classList.remove('flex');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});