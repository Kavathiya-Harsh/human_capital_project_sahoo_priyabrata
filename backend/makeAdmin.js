const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.LOCAL_MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  await db.collection('users').updateMany({}, { $set: { role: 'admin' } });
  console.log('All users made admin');
  process.exit(0);
}).catch(console.error);
