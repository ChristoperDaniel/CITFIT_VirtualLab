//untuk interaktivitas tracker.html
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

//start exercise
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

    // timer 30 detik
    let timeLeft = 30;
    timerDisplay.innerText = `Time left: ${timeLeft} seconds`; 

    exerciseInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft} seconds`; 

        if (timeLeft <= 0) {
            clearInterval(exerciseInterval);
            stopExercise();
        }
    }, 1000); // interval 1 detik
}


function stopExercise() {
    const exerciseStatus = document.getElementById('exercise-status');
    const stopBtn = document.getElementById('stop-btn');

    clearInterval(exerciseInterval);
    isExercising = false;
    exerciseStatus.innerText = 'Exercise done!';
    stopBtn.style.display = 'none';
}




//untuk interaktivitas login.html
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Username and password must not be empty.');
        return;
    }

    if (username === 'admin' && password === 'password123') {
        alert('Login successful!');
    } else {
        alert('Invalid username or password.');
    }
});