const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let cardWidth = 410;
const gap = 30;
let visibleSlides = 3;
let index = 0;

const totalSlides = document.querySelectorAll('.service-card').length;
console.log("total slides " + totalSlides);
let maxIndex = Math.max(0, totalSlides - visibleSlides);
console.log("maxindex " + maxIndex);

function updateCardWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
        cardWidth = screenWidth-10; // Адаптивная ширина
        visibleSlides = 1;
    } else if (screenWidth <= 768) {
        cardWidth = screenWidth / 2 - 30;
        visibleSlides = 2;
    } else if (screenWidth <= 1024) {
        cardWidth = screenWidth / 2.5 - 30;
        visibleSlides = 2;
    } else if (screenWidth <= 1200) {
        cardWidth = screenWidth / 3 - 30;
        visibleSlides = 3;
    } else {
        cardWidth = 410;
        visibleSlides = 3;
    }

    maxIndex = Math.max(0, totalSlides - visibleSlides);
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.width = `${cardWidth}px`;
    });

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.style.width = `${visibleSlides * (cardWidth + gap) - gap}px`;

    updateCarousel();
    createIndicators();
}

function updateButtonSize(screenWidth) {
    let buttonSize = 50;
    if (screenWidth <= 768) {
        buttonSize = 40;
    } else if (screenWidth <= 480) {
        buttonSize = 30;
    }
    prevButton.style.width = `${buttonSize}px`;
    prevButton.style.height = `${buttonSize}px`;
    nextButton.style.width = `${buttonSize}px`;
    nextButton.style.height = `${buttonSize}px`;
}

function updateCarousel() {
    const offset = -(index * (cardWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
    updateIndicators();
    updateButtons();
}

let timer;

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
}

function nextSlide() {
    if (index < maxIndex) {
        index += 1;
    } else {
        index = 0;
    }
    updateCarousel();
    resetTimer();
}

function prevSlide() {
    if (index > 0) {
        index -= 1;
    } else {
        index = maxIndex;
    }
    updateCarousel();
    resetTimer();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function updateButtons() {
    /*prevButton.disabled = index === 0;
    nextButton.disabled = index === maxIndex;*/

    if (prevButton.disabled) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    if (nextButton.disabled) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

function createIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (i === index) dot.classList.add('active');
        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
            resetTimer();
        });
        indicatorsContainer.appendChild(dot);
    }
    updateIndicators();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
window.addEventListener('resize', updateCardWidth);

resetTimer();
updateCardWidth();
createIndicators();
