const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing users
    await User.deleteMany({});
    console.log('Old users cleared');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      password: 'admin123',
      isAdmin: true,
      phone: '9876543210',
      address: {
        street: '123 Admin Street',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      }
    });
    console.log('✅ Admin user created:', admin.email);

    // Create regular user
    const user = await User.create({
      name: 'Test User',
      email: 'user@demo.com',
      password: 'user123',
      isAdmin: false,
      phone: '9876543211',
      address: {
        street: '456 User Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      }
    });
    console.log('✅ Test user created:', user.email);

    console.log('\n📧 Login Credentials:');
    console.log('Admin - Email: admin@demo.com, Password: admin123');
    console.log('User  - Email: user@demo.com, Password: user123');

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    mongoose.connection.close();
  }
}

createUsers();