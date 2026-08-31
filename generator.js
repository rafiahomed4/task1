import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// REPLACE THIS OBJECT WITH YOUR FIREBASE CONFIG KEYS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('generator-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable button to prevent double-clicks
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerText = "Generating...";
    submitBtn.disabled = true;

    const giftData = {
        letter: document.getElementById('letter-input').value,
        songTitle: document.getElementById('song-title').value,
        artistName: document.getElementById('artist-name').value,
        songUrl: document.getElementById('song-url').value,
        photos: [
            document.getElementById('photo-1').value,
            document.getElementById('photo-2').value,
            document.getElementById('photo-3').value,
            document.getElementById('photo-4').value
        ]
    };

    try {
        // Save to Firestore 'gifts' collection
        const docRef = await addDoc(collection(db, "gifts"), giftData);
        
        // Build the shareable link using the generated document ID
        const baseUrl = window.location.href.replace('index.html', '');
        const shareLink = `${baseUrl}gift.html?id=${docRef.id}`;
        
        document.getElementById('output-section').style.display = 'block';
        document.getElementById('generated-link').value = shareLink;
        submitBtn.innerText = "Done!";
    } catch (error) {
        console.error("Error adding document: ", error);
        submitBtn.innerText = "Error - Try Again";
        submitBtn.disabled = false;
    }
});
