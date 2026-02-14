const CURRENCY = 'PKR';
const CURRENCY_SYMBOL = 'Rs.';

const productsData = [
    {
        id: 'm1',
        name: 'Classic White Shalwar Kameez',
        category: 'men',
        price: 3500,
        originalPrice: 4500,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
        description: 'Traditional white cotton shalwar kameez for everyday wear'
    },
    {
        id: 'm2',
        name: 'Embroidered Kurta',
        category: 'men',
        price: 5500,
        originalPrice: 7500,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
        description: 'Elegant embroidered kurta for special occasions'
    },
    {
        id: 'm3',
        name: 'Waistcoat Shalwar Kameez Set',
        category: 'men',
        price: 8500,
        originalPrice: 12000,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop',
        description: 'Complete set with traditional waistcoat for formal events'
    },
    {
        id: 'm4',
        name: 'Pathani Suit',
        category: 'men',
        price: 4200,
        originalPrice: 5800,
        image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop',
        description: 'Classic Pathani style suit with collar design'
    },
    {
        id: 'm5',
        name: 'Wedding Sherwani',
        category: 'men',
        price: 25000,
        originalPrice: 35000,
        image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=400&h=400&fit=crop',
        description: 'Premium wedding sherwani with heavy embroidery'
    },
    {
        id: 'm6',
        name: 'Eid Special Kurta',
        category: 'men',
        price: 4800,
        originalPrice: 6500,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
        description: 'Festive kurta with beautiful thread work for Eid'
    },
    {
        id: 'm7',
        name: 'Casual Cotton Kurta',
        category: 'men',
        price: 2200,
        originalPrice: 3000,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
        description: 'Comfortable cotton kurta for daily wear'
    },
    {
        id: 'm8',
        name: 'Prince Coat Set',
        category: 'men',
        price: 15000,
        originalPrice: 20000,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop',
        description: 'Stylish prince coat with matching shalwar'
    },
    {
        id: 'w1',
        name: 'Lawn Suit 3-Piece',
        category: 'women',
        price: 4500,
        originalPrice: 6500,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
        description: 'Beautiful lawn suit with dupatta for summer'
    },
    {
        id: 'w2',
        name: 'Embroidered Shalwar Kameez',
        category: 'women',
        price: 7500,
        originalPrice: 10000,
        image: 'https://images.unsplash.com/photo-1583391733955-552cbf07bd01?w=400&h=400&fit=crop',
        description: 'Elegant embroidered suit with chiffon dupatta'
    },
    {
        id: 'w3',
        name: 'Anarkali Frock',
        category: 'women',
        price: 12000,
        originalPrice: 16000,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        description: 'Traditional Anarkali style frock with heavy work'
    },
    {
        id: 'w4',
        name: 'Bridal Lehenga',
        category: 'women',
        price: 45000,
        originalPrice: 60000,
        image: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=400&h=400&fit=crop',
        description: 'Stunning bridal lehenga with intricate embroidery'
    },
    {
        id: 'w5',
        name: 'Cotton Kurti',
        category: 'women',
        price: 2800,
        originalPrice: 4000,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
        description: 'Simple and elegant cotton kurti for daily wear'
    },
    {
        id: 'w6',
        name: 'Chiffon Party Wear',
        category: 'women',
        price: 15000,
        originalPrice: 20000,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
        description: 'Gorgeous chiffon suit perfect for weddings'
    },
    {
        id: 'w7',
        name: 'Linen Suit',
        category: 'women',
        price: 5500,
        originalPrice: 7500,
        image: 'https://images.unsplash.com/photo-1583391733955-552cbf07bd01?w=400&h=400&fit=crop',
        description: 'Premium linen suit for formal occasions'
    },
    {
        id: 'w8',
        name: 'Velvet Shawl Set',
        category: 'women',
        price: 18000,
        originalPrice: 25000,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        description: 'Luxurious velvet suit with matching shawl'
    }
];

function formatPrice(price) {
    return `${CURRENCY_SYMBOL} ${price.toLocaleString('en-PK')}`;
}

function getAllProducts() {
    return productsData;
}

function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

function filterProductsByCategoryAndQuery(category, query) {
    let filtered = productsData;
    
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
    }
    
    return filtered;
}

function getProductById(id) {
    return productsData.find(product => product.id === id);
}

function getFeaturedProducts(count = 4) {
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createProductCard(product) {
    const hasDiscount = product.originalPrice > product.price;
    const discountPercent = hasDiscount 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : 0;
    
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card product-card h-100 shadow-sm">
                <div class="position-relative overflow-hidden">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    ${hasDiscount ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">-${discountPercent}%</span>` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold mb-1">${product.name}</h6>
                    <p class="card-text text-muted small mb-2">${product.description}</p>
                    <div class="mt-auto">
                        <div class="mb-2">
                            ${hasDiscount ? `<span class="original-price me-2">${formatPrice(product.originalPrice)}</span>` : ''}
                            <span class="product-price">${formatPrice(product.price)}</span>
                        </div>
                        <button class="btn btn-primary btn-sm w-100" onclick="addToCart('${product.id}')">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    const noResults = document.getElementById('noResults');
    
    if (products.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.classList.remove('d-none');
        return;
    }
    
    if (noResults) noResults.classList.add('d-none');
    
    const productsHTML = products.map(product => createProductCard(product)).join('');
    container.innerHTML = productsHTML;
}

function loadMenProducts() {
    const menProducts = getProductsByCategory('men');
    displayProducts(menProducts, 'menProducts');
}

function displayMenProducts(products) {
    displayProducts(products, 'menProducts');
}

function loadWomenProducts() {
    const womenProducts = getProductsByCategory('women');
    displayProducts(womenProducts, 'womenProducts');
}

function displayWomenProducts(products) {
    displayProducts(products, 'womenProducts');
}

function loadFeaturedProducts() {
    const featured = getFeaturedProducts(4);
    displayProducts(featured, 'featuredProducts');
}
