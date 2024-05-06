// document.addEventListener("DOMContentLoaded", (event) => {
//   const app = firebase.app();

//   const db = firebase.firestore();
//   const myPost = db.collection("posts").doc("firstPost");

//   //   we are returning one data in the collection
//   //   myPost.get().then((doc) => {
//   //     const data = doc.data();
//   //     console.log(data);
//   //     document.write(data.title + `<br/>`);
//   //     document.write(`<hr />`);
//   //   });

//   // if we want to realtime snapshot went the data is changed immediately
//   myPost.onSnapshot((doc) => {
//     const data = doc.data();
//     document.querySelector("#title").textContent = data.title;
//   });
// });

document.addEventListener("DOMContentLoaded", (event) => {
   const app = firebase.app();
})

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    });
}

// function updatePost(e) {
//   const db = firebase.firestore();
//   const myPost = db.collection("posts").doc("firstPost");
//   myPost.update({ title: e.target.value });
// }

//  here what we want to achieve is to get the prices of all the products in that collection
// fetching data

// document.addEventListener("DOMContentLoaded", (event) => {
//   const app = firebase.app();

//   const db = firebase.firestore();
//   const productRef = db.collection("products");

//   //   const query = productRef.where("price", "<", 100);
//   const query = productRef.orderBy("price", "desc").limit(5);

//   //   this forEach is used here is a method from firebase but not the array forEach method
//   query.get().then((products) =>
//     products.forEach((doc) => {
//       const data = doc.data();
//       document.write(`${data.name} at $${data.price} <br />`);
//     })
//   );
// });

// learning about storage uploads this happens mainly images and videos

document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
});

// function uploadFile(files) {
//   // reference a path to that storage bucket
//   const storageRef = firebase.storage().ref();

//   //    static path we call it child
//   const horseRef = storageRef.child("file.jpg");

//   const file = files.item(0);
//   // upload file
//   const task = horseRef.put(file);

//   task.then((snapshot) => {
//     console.log(snapshot);
//     const url = snapshot.downloadURL;
//     document.querySelector("#storageImage").setAttribute("src", url);
//   });
// }

// function uploadFile(files) {
//   // Reference a path to the storage bucket
//   const storageRef = firebase.storage().ref();

//   // Create a unique filename for each upload
//   const fileName = `${Date.now()}_${files[0].name}`;

//   // Reference the file path within the storage bucket
//   const fileRef = storageRef.child(fileName);

//   const file = files[0];

//   // Upload the file
//   const task = fileRef.put(file);
//   // Monitor upload progress
//   task.on(
//     "state_changed",
//     (snapshot) => {
//       // Handle progress, if needed
//     },
//     (error) => {
//       // Handle errors, if any
//       console.error("Error uploading file:", error);
//     },
//     () => {
//       // Upload successful, get the download URL
//       task.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         // Set the src attribute of the image element
//         document
//           .querySelector("#storageImage")
//           .setAttribute("src", downloadURL);
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// }


  // document.getElementById('addMessageButton').addEventListener('click', async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = 
  //     await fetch('http://localhost:5001/addMessage', {
  //       body: JSON.stringify({
  //         text: document.getElementById("content").value,
  //         userId: 'user123'
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //       method: "POST",
  //     });
  //     const data = await response.json()
  //     console.log('Message added:', data);
  //   } catch (error) {
  //     console.error('Error adding message:', error);
  //   }
  // })
  
//   // Import Firebase configuration from firebaseConfig.js inside src folder
// const firebaseConfig = require('./src/firebaseConfig.js');
import {firebaseConfig} from "./src/firebaseConfig.js";
// Initialize Firebase with imported configuration
firebase.initializeApp(firebaseConfig);

const messageText = document.getElementById('messageText');
const userIdInput = document.getElementById('userId');
const sendMessageBtn = document.getElementById('sendMessageBtn');

// since we have used the onCall in the addMessage file 
const addMessage = firebase.functions().httpsCallable('addMessage');

sendMessageBtn.addEventListener('click', () => {
  const message = messageText.value.trim();
  const userId = userIdInput.value.trim();

  if (message && userId){
    // Call the addMessage Cloud Function
    addMessage({ text: message, userId: userId })
    .then((result) => {
      console.log('Message sent successfully:', result.data);
      // You can handle success here, such as displaying a success message to the user
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      // You can handle errors here, such as displaying an error message to the user
    });
    
  } else {
    console.error("Text or user ID is empty");
    // Show error message to user
  }
});
 