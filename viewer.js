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

// Converts Dropbox and Google Drive links to direct streaming/image links
function fixLink(url) {
    if (!url) return '';
    
    // Dropbox conversion
    if (url.includes('dropbox.com')) {
        let cleanUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        cleanUrl = cleanUrl.replace('?dl=0', '').replace('&dl=0', '');
        return cleanUrl;
    }
    
    // Google Drive conversion
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

            // Inject 4 Polaroids & 1 Song Cover Photo
            if (data.photos && data.photos.length > 0) {
                if (document.querySelector('.p-left-1 img')) document.querySelector('.p-left-1 img').src = fixLink(data.photos[0]);
                if (document.querySelector('.p-left-2 img')) document.querySelector('.p-left-2 img').src = fixLink(data.photos[1]);
                if (document.querySelector('.p-right-1 img')) document.querySelector('.p-right-1 img').src = fixLink(data.photos[2]);
                if (document.querySelector('.p-right-2 img')) document.querySelector('.p-right-2 img').src = fixLink(data.photos[3]);
                if (document.querySelector('.song-bg')) document.querySelector('.song-bg').src = fixLink(data.photos[4]);

                // Inject 8 Strip Photos (falling back to outer photos if not provided)
                const stripImgs = document.querySelectorAll('.photostrip img');
                stripImgs.forEach((img, index) => {
                    const photoSrc = data.photos[5 + index] || data.photos[index % 4];
                    img.src = fixLink(photoSrc);
                });
            }

            // Inject Text & Audio
            if (data.songTitle && document.querySelector('.song-text h3')) {
                document.querySelector('.song-text h3').innerText = data.songTitle;
            }
            if (data.artistName && document.querySelector('.song-text p')) {
                document.querySelector('.song-text p').innerText = data.artistName;
            }
            if (data.songUrl && document.getElementById('audio-player')) {
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = fixLink(data.songUrl);
                audioPlayer.load();
            }
            
            // Inject Letter
            if (data.letter && document.querySelectorAll('.letter-card p')[0]) {
                document.querySelectorAll('.letter-card p')[0].innerText = data.letter;
            }
        }
    } catch (error) {
        console.error("Error loading custom data:", error);
    }
}

loadCustomData();
