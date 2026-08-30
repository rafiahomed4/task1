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
    showScreen('success-container');
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

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