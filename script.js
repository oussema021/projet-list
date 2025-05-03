document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const gameLink = document.getElementById('game-link');
    const gameSection = document.getElementById('game-section');
    const wordDisplay = document.getElementById('word-display');
    const gameInput = document.getElementById('game-input');
    const startGameBtn = document.getElementById('start-game');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    
    // كلمات للعبة
    const gameWords = [
        'كمبيوتر', 'هاتف', 'إنترنت', 'برمجة', 'تطبيق',
        'شاشة', 'لوحة مفاتيح', 'ماوس', 'شبكة', 'بيانات',
        'سيرفر', 'برنامج', 'خوارزمية', 'ذكاء اصطناعي', 'تعلم آلي',
        'واقع افتراضي', 'واقع معزز', 'بلوك تشين', 'عملة رقمية', 'تشفير'
    ];
    
    let currentWord = '';
    let score = 0;
    let timeLeft = 30;
    let timer;
    let gameActive = false;
    
    // البحث
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            alert(`سيتم البحث عن: ${searchInput.value}`);
            // في الواقع هنا سيتم توجيه المستخدم لنتائج البحث
        }
    });
    
    // البحث عند الضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            alert(`سيتم البحث عن: ${searchInput.value}`);
        }
    });
    
    // تمييز صوتي (وهمي في هذا المثال)
    voiceBtn.addEventListener('click', function() {
        alert('التمييز الصوتي غير متاح حالياً. جرب لاحقاً!');
    });
    
    // تبديل قسم اللعبة
    gameLink.addEventListener('click', function(e) {
        e.preventDefault();
        gameSection.classList.toggle('hidden');
    });
    
    // بدء اللعبة
    startGameBtn.addEventListener('click', function() {
        if (!gameActive) {
            startGame();
        } else {
            resetGame();
        }
    });
    
    // التحقق من الإجابة أثناء الكتابة
    gameInput.addEventListener('input', function() {
        if (gameActive && gameInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
            // إجابة صحيحة
            score++;
            scoreDisplay.textContent = score;
            
            // عرض رسالة مؤقتة
            wordDisplay.textContent = 'إجابة صحيحة!';
            wordDisplay.style.color = '#4cc9f0';
            
            // اختيار كلمة جديدة بعد تأخير بسيط
            setTimeout(() => {
                selectRandomWord();
                gameInput.value = '';
            }, 1000);
        }
    });
    
    // بدء اللعبة
    function startGame() {
        gameActive = true;
        score = 0;
        timeLeft = 30;
        
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        
        startGameBtn.textContent = 'إعادة اللعبة';
        gameInput.disabled = false;
        gameInput.focus();
        
        selectRandomWord();
        
        // بدء المؤقت
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // إعادة تعيين اللعبة
    function resetGame() {
        clearInterval(timer);
        gameActive = false;
        
        wordDisplay.textContent = '';
        gameInput.value = '';
        gameInput.disabled = true;
        startGameBtn.textContent = 'ابدأ اللعبة';
    }
    
    // إنهاء اللعبة
    function endGame() {
        clearInterval(timer);
        gameActive = false;
        
        wordDisplay.textContent = `انتهى الوقت! نقاطك: ${score}`;
        wordDisplay.style.color = '#f72585';
        gameInput.disabled = true;
        startGameBtn.textContent = 'ابدأ اللعبة';
    }
    
    // اختيار كلمة عشوائية
    function selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * gameWords.length);
        currentWord = gameWords[randomIndex];
        wordDisplay.textContent = currentWord;
        wordDisplay.style.color = '#f72585';
    }
    
    // تأثيرات إضافية للخلفية
    createFloatingElements();
    
    function createFloatingElements() {
        const background = document.querySelector('.background-animation');
        const colors = ['rgba(76, 201, 240, 0.3)', 'rgba(247, 37, 133, 0.3)', 'rgba(255, 255, 255, 0.2)'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            const size = Math.random() * 20 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            element.style.position = 'absolute';
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.backgroundColor = color;
            element.style.borderRadius = shape === 'circle' ? '50%' : '0';
            element.style.clipPath = shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : '';
            element.style.opacity = '0.7';
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            
            // تأثير الطفو
            element.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            
            background.appendChild(element);
        }
    }
});