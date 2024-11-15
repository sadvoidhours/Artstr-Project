const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

const seedProducts = async () => {
    const products = [
        { name: 'Product 1', description: 'Description for product 1', price: 10 },
        { name: 'Product 2', description: 'Description for product 2', price: 20 },
        { name: 'Product 3', description: 'Description for product 3', price: 30 },
    ];

    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedProducts();