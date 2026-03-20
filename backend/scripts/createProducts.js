const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

async function createProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Old products cleared');

    const products = [
      // ========== BEAUTY PRODUCTS (10) - Exact Match ==========
      {
        title: "Essence Lash Princess Mascara",
        description: "Volumizing and lengthening mascara for dramatic lashes. Cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        priceInRupees: 829,
        discountPercentage: 10,
        stock: 99,
        brand: "Essence",
        thumbnail: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Maybelline Eyeshadow Palette",
        description: "12 stunning pigment-rich shades for endless eye looks. Includes mirror.",
        category: "beauty",
        price: 24.99,
        priceInRupees: 2074,
        discountPercentage: 15,
        stock: 45,
        brand: "Maybelline",
        thumbnail: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=800&fit=crop"],
        rating: 4.3
      },
      {
        title: "Lakme Perfecting Powder",
        description: "Finely milled setting powder for a smooth, matte finish. Controls shine.",
        category: "beauty",
        price: 14.99,
        priceInRupees: 1244,
        discountPercentage: 8,
        stock: 78,
        brand: "Lakme",
        thumbnail: "https://images.unsplash.com/photo-1590152968309-8c3a5f6c0b3e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1590152968309-8c3a5f6c0b3e?w=800&h=800&fit=crop"],
        rating: 4.2
      },
      {
        title: "MAC Retro Matte Lipstick - Ruby Woo",
        description: "Iconic red lipstick with a matte finish. Intense color payoff.",
        category: "beauty",
        price: 22.99,
        priceInRupees: 1908,
        discountPercentage: 5,
        stock: 62,
        brand: "MAC",
        thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop"],
        rating: 4.7
      },
      {
        title: "O.P.I Nail Lacquer - Big Apple Red",
        description: "Classic red nail polish with high-gloss finish. Chip-resistant.",
        category: "beauty",
        price: 12.99,
        priceInRupees: 1078,
        discountPercentage: 12,
        stock: 53,
        brand: "O.P.I",
        thumbnail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Real Techniques Brush Set",
        description: "Professional 6-piece makeup brush set for flawless application.",
        category: "beauty",
        price: 29.99,
        priceInRupees: 2489,
        discountPercentage: 20,
        stock: 34,
        brand: "Real Techniques",
        thumbnail: "https://images.unsplash.com/photo-1597225245125-eb3ad12d1b6a?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1597225245125-eb3ad12d1b6a?w=800&h=800&fit=crop"],
        rating: 4.6
      },
      {
        title: "Benefit Cosmetics Highlighter",
        description: "Shimmery peachy-pink highlighter for a natural, dewy glow.",
        category: "beauty",
        price: 32.99,
        priceInRupees: 2738,
        discountPercentage: 7,
        stock: 28,
        brand: "Benefit",
        thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "The Ordinary Vitamin C Serum",
        description: "Brightening vitamin C serum. Reduces dark spots and evens skin tone.",
        category: "beauty",
        price: 19.99,
        priceInRupees: 1659,
        discountPercentage: 0,
        stock: 87,
        brand: "The Ordinary",
        thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop"],
        rating: 4.8
      },
      {
        title: "Cetaphil Moisturizing Cream",
        description: "Rich, non-greasy moisturizer for dry, sensitive skin.",
        category: "beauty",
        price: 16.99,
        priceInRupees: 1410,
        discountPercentage: 5,
        stock: 112,
        brand: "Cetaphil",
        thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop"],
        rating: 4.6
      },
      {
        title: "L'Oreal Paris Eye Cream",
        description: "Anti-aging eye cream that reduces puffiness and dark circles.",
        category: "beauty",
        price: 24.99,
        priceInRupees: 2074,
        discountPercentage: 10,
        stock: 42,
        brand: "L'Oreal",
        thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop"],
        rating: 4.3
      },

      // ========== FRAGRANCES (8) - Exact Match ==========
      {
        title: "Calvin Klein CK One",
        description: "Classic unisex fragrance with fresh notes of green tea, bergamot, and musk.",
        category: "fragrances",
        price: 49.99,
        priceInRupees: 4149,
        discountPercentage: 5,
        stock: 56,
        brand: "Calvin Klein",
        thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Chanel Coco Noir",
        description: "Elegant fragrance with notes of grapefruit, rose, and sandalwood.",
        category: "fragrances",
        price: 129.99,
        priceInRupees: 10789,
        discountPercentage: 0,
        stock: 23,
        brand: "Chanel",
        thumbnail: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&h=800&fit=crop"],
        rating: 4.8
      },
      {
        title: "Dior J'adore",
        description: "Luxurious floral fragrance with notes of ylang-ylang, rose, and jasmine.",
        category: "fragrances",
        price: 99.99,
        priceInRupees: 8299,
        discountPercentage: 8,
        stock: 34,
        brand: "Dior",
        thumbnail: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop"],
        rating: 4.7
      },
      {
        title: "Gucci Bloom",
        description: "Floral fragrance with notes of tuberose, jasmine, and Rangoon creeper.",
        category: "fragrances",
        price: 89.99,
        priceInRupees: 7469,
        discountPercentage: 10,
        stock: 41,
        brand: "Gucci",
        thumbnail: "https://images.unsplash.com/photo-1592919505780-d3030d32789b?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1592919505780-d3030d32789b?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Versace Eros Pour Homme",
        description: "Fresh, woody fragrance for men with notes of mint and green apple.",
        category: "fragrances",
        price: 69.99,
        priceInRupees: 5809,
        discountPercentage: 12,
        stock: 38,
        brand: "Versace",
        thumbnail: "https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=800&h=800&fit=crop"],
        rating: 4.6
      },
      {
        title: "Tom Ford Black Orchid",
        description: "Luxurious sensual fragrance with notes of black truffle and ylang-ylang.",
        category: "fragrances",
        price: 149.99,
        priceInRupees: 12449,
        discountPercentage: 5,
        stock: 19,
        brand: "Tom Ford",
        thumbnail: "https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=800&h=800&fit=crop"],
        rating: 4.8
      },
      {
        title: "Paco Rabanne 1 Million",
        description: "Powerful masculine fragrance with notes of blood mandarin and rose.",
        category: "fragrances",
        price: 79.99,
        priceInRupees: 6639,
        discountPercentage: 7,
        stock: 47,
        brand: "Paco Rabanne",
        thumbnail: "https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Hugo Boss Bottled",
        description: "Classic elegant fragrance with notes of apple and sandalwood.",
        category: "fragrances",
        price: 59.99,
        priceInRupees: 4979,
        discountPercentage: 9,
        stock: 52,
        brand: "Hugo Boss",
        thumbnail: "https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1619994416418-2e0566d3b7b4?w=800&h=800&fit=crop"],
        rating: 4.3
      },

      // ========== FURNITURE (12) - Exact Match ==========
      {
        title: "IKEA MALM Bed Frame",
        description: "Modern bed frame with storage drawers. High headboard.",
        category: "furniture",
        price: 399.99,
        priceInRupees: 33199,
        discountPercentage: 5,
        stock: 12,
        brand: "IKEA",
        thumbnail: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Ashley Furniture Sectional Sofa",
        description: "L-shaped sectional sofa with chaise. Durable fabric.",
        category: "furniture",
        price: 899.99,
        priceInRupees: 74699,
        discountPercentage: 10,
        stock: 8,
        brand: "Ashley",
        thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop"],
        rating: 4.3
      },
      {
        title: "Nathan James Bedside Table",
        description: "Stylish nightstand with shelf and drawer. Modern design.",
        category: "furniture",
        price: 89.99,
        priceInRupees: 7469,
        discountPercentage: 15,
        stock: 42,
        brand: "Nathan James",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Herman Miller Aeron Chair",
        description: "Ergonomic office chair with mesh and lumbar support.",
        category: "furniture",
        price: 1295.00,
        priceInRupees: 107485,
        discountPercentage: 0,
        stock: 5,
        brand: "Herman Miller",
        thumbnail: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop"],
        rating: 4.9
      },
      {
        title: "Kohler Bathroom Vanity",
        description: "Bathroom vanity with marble top and ceramic sink.",
        category: "furniture",
        price: 599.99,
        priceInRupees: 49799,
        discountPercentage: 7,
        stock: 11,
        brand: "Kohler",
        thumbnail: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Sauder Coffee Table",
        description: "Modern coffee table with lower shelf for storage.",
        category: "furniture",
        price: 149.99,
        priceInRupees: 12449,
        discountPercentage: 12,
        stock: 28,
        brand: "Sauder",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.2
      },
      {
        title: "Prepac Bookshelf",
        description: "5-tier bookshelf with adjustable shelves.",
        category: "furniture",
        price: 179.99,
        priceInRupees: 14939,
        discountPercentage: 8,
        stock: 23,
        brand: "Prepac",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.3
      },
      {
        title: "Better Homes Dining Set",
        description: "5-piece dining set with table and 4 chairs.",
        category: "furniture",
        price: 399.99,
        priceInRupees: 33199,
        discountPercentage: 10,
        stock: 14,
        brand: "Better Homes",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "ClosetMaid Wardrobe",
        description: "Freestanding wardrobe with hanging rod and shelves.",
        category: "furniture",
        price: 129.99,
        priceInRupees: 10789,
        discountPercentage: 6,
        stock: 31,
        brand: "ClosetMaid",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.1
      },
      {
        title: "Furinno TV Stand",
        description: "Functional TV stand for up to 50-inch TVs.",
        category: "furniture",
        price: 49.99,
        priceInRupees: 4149,
        discountPercentage: 15,
        stock: 54,
        brand: "Furinno",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.0
      },
      {
        title: "Ameriwood Home Study Desk",
        description: "Compact computer desk with keyboard tray.",
        category: "furniture",
        price: 89.99,
        priceInRupees: 7469,
        discountPercentage: 5,
        stock: 37,
        brand: "Ameriwood",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.2
      },
      {
        title: "Patio Paradise Outdoor Set",
        description: "4-piece patio furniture set with table and chairs.",
        category: "furniture",
        price: 299.99,
        priceInRupees: 24899,
        discountPercentage: 12,
        stock: 9,
        brand: "Patio Paradise",
        thumbnail: "https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320978-9d4a3d7d7b7e?w=800&h=800&fit=crop"],
        rating: 4.3
      },

      // ========== GROCERIES (14) - Exact Match ==========
      {
        title: "Organic Red Apples - 1kg",
        description: "Sweet and crisp organic apples. Perfect for snacking.",
        category: "groceries",
        price: 3.99,
        priceInRupees: 331,
        discountPercentage: 0,
        stock: 150,
        brand: "Organic Valley",
        thumbnail: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Angus Beef Steak - 500g",
        description: "Premium Angus beef steaks, aged for tenderness.",
        category: "groceries",
        price: 14.99,
        priceInRupees: 1244,
        discountPercentage: 5,
        stock: 45,
        brand: "Angus Reserve",
        thumbnail: "https://images.unsplash.com/photo-1602470520400-b7a2b6c1b5d9?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1602470520400-b7a2b6c1b5d9?w=800&h=800&fit=crop"],
        rating: 4.7
      },
      {
        title: "Purina Cat Food - 2kg",
        description: "Complete nutrition for adult cats. With real chicken.",
        category: "groceries",
        price: 18.99,
        priceInRupees: 1576,
        discountPercentage: 8,
        stock: 78,
        brand: "Purina",
        thumbnail: "https://images.unsplash.com/photo-1589924691995-400dc9e5ec8a?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1589924691995-400dc9e5ec8a?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Boneless Chicken Breast - 1kg",
        description: "Fresh boneless chicken breast, skinless.",
        category: "groceries",
        price: 8.99,
        priceInRupees: 746,
        discountPercentage: 0,
        stock: 95,
        brand: "Tyson",
        thumbnail: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Bertolli Olive Oil - 1L",
        description: "Extra virgin olive oil, perfect for cooking.",
        category: "groceries",
        price: 16.99,
        priceInRupees: 1410,
        discountPercentage: 7,
        stock: 62,
        brand: "Bertolli",
        thumbnail: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=800&fit=crop"],
        rating: 4.6
      },
      {
        title: "Fresh English Cucumber - 500g",
        description: "Long seedless cucumbers, crisp and refreshing.",
        category: "groceries",
        price: 1.99,
        priceInRupees: 165,
        discountPercentage: 0,
        stock: 120,
        brand: "Fresh Farms",
        thumbnail: "https://images.unsplash.com/photo-1580624474734-0c12d7e79a9e?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1580624474734-0c12d7e79a9e?w=800&h=800&fit=crop"],
        rating: 4.3
      },
      {
        title: "Pedigree Dog Food - 3kg",
        description: "Complete nutrition for adult dogs with real meat.",
        category: "groceries",
        price: 22.99,
        priceInRupees: 1908,
        discountPercentage: 10,
        stock: 56,
        brand: "Pedigree",
        thumbnail: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&h=800&fit=crop"],
        rating: 4.4
      },
      {
        title: "Farm Fresh Eggs - 12 count",
        description: "Grade A large eggs from cage-free hens.",
        category: "groceries",
        price: 4.49,
        priceInRupees: 373,
        discountPercentage: 5,
        stock: 200,
        brand: "Eggland's Best",
        thumbnail: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=800&h=800&fit=crop"],
        rating: 4.6
      },
      {
        title: "Atlantic Salmon Fillet - 400g",
        description: "Fresh Atlantic salmon fillet, rich in omega-3.",
        category: "groceries",
        price: 13.99,
        priceInRupees: 1161,
        discountPercentage: 0,
        stock: 32,
        brand: "Sea Cuisine",
        thumbnail: "https://images.unsplash.com/photo-1579631542440-64a92c0f7c7f?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1579631542440-64a92c0f7c7f?w=800&h=800&fit=crop"],
        rating: 4.7
      },
      {
        title: "Bell Pepper Mix - 500g",
        description: "Colorful mix of red, yellow, and green bell peppers.",
        category: "groceries",
        price: 3.49,
        priceInRupees: 290,
        discountPercentage: 0,
        stock: 85,
        brand: "Fresh Farms",
        thumbnail: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&h=800&fit=crop"],
        rating: 4.3
      },
      {
        title: "Pure Organic Honey - 500g",
        description: "Raw unfiltered organic honey, naturally sweet.",
        category: "groceries",
        price: 9.99,
        priceInRupees: 829,
        discountPercentage: 0,
        stock: 64,
        brand: "Nature's Nectar",
        thumbnail: "https://images.unsplash.com/photo-1587049352851-8d4e8918f5f5?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1587049352851-8d4e8918f5f5?w=800&h=800&fit=crop"],
        rating: 4.8
      },
      {
        title: "Ben & Jerry's Ice Cream - 500ml",
        description: "Premium ice cream with chunks and swirls.",
        category: "groceries",
        price: 5.99,
        priceInRupees: 497,
        discountPercentage: 0,
        stock: 42,
        brand: "Ben & Jerry's",
        thumbnail: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=800&fit=crop"],
        rating: 4.9
      },
      {
        title: "Tropicana Orange Juice - 1.5L",
        description: "100% pure squeezed orange juice, no added sugar.",
        category: "groceries",
        price: 4.99,
        priceInRupees: 414,
        discountPercentage: 5,
        stock: 93,
        brand: "Tropicana",
        thumbnail: "https://images.unsplash.com/photo-1600271886742-f049cd451a9c?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1600271886742-f049cd451a9c?w=800&h=800&fit=crop"],
        rating: 4.5
      },
      {
        title: "Fresh Kiwi Fruit - 500g",
        description: "Sweet and tangy kiwi fruits, rich in vitamin C.",
        category: "groceries",
        price: 3.99,
        priceInRupees: 331,
        discountPercentage: 0,
        stock: 72,
        brand: "Fresh Fruits",
        thumbnail: "https://images.unsplash.com/photo-1618897996318-5a901fa447ca?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1618897996318-5a901fa447ca?w=800&h=800&fit=crop"],
        rating: 4.4
      }
    ];

    const result = await Product.insertMany(products);
    console.log(`✅ ${result.length} products added successfully!`);
    
    // Category wise count
    const counts = {};
    result.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
    console.log('📊 Category-wise breakdown:');
    Object.entries(counts).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    mongoose.connection.close();
  }
}

createProducts();