const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("open-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

window.onload = () => {
    if(!sessionStorage.username){ //kalau blm login
        location.href = '/';
    }
}


let exerciseType = '';
let isExercising = false;
let exerciseCount = 0;
let exerciseInterval;


function showExercise(type) {
    const exerciseTitle = document.getElementById('exercise-title');
    const exerciseDescription = document.getElementById('exercise-description');
    const exerciseInstructions = document.getElementById('exercise-instructions');

    if (type === 'pushup') {
        exerciseTitle.innerText = 'Push-Up';
        exerciseDescription.innerText = 'Do push-ups as much as you can in 30 seconds';
    } else if (type === 'situp') {
        exerciseTitle.innerText = 'Sit-Up';
        exerciseDescription.innerText = 'Do sit-ups as much as you can in 30 seconds';
    } else if (type === 'backup') {
        exerciseTitle.innerText = 'Back-Up';
        exerciseDescription.innerText = 'Do back-ups as much as you can in 30 seconds';
    } else if (type === 'squat') {
        exerciseTitle.innerText = 'Squat';
        exerciseDescription.innerText = 'Do squats as much as you can in 30 seconds';
    }

    exerciseType = type;
    exerciseInstructions.style.display = 'block';
}

function startExercise() {
    const exerciseArea = document.getElementById('exercise-area');
    const exerciseStatus = document.getElementById('exercise-status');
    const stopBtn = document.getElementById('stop-btn');
    const timerDisplay = document.getElementById('timer-display');

    exerciseCount = 0;
    isExercising = true;
    exerciseStatus.innerText = 'Exercise is starting...';

    exerciseArea.style.display = 'block';
    stopBtn.style.display = 'inline-block';

    let timeLeft = 30;
    timerDisplay.innerText = `Time left: ${timeLeft} seconds`;

    exerciseInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(exerciseInterval);
            stopExercise();
        }
    }, 1000);
}

function stopExercise() {
    const exerciseStatus = document.getElementById('exercise-status');
    const stopBtn = document.getElementById('stop-btn');

    clearInterval(exerciseInterval);
    isExercising = false;
    exerciseStatus.innerText = 'Exercise done!';
    stopBtn.style.display = 'none';
}


// simpan highest result
let highestResults = {
    pushUps: 0,
    sitUps: 0,
    backUps: 0,
    squats: 0
};

document.getElementById('submitExercise').addEventListener('click', function() {
    const pushUps = parseInt(document.getElementById('pushUps').value) || 0;
    const sitUps = parseInt(document.getElementById('sitUps').value) || 0;
    const backUps = parseInt(document.getElementById('backUps').value) || 0;
    const squats = parseInt(document.getElementById('squats').value) || 0;

    // Send results to the backend
    const username = sessionStorage.username; 

    fetch('/submit-results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            pushUps,
            sitUps,
            backUps,
            squats
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Results updated:', data);
        // Update the displayed results locally
        if (pushUps > highestResults.pushUps) {
            highestResults.pushUps = pushUps;
            document.getElementById('pushUpsResult').textContent = `Push-Ups: ${highestResults.pushUps}`;
        }

        if (sitUps > highestResults.sitUps) {
            highestResults.sitUps = sitUps;
            document.getElementById('sitUpsResult').textContent = `Sit-Ups: ${highestResults.sitUps}`;
        }

        if (backUps > highestResults.backUps) {
            highestResults.backUps = backUps;
            document.getElementById('backUpsResult').textContent = `Back-Ups: ${highestResults.backUps}`;
        }

        if (squats > highestResults.squats) {
            highestResults.squats = squats;
            document.getElementById('squatsResult').textContent = `Squats: ${highestResults.squats}`;
        }
    })
    .catch(error => {
        console.error('Error updating results:', error);
    });
});

