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

if (noBtn) {
    noBtn.addEventListener('click', () => {
        if (noCount < noTexts.length) {
            questionText.innerText = noTexts[noCount];
            noCount++;
            
            // Make YES button larger and NO button smaller
            yesSize += 10;
            yesPadding += 5;
            yesBtn.style.fontSize = yesSize + 'px';
            yesBtn.style.padding = yesPadding + 'px ' + (yesPadding * 2) + 'px';
            
            const noScale = 1 - (noCount * 0.15);
            noBtn.style.transform = `scale(${noScale})`;
        }
        
        if (noCount === noTexts.length) {
            noBtn.style.display = 'none'; // Hide NO button entirely
        }
    });
}

// FORCE the function to be global so the HTML can see it
window.showScreen = function(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
};

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        window.showScreen('success-container');
    });
}

// Vinyl Spin Logic
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
