import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgA0XOLIguqGoXVaHSu3quJuWtVZCSRB4",
  authDomain: "work1-bd13f.firebaseapp.com",
  projectId: "work1-bd13f",
  storageBucket: "work1-bd13f.firebasestorage.app",
  messagingSenderId: "123748250468",
  appId: "1:123748250468:web:f7be9f336dd695ac8dc071",
  measurementId: "G-2KXHCHL9K2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('generator-form');
const submitBtn = form.querySelector('button[type="submit"]');
const outputLink = document.getElementById('output-link');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerText = "Saving Gift... ⏳";
    submitBtn.disabled = true;

    try {
        const docRef = await addDoc(collection(db, "gifts"), {
            letter: document.getElementById('letter-input').value,
            songTitle: document.getElementById('song-title').value,
            artistName: document.getElementById('artist-name').value,
            songUrl: document.getElementById('song-url').value,
           photos: [
                document.getElementById('photo-1').value,
                document.getElementById('photo-2').value,
                document.getElementById('photo-3').value,
                document.getElementById('photo-4').value,
                document.getElementById('cover-photo').value,
                document.getElementById('strip-1').value,
                document.getElementById('strip-2').value,
                document.getElementById('strip-3').value,
                document.getElementById('strip-4').value,
                document.getElementById('strip-5').value,
                document.getElementById('strip-6').value,
                document.getElementById('strip-7').value,
                document.getElementById('strip-8').value
            ],
            createdAt: new Date()
        });

        let baseUrl = window.location.href.split('index.html')[0];
        if (!baseUrl.endsWith('/')) baseUrl += '/';
        const shareLink = `${baseUrl}gift.html?id=${docRef.id}`;

        outputLink.innerHTML = `
            <p style="color: #059669; font-size: 18px; margin-bottom: 10px;">Success! Copy your link below:</p>
            <a href="${shareLink}" target="_blank" style="color: #db2777; word-break: break-all; font-size: 16px; text-decoration: underline;">${shareLink}</a>
        `;
        submitBtn.innerText = "Gift Created! 🎉";

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Error: " + error.message);
        submitBtn.innerText = "Generate My Link";
        submitBtn.disabled = false;
    }
});
