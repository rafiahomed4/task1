import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgA0XOLiguqGoXVaHSu3quJuWtVZCSRB4",
  authDomain: "work1-bd13f.firebaseapp.com",
  projectId: "work1-bd13f",
  storageBucket: "work1-bd13f.firebasestorage.app",
  messagingSenderId: "123748250468",
  appId: "1:123748250468:web:f7be9f336dd695ac8dc071",
  measurementId: "G-2KXHCHL9K2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('generator-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
        const docRef = await addDoc(collection(db, "gifts"), giftData);
        const baseUrl = window.location.href.split('index.html')[0];
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
