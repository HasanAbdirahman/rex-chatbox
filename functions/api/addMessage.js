const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { logger } = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received message request data:", data);

    // validate required fields
    if (!data.text || !data.userId) {
      logger.log("Required fields (text or userId) are missing");
      throw new functions.https.HttpError(
          "invalid-argument",
          "Required fields (text or userId) are missing",
      );
    }

    const { text, userId } = data;

    // construct message data
    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.serverTimestamp(),
    };

    //  add mesage to the user's message subcollection in firestore
    const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .add(messageData);
    logger.log("Messages added successfully, message ID: ", messageRef.id);

    // return success status and message ID
    return { status: "success", messageId: messageRef.id };
  } catch (error) {
    logger.error("Error adding messages", error);
    throw new functions.https.HttpError(
        "unknown",
        "An error occured while adding the message",
        error.message,
    );
  }
});
