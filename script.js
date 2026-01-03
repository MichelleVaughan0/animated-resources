const steps = document.querySelectorAll(".step");
const trackingWrapper = document.getElementById("trackingWrapper");
const error404 = document.getElementById("error404");

let current = parseInt(localStorage.getItem("trackingStep")) || 0;

steps.forEach((step, index) => {
    if (index < current) step.classList.add("completed");
    if (index === current) step.classList.add("active");
});

function setState() {

    animation[current].stop();
    animation[current].goToAndStop(0, true);

    if (current < steps.length - 1) {

        steps[current].classList.remove("active");
        steps[current].classList.add("completed");

        current++;
        updateProgress();

        steps[current].classList.add("active");
        localStorage.setItem("trackingStep", current);

        animation[current].play();

    } else {
        clearInterval(timer);
        localStorage.removeItem("trackingStep");

        trackingWrapper.style.display = "none";
        error404.style.display = "block";
        animation404.play();

        setTimeout(resetTracking, 6000);
    }
}

function resetTracking() {
    tracker.style.setProperty("--progress", "0%");
    current = 0;
    localStorage.removeItem("trackingStep");

    steps.forEach((step) => {
        step.classList.remove("active");
        step.classList.remove("completed");
    });

    steps[0].classList.add("active");

    animation.forEach((anim) => {
        anim.stop();
        anim.goToAndStop(0, true);
    });

    animation[0].play();
    
    animation404.stop();
    animation404.goToAndStop(0, true);

    error404.style.display = "none";
    trackingWrapper.style.display = "block";

    timer = setInterval(setState, 2400);
}

let timer = setInterval(setState, 2400);


function updateProgress() {
    const tracker = document.getElementById("tracker");
    const total = steps.length - 1;
    const percent = (current / total) * 100;

    tracker.style.setProperty("--progress", `${percent}%`);
}


const animation = [
    lottie.loadAnimation({
        container: document.getElementById('lottie-recibido'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/STEP1/data.json'
    }),

    lottie.loadAnimation({
        container: document.getElementById('lottie-pago'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/STEP2/data.json'
    }),

    lottie.loadAnimation({
        container: document.getElementById('lottie-preparando'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/STEP3/data.json'
    }),

    lottie.loadAnimation({
        container: document.getElementById('lottie-reparto'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/STEP4/data.json'
    }),

    lottie.loadAnimation({
        container: document.getElementById('lottie-entregado'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'assets/STEP5/data.json'
    })
];

animation[current].play();
updateProgress();

const animation404 = lottie.loadAnimation({
    container: document.getElementById('lottie-error'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'assets/ERROR/data.json'
});

/* Responsive: horizontal en desktop */
if (window.innerWidth > 900) {
    document.getElementById("tracker").className = "tracker horizontal";
}