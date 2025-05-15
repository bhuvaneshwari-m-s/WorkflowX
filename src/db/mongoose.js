const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL ;

mongoose.connect(connectionURL)
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
