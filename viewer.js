import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgA0XOLIguqGoXVaHSu3quJuWtVZCSRB4",
  authDomain: "work1-bd13f.firebaseapp.com",
  projectId: "work1-bd13f",
  storageBucket: "work1-bd13f.firebasestorage.app",
  messagingSenderId: "123748250468",
  appId: "1:123748250468:web:f7be9f336dd695ac8dc071"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function fixLink(url) {
    if (url.includes('drive.google.com/file/d/')) {
        const id = url.split('/d/')[1].split('/')[0];
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }
    return url;
}

async function loadCustomData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) return; 

    try {
        const docRef = doc(db, "gifts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Inject 5 Main Photos
            document.querySelector('.p-left-1 img').src = fixLink(data.photos[0]);
            document.querySelector('.p-left-2 img').src = fixLink(data.photos[1]);
            document.querySelector('.p-right-1 img').src = fixLink(data.photos[2]);
            document.querySelector('.p-right-2 img').src = fixLink(data.photos[3]);
            document.querySelector('.song-bg').src = fixLink(data.photos[4]);

            // Inject 8 Strip Photos
            const stripImgs = document.querySelectorAll('.photostrip img');
            stripImgs.forEach((img, index) => {
                if (data.photos[5 + index]) {
                    img.src = fixLink(data.photos[5 + index]);
                }
            });

            // Inject Text & Audio
            document.querySelector('.song-text h3').innerText = data.songTitle;
            document.querySelector('.song-text p').innerText = data.artistName;
            document.getElementById('audio-player').src = fixLink(data.songUrl);
            
            // Inject Letter
            document.querySelectorAll('.letter-card p')[0].innerText = data.letter;
        }
    } catch (error) {
        console.error("Error loading custom data:", error);
    }
}

loadCustomData();
