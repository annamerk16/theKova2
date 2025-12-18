const mongoose = require('mongoose');
require('dotenv').config();

const { MenuItem } = require('./models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kova-restaurant';

const menuData = [
  { name: "Mushroom & Onion Omelette", price: 12, category: "Egg Dishes", description: "Fluffy three-egg omelette with sautéed mushrooms and caramelized onions" },
  { name: "Spinach & Cheese Omelette", price: 12, category: "Egg Dishes", description: "Fresh spinach and melted cheese folded into a perfect omelette" },
  { name: "Egg Florentine", price: 13, category: "Egg Dishes", description: "Poached eggs on English muffin with spinach and hollandaise sauce" },
  { name: "Eggs Benedict", price: 13, category: "Egg Dishes", description: "Classic poached eggs with Canadian bacon and hollandaise on English muffin" },
  { name: "Eggs Royale", price: 13, category: "Egg Dishes", description: "Poached eggs with smoked salmon and hollandaise on English muffin" },

  { name: "Pancakes", price: 12.50, category: "Sweet & Savory", description: "Fluffy buttermilk pancakes served with maple syrup and butter" },
  { name: "French Toast", price: 12.50, category: "Sweet & Savory", description: "Thick-cut brioche dipped in cinnamon custard, grilled to perfection" },
  { name: "Belgian Waffles with Nutella", price: 12.50, category: "Sweet & Savory", description: "Crispy Belgian waffle drizzled with rich Nutella" },
  { name: "Fruit Salad", price: 8, category: "Sweet & Savory", description: "Fresh seasonal fruits with a honey-lime dressing" },
  { name: "Green Salad", price: 7.50, category: "Sweet & Savory", description: "Mixed greens with tomatoes, cucumbers, and house vinaigrette" },

  { name: "Bacon, Egg, and Cheese", price: 8.50, category: "Burgers & Sandwiches", description: "Classic NYC breakfast sandwich with crispy bacon, fried egg, and melted cheese" },
  { name: "Fried Chicken Sandwich", price: 13.50, category: "Burgers & Sandwiches", description: "Crispy fried chicken breast with pickles, slaw, and special sauce" },
  { name: "Sriracha Jam Grilled Cheese", price: 6.50, category: "Burgers & Sandwiches", description: "Melted cheese with sweet and spicy sriracha jam on sourdough" },
  { name: "Cheeseburger", price: 15, category: "Burgers & Sandwiches", description: "Premium beef patty with cheese, lettuce, tomato, onion, and special sauce" },

  { name: "Beef Roti", price: 13, category: "Roti & Sides", description: "Caribbean-style flatbread filled with curried beef and potatoes" },
  { name: "Chicken Roti", price: 13, category: "Roti & Sides", description: "Caribbean-style flatbread filled with curried chicken and potatoes" },
  { name: "Sweet Potato Fries", price: 7, category: "Roti & Sides", description: "Crispy sweet potato fries with a touch of sea salt" },
  { name: "Spicy Hand Cut Fries", price: 7, category: "Roti & Sides", description: "Hand-cut fries with our signature spicy seasoning" },
  { name: "Hand Cut Fries", price: 6, category: "Roti & Sides", description: "Classic hand-cut fries, perfectly crispy" },

  { name: "Espresso", price: 3.25, category: "Drinks", description: "Rich and bold espresso shot" },
  { name: "Latte", price: 3.25, category: "Drinks", description: "Smooth espresso with steamed milk" },
  { name: "Cappuccino", price: 4.25, category: "Drinks", description: "Espresso topped with foamy steamed milk" },
  { name: "Matcha Latte", price: 5.50, category: "Drinks", description: "Premium matcha green tea with steamed milk" },
  { name: "Chai Latte", price: 5.50, category: "Drinks", description: "Spiced chai tea with steamed milk and honey" },

  { name: "The Kova Breakfast", price: 15, category: "Specials", description: "Two eggs any style, bacon or sausage, toast, and home fries" },
  { name: "The Kova Latte", price: 6, category: "Specials", description: "Our signature house blend latte with a secret touch" },
  { name: "Homemade Hibiscus Lemonade", price: 5, category: "Specials", description: "Refreshing hibiscus-infused lemonade made in-house" },
  { name: "Homemade Lavender Lemonade", price: 5, category: "Specials", description: "Delicate lavender lemonade with a hint of sweetness" }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const deleteResult = await MenuItem.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing menu items`);

    const insertedItems = await MenuItem.insertMany(menuData);
    console.log(`Successfully seeded ${insertedItems.length} menu items`);

    const categories = [...new Set(menuData.map(item => item.category))];
    console.log('\nMenu Categories:');
    categories.forEach(category => {
      const count = menuData.filter(item => item.category === category).length;
      console.log(`   - ${category}: ${count} items`);
    });

    console.log('\nDatabase seeding completed successfully!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();