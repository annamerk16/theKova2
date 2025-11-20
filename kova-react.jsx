import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Menu as MenuIcon, Facebook, Instagram, Music } from 'lucide-react';

// Navigation Component
const Navigation = ({ cartCount, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-amber-50 shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-amber-600">The Kova</div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li><a href="#home" className="text-amber-600 hover:text-amber-700 font-medium transition">Home</a></li>
            <li><a href="#menu" className="text-amber-600 hover:text-amber-700 font-medium transition">Menu</a></li>
            <li><a href="#about" className="text-amber-600 hover:text-amber-700 font-medium transition">About</a></li>
            <li><a href="#contact" className="text-amber-600 hover:text-amber-700 font-medium transition">Contact</a></li>
          </ul>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onCartToggle}
              className="relative text-amber-600 hover:scale-110 transition-transform"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-amber-600"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden pb-4 space-y-2">
            <li><a href="#home" className="block text-amber-600 hover:text-amber-700 py-2" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#menu" className="block text-amber-600 hover:text-amber-700 py-2" onClick={() => setIsMenuOpen(false)}>Menu</a></li>
            <li><a href="#about" className="block text-amber-600 hover:text-amber-700 py-2" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#contact" className="block text-amber-600 hover:text-amber-700 py-2" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

// Hero Section Component
const Hero = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center relative mt-16" 
      style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://thekovanyc.com/photos/interior.JPG')"}}>
      <div className="animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">The Kova</h1>
        <p className="text-xl md:text-2xl text-amber-300">Your Local Coffee, Breakfast, Brunch Spot</p>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: 'https://thekovanyc.com/photos/eggs.JPG', alt: 'Eggs' },
    { src: 'https://thekovanyc.com/photos/latte.JPG', alt: 'Coffee' },
    { src: 'https://thekovanyc.com/photos/pancake.JPG', alt: 'Pancakes' },
    { src: 'https://thekovanyc.com/photos/bec.JPG', alt: 'Burger' },
    { src: 'https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,q_auto,fl_lossy,dpr_auto,c_fill,f_auto,h_800,g_auto/srr4kaz15iieqfmghejd', alt: 'Lots of food' },
    { src: 'https://d1ralsognjng37.cloudfront.net/ba431089-b764-48b7-946b-a24619dbe75b.jpeg', alt: 'Beef roti' }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="gallery" className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-amber-600 mb-12">Gallery</h2>
      <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative h-96 md:h-[500px]">
          <img 
            src={images[currentSlide].src} 
            alt={images[currentSlide].alt}
            className="w-full h-full object-cover"
          />
        </div>
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          →
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${idx === currentSlide ? 'bg-amber-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Menu Component
const MenuSection = ({ onAddToCart }) => {
  const menuCategories = [
    {
      name: "Egg Dishes",
      items: [
        { name: "Mushroom & Onion Omelette", price: 12 },
        { name: "Spinach & Cheese Omelette", price: 12 },
        { name: "Egg Florentine", price: 13 },
        { name: "Eggs Benedict", price: 13 },
        { name: "Eggs Royale", price: 13 }
      ]
    },
    {
      name: "Sweet & Savory",
      items: [
        { name: "Pancakes", price: 12.50 },
        { name: "French Toast", price: 12.50 },
        { name: "Belgian Waffles with Nutella", price: 12.50 },
        { name: "Fruit Salad", price: 8 },
        { name: "Green Salad", price: 7.50 }
      ]
    },
    {
      name: "Burgers & Sandwiches",
      items: [
        { name: "Bacon, Egg, and Cheese", price: 8.50 },
        { name: "Fried Chicken Sandwich", price: 13.50 },
        { name: "Sriracha Jam Grilled Cheese", price: 6.50 },
        { name: "Cheeseburger", price: 15 }
      ]
    },
    {
      name: "Roti & Sides",
      items: [
        { name: "Beef Roti", price: 13 },
        { name: "Chicken Roti", price: 13 },
        { name: "Sweet Potato Fries", price: 7 },
        { name: "Spicy Hand Cut Fries", price: 7 },
        { name: "Hand Cut Fries", price: 6 }
      ]
    },
    {
      name: "Drinks",
      items: [
        { name: "Espresso", price: 3.25 },
        { name: "Latte", price: 3.25 },
        { name: "Cappuccino", price: 4.25 },
        { name: "Matcha Latte", price: 5.50 },
        { name: "Chai Latte", price: 5.50 }
      ]
    },
    {
      name: "Specials",
      items: [
        { name: "The Kova Breakfast", price: 15 },
        { name: "The Kova Latte", price: 6 },
        { name: "Homemade Hibiscus Lemonade", price: 5 },
        { name: "Homemade Lavender Lemonade", price: 5 }
      ]
    }
  ];

  return (
    <section id="menu" className="py-16 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-amber-600 mb-12">Our Menu</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuCategories.map((category, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-amber-600 mb-4 pb-2 border-b-2 border-amber-600">
              {category.name}
            </h3>
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-amber-600 font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// About Section Component
const About = () => {
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-amber-600 mb-8">About The Kova</h2>
        <p className="text-lg leading-relaxed mb-6">
          Warm, relaxed, and cozy venue for breakfast staples like pancakes and omelets, burgers and fried chicken sandwiches.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          After opening in 2020, The Kova has been dedicated to delivering quality food at an affordable price. $20 food in this economy? Absolutely not. Nothing over $15 at our establishment!
        </p>
        <div className="bg-amber-50 rounded-xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-amber-600 mb-4">Our Philosophy</h3>
          <p className="text-lg leading-relaxed">
            At The Kova, we believe that everyone should be able to treat themselves to good food every once in a while, or perhaps even every day. We vow to never raise our prices because we love our community! ❤️
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-amber-600 mb-12">Contact Us</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden h-96 shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.9317719426526!2d-74.10410639999999!3d40.587261399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa735a70bfd%3A0x63575e101ad7db65!2sThe%20KOVA!5e0!3m2!1sen!2sus!4v1759699689691!5m2!1sen!2sus"
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
            title="The Kova Location"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-amber-600 mb-6">Send us a Message</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phone (Optional)</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-bold text-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Shopping Cart Component
const ShoppingCart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onClear }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="bg-amber-50 p-6 border-b-2 border-amber-600 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-600">Your Cart</h2>
          <button onClick={onClose} className="text-amber-600 hover:rotate-90 transition-transform">
            <X size={32} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 italic mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-amber-600 font-bold">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(idx, -1)}
                        disabled={item.quantity === 1}
                        className="bg-amber-600 text-white w-7 h-7 rounded hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                      >
                        <Minus size={16} className="mx-auto" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(idx, 1)}
                        className="bg-amber-600 text-white w-7 h-7 rounded hover:bg-amber-700 transition"
                      >
                        <Plus size={16} className="mx-auto" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(idx)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-amber-50 p-6 border-t-2 border-amber-600">
          <div className="flex justify-between text-xl font-bold mb-4 pb-4 border-b-2 border-amber-600">
            <span>Total:</span>
            <span className="text-amber-600">${total.toFixed(2)}</span>
          </div>
          {cart.length > 0 && (
            <>
              <button 
                onClick={onClear}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold mb-3"
              >
                Clear Cart
              </button>
              <button 
                onClick={() => alert('Checkout functionality would be implemented here.')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-amber-50 text-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://www.facebook.com/thekovanyc/" className="text-amber-600 hover:text-amber-700 transition">
              <Facebook size={24} />
            </a>
            <a href="https://www.instagram.com/thekovanyc/" className="text-amber-600 hover:text-amber-700 transition">
              <Instagram size={24} />
            </a>
            <a href="https://www.tiktok.com/@thekovanyc" className="text-amber-600 hover:text-amber-700 transition">
              <Music size={24} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">Business Hours</h3>
          <ul className="space-y-1">
            <li>Monday: 9am - 4pm</li>
            <li>Tuesday: Closed</li>
            <li>Wednesday: 9am - 4pm</li>
            <li>Thursday: 9am - 4pm</li>
            <li>Friday: 9am - 4pm</li>
            <li>Saturday: 9am - 4pm</li>
            <li>Sunday: 9am - 4pm</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">Contact Info</h3>
          <p>1775B Richmond Rd</p>
          <p>Staten Island, NY 10306</p>
          <p className="mt-2">Phone: (646) 577-5500</p>
          <p>Email: thekovanyc@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    const existingIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation cartCount={cartCount} onCartToggle={() => setIsCartOpen(!isCartOpen)} />
      <Hero />
      <Gallery />
      <MenuSection onAddToCart={addToCart} />
      <About />
      <Contact />
      <Footer />
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onClear={clearCart}
      />
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;