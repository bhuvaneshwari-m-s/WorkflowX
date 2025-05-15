const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/task-manager-api';

mongoose.connect(connectionURL)
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
