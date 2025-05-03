// البيانات الأساسية
const lessons = {
    beginner: [
        {
            word: "Hello",
            options: ["مرحبًا", "شكرًا", "تفاحة", "قطة"],
            correct: 0
        },
        {
            word: "Apple",
            options: ["تفاحة", "موزة", "قط", "كتاب"],
            correct: 0
        },
        {
            word: "Cat",
            options: ["كلب", "قطة", "طائر", "سمكة"],
            correct: 1
        }
    ]
};

// العناصر DOM
const loginScreen = document.getElementById('login-screen');
const lessonScreen = document.getElementById('lesson-screen');
const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');
const displayUsername = document.getElementById('display-username');
const currentWord = document.getElementById('current-word');
const optionButtons = document.querySelectorAll('.option-btn');
const progressFill = document.getElementById('lesson-progress');
const coinCount = document.getElementById('coin-count');
const feedbackBubble = document.getElementById('feedback-bubble');
const dinoCharacter = document.getElementById('dino-character');

// المتغيرات العامة
let currentUser = null;
let currentLevel = 'beginner';
let currentLesson = 0;
let userCoins = 0;

// تهيئة Firebase (سيتم تعبئتها في firebase.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// بدء التطبيق
startBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        displayUsername.textContent = username;
        loginScreen.classList.add('hidden');
        lessonScreen.classList.remove('hidden');
        loadLesson();
    }
});

// تحميل الدرس
function loadLesson() {
    const lesson = lessons[currentLevel][currentLesson];
    currentWord.textContent = lesson.word;
    
    optionButtons.forEach((btn, index) => {
        btn.textContent = lesson.options[index];
        btn.classList.remove('correct', 'wrong');
        btn.onclick = () => checkAnswer(index, lesson.correct);
    });
}

// التحقق من الإجابة
function checkAnswer(selected, correct) {
    if (selected === correct) {
        optionButtons[selected].classList.add('correct');
        userCoins += 10;
        coinCount.textContent = userCoins;
        showFeedback('أحسنت! 🎉', true);
        
        // تحديث التقدم
        const progress = ((currentLesson + 1) / lessons[currentLevel].length) * 100;
        progressFill.style.width = `${progress}%`;
        
        // الانتقال للدرس التالي
        setTimeout(() => {
            currentLesson++;
            if (currentLesson < lessons[currentLevel].length) {
                loadLesson();
            } else {
                showFeedback('أكملت المستوى! 🏆', true);
                currentLesson = 0;
                loadLesson();
            }
        }, 1500);
    } else {
        optionButtons[selected].classList.add('wrong');
        optionButtons[correct].classList.add('correct');
        showFeedback('حاول مرة أخرى! 💪', false);
    }
}

// عرض التعليقات
function showFeedback(message, isSuccess) {
    feedbackBubble.textContent = message;
    feedbackBubble.style.backgroundColor = isSuccess ? '#06d6a0' : '#ef476f';
    feedbackBubble.classList.add('show');
    
    // تأثير حركة للشخصية
    dinoCharacter.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        dinoCharacter.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        feedbackBubble.classList.remove('show');
    }, 2000);
}

// تفاعل الشخصية
dinoCharacter.addEventListener('click', () => {
    const messages = [
        "استمر في التعلم!",
        "أنت تقوم بعمل رائع!",
        "هل تحتاج إلى مساعدة؟"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    showFeedback(randomMsg, true);
});