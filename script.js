document.addEventListener("DOMContentLoaded", function () {

    // variables for buttons
    const startStopBtn = document.querySelector('#startStopBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const tasksInputs = document.querySelector('.tasks')

    // variables
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    // variables for setInterval & timer status
    let timerInterval = null;
    let timerStatus = 'stopped';

    // add pomo techniques to a simple timer

    function updateTimerAppearance() {
        let currentTime = hours * 60 + minutes; // Corrected calculation
        let timerContainer = document.querySelector('.container');

        if ((currentTime >= 0 && currentTime <= 25) || (currentTime >= 55 && currentTime <= 60)) {
            timerContainer.classList.remove('light-mode');
            timerContainer.classList.add('dark-mode');
        } else {
            timerContainer.classList.remove('dark-mode');
            timerContainer.classList.add('light-mode');
        }
    }

    displayCurrentTaskTitle();

    // Stop watch function 
    function stopWatch() {
        seconds++;

        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
        }

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

        let leadingSeconds = seconds < 10 ? '0' + seconds : seconds;
        let leadingMinutes = minutes < 10 ? '0' + minutes : minutes;
        let leadingHours = hours < 10 ? '0' + hours : hours;

        let displayTimer = document.getElementById('timer');
        displayTimer.innerText = leadingHours + ':' + leadingMinutes + ':' + leadingSeconds;
        displayCurrentTaskTitle();
        updateTimerAppearance();
    }

    // Initial display of the timer
    let displayTimer = document.getElementById('timer');
    displayTimer.innerText = '00:00:00';

    // Start the timer
    // window.setInterval(stopWatch, 1000); 

    startStopBtn.addEventListener('click', function () {
        if (timerStatus === 'stopped') {
            timerInterval = window.setInterval(stopWatch, 1000);
            document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`;
            timerStatus = 'started';
            tasksInputs.classList.add('hidden')
        } else {
            window.clearInterval(timerInterval);
            document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
            timerStatus = "stopped";
            tasksInputs.classList.remove('hidden')
        }

    });

    resetBtn.addEventListener('click', function () {
        window.clearInterval(timerInterval);
        seconds = 0;
        minutes = 0;
        hours = 0;

        document.getElementById('timer').innerHTML = '00:00:00';
        updateTimerAppearance();
        // hide tasks when timer is on
        tasksInputs.classList.remove('hidden')
    });

    // toggle section for tasks

    const sessions = document.getElementsByClassName('session');

    for (let i = 0; i < sessions.length; i++) {
        const sessionTitle = sessions[i].querySelector('.session-title');
        const taskContainer = sessions[i].querySelector('.task-container');

        sessionTitle.addEventListener('click', function () {
            taskContainer.classList.toggle('active');
        });
    }

    // display current task for the session
    function displayCurrentTaskTitle() {
        let currentTaskTitle = document.getElementById('current-task-title');

        if (hours === 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('1-1').value;
        } else if (hours === 0 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('1-2').value;
        } else if (hours === 1 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('1-3').value;
        } else if (hours === 1 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('1-4').value;
        } else if (hours === 2 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('2-1').value;
        } else if (hours === 2 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('2-2').value;
        } else if (hours === 3 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('2-3').value;
        } else if (hours === 3 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('2-4').value;
        } else if (hours === 4 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('3-1').value;
        } else if (hours === 4 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('3-2').value;
        } else if (hours === 5 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('3-3').value;
        } else if (hours === 5 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('3-4').value;
        } else if (hours === 6 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('4-1').value;
        } else if (hours === 6 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('4-2').value;
        } else if (hours === 7 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('4-3').value;
        } else if (hours === 7 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('4-4').value;
        } else {
            currentTaskTitle.innerText = "Take a break";
        }
    }


    // // try and have the inputs saved in some form.

    // // Get a reference to the OK button
    // const okBtn = document.querySelector('#okBtn');

    // // Add an event listener to the OK button
    // okBtn.addEventListener('click', function () {
    //     // Get the values of the inputs and textareas
    //     let taskValues = [];
    //     for (let i = 1; i <= 4; i++) {
    //         for (let j = 1; j <= 4; j++) {
    //             let taskTitle = document.querySelector(`#session-${i}-task-${j}-title`).value;
    //             let taskDescription = document.querySelector(`#session-${i}-task-${j}-description`).value;
    //             taskValues.push({ title: taskTitle, description: taskDescription });
    //         }
    //     }

    //     // Save the values to local storage
    //     localStorage.setItem('tasks', JSON.stringify(taskValues));
    // });

    // // Load saved data from local storage
    // let savedTasks = JSON.parse(localStorage.getItem('tasks'));

    // // Check if there is any saved data
    // if (savedTasks) {
    //     // Populate the inputs and textareas with the saved data
    //     for (let i = 0; i < savedTasks.length; i++) {
    //         let sessionNum = Math.floor(i / 4) + 1;
    //         let taskNum = (i % 4) + 1;
    //         document.querySelector(`#session-${sessionNum}-task-${taskNum}-title`).value = savedTasks[i].title;
    //         document.querySelector(`#session-${sessionNum}-task-${taskNum}-description`).value = savedTasks[i].description;
    //     }



});
