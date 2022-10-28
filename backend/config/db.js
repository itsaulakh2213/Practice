const mongoose = require('mongoose');

const connectToMongoose = () => mongoose.connect( process.env.URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => console.log(`connect To Mngoose ${data.connection.host}`)).catch((err) => console.log(`failed to connect to Mngoose ${err.message}`));

module.exports = connectToMongoose;