const mongoose = require("mongoose");

module.exports = {
    config: (mongodb_url, cloud_name, api_key, api_secret) => {
        // Set up default mongoose connection
        mongoose.connect(mongodb_url).catch(console.error);

        // Get mongoose to use the global promise library
        mongoose.Promise = global.Promise;

        // Get the default connection
        let db = mongoose.connection;

        // Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'Connection error: '));
        db.once('open', () => console.log('Connected to mongodb successfully!'));

        // Cloudinary configurations
        require("cloudinary").config({
            cloud_name: cloud_name,
            api_key: api_key,
            api_secret: api_secret
        });
    },
    User: mongoose.model("Blazen_User", new mongoose.Schema(require('./userModel')))
};