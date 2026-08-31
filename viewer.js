import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const giftId = urlParams.get('id');

if (giftId) {
    getDoc(doc(db, "gifts", giftId)).then((docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            document.querySelector('.letter-card p').innerText = data.letter;
            document.querySelector('.song-text h3').innerText = data.songTitle;
            document.querySelector('.song-text p').innerText = data.artistName;
            document.getElementById('audio-player').src = data.songUrl;
            
            const polaroids = document.querySelectorAll('.polaroid img');
            if(polaroids.length >= 4) {
                polaroids[0].src = data.photos[0];
                polaroids[1].src = data.photos[1];
                polaroids[2].src = data.photos[2];
                polaroids[3].src = data.photos[3];
            }
        } else {
            console.log("No such gift found!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const questionText = document.getElementById('question-text');

const noTexts = [
    "Wait... are you sure? 🥺",
    "nah that's not right...",
    "try again 😭",
    "be serious...",
    "okay now you're just playing...",
    "okay last chance..."
];

let noCount = 0;
let yesSize = 18;
let yesPadding = 15;

noBtn.addEventListener('click', () => {
    if (noCount < noTexts.length) {
        questionText.innerText = noTexts[noCount];
        noCount++;
        
        yesSize += 10;
        yesPadding += 5;
        yesBtn.style.fontSize = yesSize + 'px';
        yesBtn.style.padding = yesPadding + 'px ' + (yesPadding * 2) + 'px';
        
        const noScale = 1 - (noCount * 0.15);
        noBtn.style.transform = `scale(${noScale})`;
    }
    
    if (noCount === noTexts.length) {
        noBtn.style.display = 'none';
    }
});

yesBtn.addEventListener('click', () => {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('success-container').classList.add('active');
});

window.showScreen = function(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
};

const audio = document.getElementById('audio-player');
const vinyl = document.getElementById('vinyl-record');

if (audio && vinyl) {
    audio.addEventListener('play', () => {
        vinyl.style.animationPlayState = 'running';
    });
    audio.addEventListener('pause', () => {
        vinyl.style.animationPlayState = 'paused';
    });
}
