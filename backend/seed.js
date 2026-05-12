const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing)
    await mongoose.connection.collection('users').deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Hash password once — all test users share same password
    const hash = await bcrypt.hash('admin123', 10);

    // Insert all users
    await mongoose.connection.collection('users').insertMany([
      {
        name: 'Admin User',
        email: 'admin@school.com',
        password: hash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teacher Priya',
        email: 'teacher@school.com',
        password: hash,
        role: 'teacher',
        class: '10A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teacher Raj',
        email: 'teacher2@school.com',
        password: hash,
        role: 'teacher',
        class: '10B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Student Ravi',
        email: 'student@school.com',
        password: hash,
        role: 'student',
        class: '10A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Student Meena',
        email: 'student2@school.com',
        password: hash,
        role: 'student',
        class: '10B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Parent Kumar',
        email: 'parent@school.com',
        password: hash,
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Parent Lakshmi',
        email: 'parent2@school.com',
        password: hash,
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('✅ All users created successfully!');
    console.log('');
    console.log('📋 Login credentials (all use password: admin123)');
    console.log('----------------------------------------------------');
    console.log('👑 Admin    → admin@school.com');
    console.log('👩‍🏫 Teacher1 → teacher@school.com   (Class 10A)');
    console.log('👨‍🏫 Teacher2 → teacher2@school.com  (Class 10B)');
    console.log('👦 Student1 → student@school.com   (Class 10A)');
    console.log('👧 Student2 → student2@school.com  (Class 10B)');
    console.log('👨 Parent1  → parent@school.com');
    console.log('👩 Parent2  → parent2@school.com');
    console.log('----------------------------------------------------');
    console.log('🔑 Password for ALL accounts: admin123');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit();
  }
};

seedUsers();