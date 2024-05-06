const admin = require("firebase-admin");
admin.initializeApp();

// import functions from the specific files
const { addMessage } = require("./api/addMessage");

// export the function for deployment
exports.addMessage = addMessage;
