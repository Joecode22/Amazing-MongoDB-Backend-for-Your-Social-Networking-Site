const seedUsers = require('./user-seeds');
const seedThoughts = require('./thought-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedThoughts();
  console.log('\n----- THOUGHTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
