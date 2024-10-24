// Menyimpan status latihan
let exerciseType = '';
let isExercising = false;
let exerciseCount = 0;
let exerciseInterval;

// Fungsi untuk menampilkan jenis olahraga yang dipilih
function showExercise(type) {
    // Mendefinisikan judul dan deskripsi berdasarkan jenis olahraga
    const exerciseTitle = document.getElementById('exercise-title');
    const exerciseDescription = document.getElementById('exercise-description');
    const exerciseInstructions = document.getElementById('exercise-instructions');
    
    if (type === 'lari') {
        exerciseTitle.innerText = 'Lari';
        exerciseDescription.innerText = 'Lakukan jogging atau lari dengan kecepatan stabil selama 10 menit. Latihan ini akan membantu meningkatkan daya tahan tubuh.';
    } else if (type === 'pushup') {
        exerciseTitle.innerText = 'Push-Up';
        exerciseDescription.innerText = 'Lakukan push-up sebanyak mungkin dalam 30 detik. Latihan ini meningkatkan kekuatan otot dada dan lengan.';
    } else if (type === 'basket') {
        exerciseTitle.innerText = 'Basket';
        exerciseDescription.innerText = 'Lakukan dribble bola basket selama 5 menit. Latihan ini membantu meningkatkan koordinasi tangan dan bola.';
    }

    // Simpan jenis olahraga yang dipilih
    exerciseType = type;

    // Menampilkan instruksi latihan
    exerciseInstructions.style.display = 'block';
}

// Fungsi untuk memulai latihan
function startExercise() {
    const exerciseArea = document.getElementById('exercise-area');
    const exerciseStatus = document.getElementById('exercise-status');
    const exerciseCounter = document.getElementById('exercise-counter');
    const stopBtn = document.getElementById('stop-btn');

    // Reset status latihan
    exerciseCount = 0;
    isExercising = true;
    exerciseCounter.innerText = 'Jumlah repetisi: 0';
    exerciseStatus.innerText = 'Latihan sedang berjalan...';

    // Menampilkan area latihan
    exerciseArea.style.display = 'block';
    stopBtn.style.display = 'inline-block';

    // Simulasi latihan dengan interval waktu (misalnya 1 repetisi setiap 2 detik)
    exerciseInterval = setInterval(() => {
        if (isExercising) {
            exerciseCount++;
            exerciseCounter.innerText = `Jumlah repetisi: ${exerciseCount}`;
        }
    }, 2000); // Setiap 2 detik menghitung 1 repetisi
}

// Fungsi untuk menghentikan latihan
function stopExercise() {
    const exerciseStatus = document.getElementById('exercise-status');
    const stopBtn = document.getElementById('stop-btn');

    // Menghentikan latihan dan menghapus interval
    clearInterval(exerciseInterval);
    isExercising = false;
    exerciseStatus.innerText = 'Latihan selesai!';
    stopBtn.style.display = 'none';
}