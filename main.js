// Элементтерді байланыстыру
const statusText = document.getElementById('status');
const cmdInput = document.getElementById('cmd-input');
const sendBtn = document.getElementById('send-btn');

// Дыбысты тану жүйесін баптау (Speech Recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'kk-KZ';       // Қазақша дыбысты тану
    recognition.continuous = true;     // Фонда үнемі үзіліссіз тыңдау
    recognition.interimResults = false; // Тек толық айтылған сөзді алу

    // Дауысты таныған кезде орындалатын нәрсе
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        cmdInput.value = transcript; // Айтылған сөзді экрандағы инпутқа жазу
        executeCommand(transcript);   // Команданы өңдеуге жіберу
    };

    // Егер фонда микрофон өшіп қалса, оны автоматты түрде қайта қосу
    recognition.onend = () => {
        try {
            recognition.start();
        } catch (e) {
            console.log("Рекогнішн қайта қосылуда...", e);
        }
    };

    // Жүйе іске қосылғанда тыңдауды бастау
    recognition.start();
} else {
    statusText.innerText = "X-GEMINI: МИКРОФОН ҚОЛДАМАЙДЫ";
}

// Мәтін жазып (->) батырмасын басқанда да істей беретін логика
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        executeCommand(cmdInput.value.toLowerCase());
    });
}

// НАҒЫЗ X-GEMINI БҰЙРЫҚТАРЫН ОРЫНДАУ ФУНКЦИЯСЫ
function executeCommand(cmd) {
    statusText.innerText = "X-GEMINI: ОРЫНДАЛУДА...";
    
    // X-Gemini есімінің кез келген айтылу нұсқасын тексеру
    if (cmd.includes("х гемини") || cmd.includes("x-gemini") || cmd.includes("икс джемини") || cmd.includes("икс гемини")) {
        
        // 1. YouTube ашу
        if (cmd.includes("ютуб") || cmd.includes("youtube")) {
            speak("YouTube ашылып жатыр, сэр");
            if (typeof Android !== "undefined" && Android.startApp) {
                Android.startApp("com.google.android.youtube"); // Sketchware-ге бұйрық
            } else {
                window.location.href = "intent://www.youtube.com#Intent;package=com.google.android.youtube;scheme=https;end";
            }
        }
        
        // 2. Termux ашу
        else if (cmd.includes("термукс") || cmd.includes("termux")) {
            speak("Терминал іске қосылуда, сэр");
            if (typeof Android !== "undefined" && Android.startApp) {
                Android.startApp("com.termux"); // Sketchware арқылы Termux ашу
            } else {
                speak("Бұл бұйрық тек Sketchware ішінде істейді");
            }
        }

        // 3. Telegram ашу
        else if (cmd.includes("телеграм") || cmd.includes("telegram")) {
            speak("Телеграм ашылуда, сэр");
            if (typeof Android !== "undefined" && Android.startApp) {
                Android.startApp("org.telegram.messenger");
            } else {
                window.location.href = "tg://resolve";
            }
        }

        // 4. WhatsApp ашу
        else if (cmd.includes("ватсап") || cmd.includes("whatsapp")) {
            speak("Ватсапты ашып жатырмын");
            if (typeof Android !== "undefined" && Android.startApp) {
                Android.startApp("com.whatsapp");
            } else {
                window.location.href = "whatsapp://";
            }
        }
        
        // 5. Сәлемдесу бұйрығы
        else if (cmd.includes("сәлем") || cmd.includes("привет")) {
            speak("Сәлем, сэр! X-Gemini жүйесі бұйрығыңызды күтуде.");
        }

        // 6. Күйді тексеру
        else if (cmd.includes("жағдай қалай") || cmd.includes("статус")) {
            speak("Барлық жүйелер қалыпты жұмыс істеп тұр, сэр.");
        }
        
        // Егер атын атадың, бірақ команда түсініксіз болса
        else {
            statusText.innerText = "X-GEMINI: БҰЙРЫҚ ТҮСІНІКСІЗ";
        }
    }
}

// ДАУЫСПЕН ЖАУАП БЕРУ ЖҮЙЕСІ (TTS)
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU'; // Қазақша акцент үшін немесе орысша сөздерді оқуға
        utterance.pitch = 0.9;    // Дауысты сәл жуандатып, робот стиліне келтіру (0.1 - 2)
        utterance.rate = 1.0;     // Сөйлеу жылдамдығы
        
        window.speechSynthesis.speak(utterance);
    }
    statusText.innerText = `X-GEMINI: ${text.toUpperCase()}`;
        }
                    
