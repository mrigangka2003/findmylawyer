import mongoose from 'mongoose';
import { Role } from '../models/role.model';
import { MONGODB_URI, DB_NAME } from '../constants';

const roles = [
  {
    name: 'user',
    permissions: [
      'booking:create',
      'booking:read_own',
      'booking:update_own',
      'booking:cancel_own',
      'payment:process',
      'ai:access',
      'dashboard:user'
    ]
  },
  {
    name: 'lawyer',
    permissions: [
      'booking:read_lawyer',
      'booking:update_status',
      'payment:read_lawyer',
      'dashboard:lawyer',
      'lawyer:update_profile'
    ]
  },
  {
    name: 'admin',
    permissions: ['*'] // Admin has all permissions
  }
];

const seedRoles = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log('Connected to MongoDB for seeding...');

    await Role.deleteMany({});
    await Role.insertMany(roles);

    console.log('Roles seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding roles:', error);
    process.exit(1);
  }
};

seedRoles();
