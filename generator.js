import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
const storage = getStorage(app);

const form = document.getElementById('generator-form');
const submitBtn = form.querySelector('button[type="submit"]');
const outputLink = document.getElementById('output-link');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerText = "Uploading to Database... ⏳";
    submitBtn.disabled = true;

    try {
        const letter = document.getElementById('letter-input').value;
        const songTitle = document.getElementById('song-title').value;
        const artistName = document.getElementById('artist-name').value;
        const photosInput = document.getElementById('photos-upload');
        const songInput = document.getElementById('song-upload');

        if (photosInput.files.length === 0 || songInput.files.length === 0) {
            throw new Error("Please select both photos and a song.");
        }

        const songFile = songInput.files[0];
        const songRef = ref(storage, `songs/${Date.now()}_${songFile.name}`);
        await uploadBytes(songRef, songFile);
        const songUrl = await getDownloadURL(songRef);

        const photoUrls = [];
        for (let i = 0; i < photosInput.files.length; i++) {
            const photoFile = photosInput.files[i];
            const photoRef = ref(storage, `photos/${Date.now()}_${photoFile.name}`);
            await uploadBytes(photoRef, photoFile);
            const url = await getDownloadURL(photoRef);
            photoUrls.push(url);
        }

        const docRef = await addDoc(collection(db, "gifts"), {
            letter: letter,
            songTitle: songTitle,
            artistName: artistName,
            songUrl: songUrl,
            photoUrls: photoUrls,
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
