const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'kk-KZ'; // Қазақша дауысты тану
recognition.continuous = true; // Фонда үнемі тыңдап тұру

recognition.onresult = (event) => {
    // Ең соңғы айтылған сөзді аламыз
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // X-Gemini есімін тексеру (әр түрлі айтылу нұсқаларымен)
    if (transcript.includes("x-gemini") || transcript.includes("икс джемини") || transcript.includes("икс гемини")) {
        
        statusText.innerText = "X-GEMINI: ТЫҢДАП ТҰРМЫН, СЭР...";
        
        // Командаларды тексеру
        if (transcript.includes("ютуб") || transcript.includes("youtube")) {
            speak("Әрине, сэр. X-Gemini жүйесі YouTube қолданбасын іске қосуда.");
            // Басқа қолданбаларды ашу үшін Sketchware-ге сілтеме:
            window.location.href = "intent://www.youtube.com#Intent;package=com.google.android.youtube;scheme=https;end";
        } 
        else if (transcript.includes("термукс") || transcript.includes("termux")) {
            speak("Термукс терминалы ашылуда, сэр.");
            // Термуксты ашу (Sketchware ішіндегі WebView арқылы істейді)
            if (typeof Android !== "undefined") {
                Android.startApp("com.termux");
            }
        }
        else if (transcript.includes("сәлем") || transcript.includes("привет")) {
            speak("Сәлем, сэр! X-Gemini жүйесі бұйрығыңызды күтуде.");
        }
    }
};

// Дауыспен жауап беру функциясы
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; // Немесе 'en-US', қазақша TTS әлі дамып жатқандықтан
    window.speechSynthesis.speak(utterance);
    statusText.innerText = text;
}

// Микрофон өшіп қалса, автоматты түрде қайта қосылу (Фондық режим үшін маңызды)
recognition.onend = () => {
    recognition.start();
};

// Бірінші рет іске қосу
recognition.start();
