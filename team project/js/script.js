let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});

var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();
    
    // Update product slider with fetched products
    const productSliders = document.querySelectorAll('.product-slider .swiper-wrapper');
    productSliders.forEach((slider, index) => {
      slider.innerHTML = ''; // Clear existing products
      const sliceStart = index * 4;
      const sliceEnd = sliceStart + 4;
      
      products.slice(sliceStart, sliceEnd).forEach(product => {
        const productElement = `
          <div class="swiper-slide box">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="stars">
              <!-- Star rating logic -->
            </div>
            <button class="btn" onclick="addToCart('${product._id}')">add to cart</button>
          </div>
        `;
        slider.innerHTML += productElement;
      });
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

// 8. Package.json Dependencies
/*
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^6.0.12"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
*/