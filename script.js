/* ==========================================================================
   QUIZ COMPONENT
   ========================================================================== */

const quizData = [
    {
        question: "HTML stands for?",
        options: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false }
        ]
    },
    {
        question: "Which programming language is natively supported by web browsers?",
        options: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        options: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to define internal styling?",
        options: [
            { text: "&lt;css&gt;", correct: false },
            { text: "&lt;style&gt;", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

function loadQuizQuestion() {
    const questionEl = document.getElementById("quizQuestion");
    const optionsContainer = document.getElementById("quizOptions");
    const statusEl = document.getElementById("quizStatus");
    const progressFill = document.getElementById("quizProgressFill");
    const resultEl = document.getElementById("quizResult");
    const resetBtn = document.getElementById("quizResetBtn");

    // Hide result block and reset button
    resultEl.style.display = "none";
    resultEl.className = "";
    resultEl.innerHTML = "";
    resetBtn.style.display = "none";

    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.innerHTML = currentQuestion.question;

    // Set progress bar
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Set question tracker status
    statusEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    // Render option buttons
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.id = `quiz-opt-${idx}`;
        btn.className = "quiz-btn";
        btn.innerHTML = `
            <span>${opt.text}</span>
            <i class="fa-regular fa-circle"></i>
        `;
        btn.onclick = () => selectQuizOption(idx, opt.correct);
        optionsContainer.appendChild(btn);
    });
}

function selectQuizOption(selectedIndex, isCorrect) {
    const optionsContainer = document.getElementById("quizOptions");
    const buttons = optionsContainer.getElementsByTagName("button");
    const resultEl = document.getElementById("quizResult");
    const progressFill = document.getElementById("quizProgressFill");
    
    // Disable all options
    for (let btn of buttons) {
        btn.disabled = true;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    const selectedBtn = document.getElementById(`quiz-opt-${selectedIndex}`);

    // Update progress fill to represent completed answer state
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        selectedBtn.querySelector("i").className = "fa-solid fa-circle-check";
        quizScore++;
        
        resultEl.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 5px;"><i class="fa-solid fa-square-check"></i> Correct!</div>
            <p style="font-size: 0.85rem; opacity: 0.9;">Great job! You got it right.</p>
        `;
        resultEl.className = "success";
    } else {
        selectedBtn.classList.add("incorrect");
        selectedBtn.querySelector("i").className = "fa-solid fa-circle-xmark";

        // Highlight correct option in green
        currentQuestion.options.forEach((opt, idx) => {
            if (opt.correct) {
                const correctBtn = document.getElementById(`quiz-opt-${idx}`);
                correctBtn.classList.add("correct");
                correctBtn.querySelector("i").className = "fa-solid fa-circle-check";
            }
        });

        // Get correct answer text
        const correctText = currentQuestion.options.find(opt => opt.correct).text;
        resultEl.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 5px;"><i class="fa-solid fa-triangle-exclamation"></i> Incorrect</div>
            <p style="font-size: 0.85rem; opacity: 0.9;">Correct answer: <strong>${correctText}</strong></p>
        `;
        resultEl.className = "error";
    }

    // Append next question controls to the feedback container
    const actionArea = document.createElement("div");
    actionArea.style.marginTop = "12px";
    
    const isLastQuestion = currentQuestionIndex === quizData.length - 1;
    const actionBtn = document.createElement("button");
    actionBtn.className = "quiz-reset-btn";
    actionBtn.style.display = "block";
    actionBtn.style.marginTop = "0px";
    
    if (isLastQuestion) {
        actionBtn.innerHTML = `Complete Quiz <i class="fa-solid fa-square-poll-horizontal" style="margin-left: 5px;"></i>`;
        actionBtn.onclick = showQuizResults;
    } else {
        actionBtn.innerHTML = `Next Question <i class="fa-solid fa-chevron-right" style="margin-left: 5px;"></i>`;
        actionBtn.onclick = () => {
            currentQuestionIndex++;
            loadQuizQuestion();
        };
    }
    actionArea.appendChild(actionBtn);
    resultEl.appendChild(actionArea);
    resultEl.style.display = "block";
}

function showQuizResults() {
    const questionEl = document.getElementById("quizQuestion");
    const optionsContainer = document.getElementById("quizOptions");
    const statusEl = document.getElementById("quizStatus");
    const scoreDisplay = document.getElementById("quizScoreDisplay");
    const resultEl = document.getElementById("quizResult");
    const resetBtn = document.getElementById("quizResetBtn");

    optionsContainer.innerHTML = "";
    questionEl.innerHTML = "Quiz Completed!";
    statusEl.innerText = "Results Summary";
    
    // Display score header
    scoreDisplay.innerText = `Final Score: ${quizScore}/${quizData.length}`;
    scoreDisplay.style.display = "inline";

    let summaryText = "";
    let summaryClass = "";

    if (quizScore === quizData.length) {
        summaryText = `🎉 Perfect score! You're a true Web Development expert. Ready for the advanced track!`;
        summaryClass = "success";
    } else if (quizScore >= 2) {
        summaryText = `👍 Good job! You got ${quizScore} out of ${quizData.length} correct. Keep studying to reach 100%!`;
        summaryClass = "success";
    } else {
        summaryText = `📚 Time to review! You got ${quizScore} out of ${quizData.length}. Review web technologies and try again.`;
        summaryClass = "error";
    }

    resultEl.innerHTML = `<p>${summaryText}</p>`;
    resultEl.className = summaryClass;
    resultEl.style.display = "block";

    // Show the restart button
    resetBtn.style.display = "block";
}

function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    
    const scoreDisplay = document.getElementById("quizScoreDisplay");
    scoreDisplay.style.display = "none";
    scoreDisplay.innerText = "";
    
    loadQuizQuestion();
}


/* ==========================================================================
   IMAGE CAROUSEL & WEATHER SYNC COMPONENT
   ========================================================================== */

const slides = [
    {
        city: "London",
        country: "United Kingdom",
        image: "images/london.png",
        lat: 51.5074,
        lon: -0.1278
    },
    {
        city: "Tokyo",
        country: "Japan",
        image: "images/tokyo.png",
        lat: 35.6762,
        lon: 139.6503
    },
    {
        city: "Paris",
        country: "France",
        image: "images/paris.png",
        lat: 48.8566,
        lon: 2.3522
    },
    {
        city: "New York",
        country: "United States",
        image: "images/new_york.png",
        lat: 40.7128,
        lon: -74.0060
    }
];

let currentSlideIndex = 0;

function updateCarousel() {
    const slider = document.getElementById("slider");
    const caption = document.getElementById("carouselCaption");
    const cityTitle = document.getElementById("weatherCityTitle");
    const activeSlide = slides[currentSlideIndex];

    // Fade out elements
    slider.style.opacity = 0;
    caption.style.opacity = 0;

    setTimeout(() => {
        // Change slide image and details
        slider.src = activeSlide.image;
        slider.alt = `Landscape of ${activeSlide.city}`;
        
        document.getElementById("captionCity").innerText = activeSlide.city;
        document.getElementById("captionCountry").innerText = activeSlide.country;
        
        // Update live weather title to sync locations
        cityTitle.innerText = `${activeSlide.city}, ${activeSlide.country}`;
        
        updateDots();

        // Fade elements back in
        slider.style.opacity = 1;
        caption.style.opacity = 1;

        // Auto-fetch weather for the active city location
        fetchActiveCityWeather();
    }, 300);
}

function nextImage() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    updateCarousel();
}

function prevImage() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    updateCarousel();
}

function setCurrentImage(idx) {
    if (idx >= 0 && idx < slides.length && idx !== currentSlideIndex) {
        currentSlideIndex = idx;
        updateCarousel();
    }
}

function updateDots() {
    const dotsContainer = document.getElementById("carouselDots");
    const dots = dotsContainer.getElementsByClassName("dot");
    
    for (let i = 0; i < dots.length; i++) {
        if (i === currentSlideIndex) {
            dots[i].classList.add("active");
        } else {
            dots[i].classList.remove("active");
        }
    }
}


/* ==========================================================================
   WEATHER FORECAST COMPONENT (DYNAMIC SYNC)
   ========================================================================== */

const weatherCodeMap = {
    0: { desc: "Clear Sky", icon: "fa-sun" },
    1: { desc: "Mainly Clear", icon: "fa-cloud-sun" },
    2: { desc: "Partly Cloudy", icon: "fa-cloud-sun" },
    3: { desc: "Overcast", icon: "fa-cloud" },
    45: { desc: "Foggy", icon: "fa-smog" },
    48: { desc: "Depositing Rime Fog", icon: "fa-smog" },
    51: { desc: "Light Drizzle", icon: "fa-cloud-rain" },
    53: { desc: "Moderate Drizzle", icon: "fa-cloud-rain" },
    55: { desc: "Dense Drizzle", icon: "fa-cloud-rain" },
    61: { desc: "Slight Rain", icon: "fa-cloud-showers-water" },
    63: { desc: "Moderate Rain", icon: "fa-cloud-showers-heavy" },
    65: { desc: "Heavy Rain", icon: "fa-cloud-showers-heavy" },
    71: { desc: "Slight Snowfall", icon: "fa-snowflake" },
    73: { desc: "Moderate Snowfall", icon: "fa-snowflake" },
    75: { desc: "Heavy Snowfall", icon: "fa-snowflake" },
    80: { desc: "Slight Rain Showers", icon: "fa-cloud-sun-rain" },
    81: { desc: "Moderate Rain Showers", icon: "fa-cloud-showers-heavy" },
    82: { desc: "Violent Rain Showers", icon: "fa-cloud-showers-heavy" },
    95: { desc: "Thunderstorm", icon: "fa-cloud-bolt" }
};

async function fetchActiveCityWeather() {
    const weatherContainer = document.getElementById("weatherData");
    const syncIcon = document.querySelector("#weatherSyncBtn i");
    const activeSlide = slides[currentSlideIndex];

    // Trigger spinning animation on sync icon
    if (syncIcon) {
        syncIcon.classList.add("fa-spin");
    }

    // If weatherData container is empty or hidden, provide clean feedback
    weatherContainer.style.display = "block";
    weatherContainer.innerHTML = `
        <div class="weather-info" style="display:flex; justify-content:center; align-items:center; min-height:162px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--accent-secondary);"></i>
        </div>
    `;

    try {
        // Fetch weather for active carousel slide coordinates
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeSlide.lat}&longitude=${activeSlide.lon}&current_weather=true`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather service unreachable");
        }

        const data = await response.json();
        const cw = data.current_weather;
        
        // Map meteorological weather code
        const codeInfo = weatherCodeMap[cw.weathercode] || { desc: "Weather Conditions", icon: "fa-thermometer-half" };
        
        // Apply color glow to sunny days
        const isSunny = cw.weathercode === 0;
        const iconColor = isSunny ? "#fbbf24" : "var(--text-main)";

        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-main">
                    <span class="weather-icon" style="color: ${iconColor};">
                        <i class="fa-solid ${codeInfo.icon}"></i>
                    </span>
                    <span class="weather-temp">${Math.round(cw.temperature)}°C</span>
                </div>
                <p class="weather-desc">${codeInfo.desc}</p>
                <div class="weather-details">
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Wind Speed</div>
                        <div class="weather-detail-val">${cw.windspeed} km/h</div>
                    </div>
                    <div class="weather-detail-item">
                        <div class="weather-detail-label">Wind Direction</div>
                        <div class="weather-detail-val">${cw.winddirection}°</div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Sync Weather Error:", error);
        weatherContainer.innerHTML = `
            <div class="weather-info" style="border-color: var(--accent-danger);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; color: var(--accent-danger); margin-bottom: 10px;"></i>
                <p style="color: var(--accent-danger); font-weight:600;">Error Loading Weather</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top:5px;">Please check your internet connection and try again.</p>
            </div>
        `;
    } finally {
        if (syncIcon) {
            syncIcon.classList.remove("fa-spin");
        }
    }
}


/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    loadQuizQuestion();
    updateCarousel();
}