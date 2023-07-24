document.addEventListener("DOMContentLoaded", function () {

    // DOM element references
    const startStopBtn = document.querySelector('#startStopBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const tasksInputs = document.querySelector('.tasks');
    const compiledTasks = document.querySelector('.task-list-compiled');
    const video = document.querySelector('#iframe-div');

    // Timer variables
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    // Timer variables
    let timerInterval = null;
    let timerStatus = 'stopped';

    // Function to update the appearance of the timer based on the current time
    function updateTimerAppearance() {
        let currentTime = hours * 60 + minutes;
        let timerContainer = document.querySelector('.timer-container');

        // Change timer appearance based on the current time in the Pomodoro technique
        if ((currentTime >= 0 && currentTime <= 25) || (currentTime >= 55 && currentTime <= 60)) {
            timerContainer.classList.remove('light-mode');
            timerContainer.classList.add('dark-mode');
        } else {
            timerContainer.classList.remove('dark-mode');
            timerContainer.classList.add('light-mode');
        }
    }

    // Function to display the current task title for the session
    function displayCurrentTaskTitle() {
        let currentTaskTitle = document.getElementById('current-task-title');

        // Determine the current task based on hours and minutes
        if (hours === 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('1-1').value;
        } else if (hours === 0 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('1-2').value;
        } else if (hours === 1 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('1-3').value;
        } else if (hours === 1 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('1-4').value;
        } else if (hours === 2 && minutes >= 0 && minutes <= 30) { // long break
            currentTaskTitle.innerText = "Take a long break";
        } else if (hours === 2 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('2-1').value;
        } else if (hours === 3 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('2-2').value;
        } else if (hours === 3 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('2-3').value;
        } else if (hours === 4 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('2-4').value;
        } else if (hours === 4 && minutes >= 30 && minutes <= 60) { // long break
            currentTaskTitle.innerText = "Take a long break";
        } else if (hours === 5 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('3-1').value;
        } else if (hours === 5 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('3-2').value;
        } else if (hours === 6 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('3-3').value;
        } else if (hours === 6 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('3-4').value;
        } else if (hours === 7 && minutes >= 0 && minutes <= 30) { // long break
            currentTaskTitle.innerText = "Take a long break";
        } else if (hours === 7 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('4-1').value;
        } else if (hours === 8 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('4-2').value;
        } else if (hours === 8 && minutes >= 30 && minutes <= 55) {
            currentTaskTitle.innerText = document.getElementById('4-3').value;
        } else if (hours === 9 && minutes >= 0 && minutes <= 25) {
            currentTaskTitle.innerText = document.getElementById('4-4').value;
        } else {
            currentTaskTitle.innerText = "Take a break";
        }
    }

    //**************** THE ACTUAL TIMER ******************//

    // Function to update the timer display and current task title
    function stopWatch() {
        seconds++;

        // Increment minutes when seconds reach 60
        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
        }

        // Increment hours when minutes reach 60
        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

        // Add leading zeros to the timer display
        let leadingSeconds = seconds < 10 ? '0' + seconds : seconds;
        let leadingMinutes = minutes < 10 ? '0' + minutes : minutes;
        let leadingHours = hours < 10 ? '0' + hours : hours;

        // Update the timer display with the current time
        let displayTimer = document.getElementById('timer');
        displayTimer.innerText = leadingHours + ':' + leadingMinutes + ':' + leadingSeconds;
        displayCurrentTaskTitle(); // Update the current task title
        updateTimerAppearance(); // Update the appearance of the timer
    }

    // Initial display of the timer
    let displayTimer = document.getElementById('timer');
    displayTimer.innerText = '00:00:00';

    // Start/Stop button event listener
    startStopBtn.addEventListener('click', function () {
        if (timerStatus === 'stopped') {
            // Start the timer interval
            timerInterval = window.setInterval(stopWatch, 1000);
            document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`;
            timerStatus = 'started';

            // Hide tasks when the timer is running
            tasksInputs.classList.add('hidden');
            compiledTasks.classList.add('hidden');
            video.classList.remove('hidden');
        } else {
            // Stop the timer interval
            window.clearInterval(timerInterval);
            document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
            timerStatus = "stopped";

            // Show tasks when the timer is stopped
            tasksInputs.classList.remove('hidden');
            compiledTasks.classList.remove('hidden');
            video.classList.add('hidden');
        }
    });

    // Reset button event listener
    resetBtn.addEventListener('click', function () {
        // Clear the timer interval
        window.clearInterval(timerInterval);
        seconds = 0;
        minutes = 0;
        hours = 0;

        // Reset the timer display
        document.getElementById('timer').innerHTML = '00:00:00';
        updateTimerAppearance(); // Update the appearance of the timer

        // Show tasks when the timer is reset
        tasksInputs.classList.remove('hidden');
    });

    //*************  Toggle section for tasks ****************//

    const sessions = document.getElementsByClassName('session');

    for (let i = 0; i < sessions.length; i++) {
        const sessionTitle = sessions[i].querySelector('.session-title');
        const taskContainer = sessions[i].querySelector('.task-container');

        // Event listener for each session title
        sessionTitle.addEventListener('click', function () {
            // Toggle the active class for the clicked task container
            taskContainer.classList.toggle('active');

            // Hide other task containers when showing the clicked one
            for (let j = 0; j < sessions.length; j++) {
                if (j !== i) {
                    sessions[j].querySelector('.task-container').classList.remove('active');
                }
            }
        });
    }

    //********** STYLING kind of stuff for the form ********/


    // Wrap the entire script in an IIFE to avoid polluting the global scope
    (function () {
        // Get all the textarea elements on the page
        const textareas = document.querySelectorAll('textarea');

        // Loop through each textarea and add event listeners
        textareas.forEach(textarea => {
            const originalPlaceholder = textarea.getAttribute('placeholder');

            // Event listener for when the textarea gains focus
            textarea.addEventListener('focus', function () {
                textarea.setAttribute('placeholder', '*Description is optional but may help to set goals for the task at hand'); // Update the placeholder text
            });

            // Event listener for when the textarea loses focus, revert to OG text
            textarea.addEventListener('blur', function () {
                textarea.setAttribute('placeholder', originalPlaceholder);
            });
        });
    })();



    // Function to handle the form submission for adding tasks
    function handleFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        // Get the index of the task form
        const index = parseInt(event.target.dataset.index);
        const title = titleInputs[index].value;
        const description = descriptionInputs[index].value;

        // Validate the task title
        if (title === '') {
            descriptionInputs[index].innerHTML = '! Please provide a task title atleast... don\'t waste 25min of your life';

            // Set a timer to remove the error message after 3 seconds
            setTimeout(function () {
                descriptionInputs[index].innerHTML = ''; // Remove the error message
                descriptionInputs[index].setAttribute('placeholder', originalPlaceholder); // Restore the original placeholder
            }, 3000);

            return;
        }


        // Determine the session number and add the task to the corresponding container
        const sessionNumber = Math.floor(index / 4) + 1;
        const sessionContainer = document.querySelector(`.session-${sessionNumber}`);

        // Create the task element
        const taskElement = document.createElement('div');

        // Create the "Done" and "Do it Later" radio buttons
        const labelElement1 = document.createElement('label');
        const radioElement1 = document.createElement('input');
        radioElement1.type = 'radio';
        radioElement1.name = 'task' + index;
        radioElement1.value = 'completed';
        labelElement1.appendChild(radioElement1);
        labelElement1.appendChild(document.createTextNode('Done'));

        const labelElement2 = document.createElement('label');
        const radioElement2 = document.createElement('input');
        radioElement2.type = 'radio';
        radioElement2.name = 'task' + index;
        radioElement2.value = 'incomplete';
        labelElement2.appendChild(radioElement2);
        labelElement2.appendChild(document.createTextNode('Do it Later'));

        taskElement.appendChild(labelElement1);
        taskElement.appendChild(labelElement2);

        // Create the title and description elements
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        taskElement.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        descriptionElement.style.display = 'none';


        //************* Radio Button things ******************//


        // Event listeners to show/hide the description on hover
        taskElement.addEventListener('mouseover', function () {
            descriptionElement.style.display = 'block';
        });
        taskElement.addEventListener('mouseout', function () {
            descriptionElement.style.display = 'none';
        });

        // Get the containers for completed and incomplete tasks
        const completedTasks = document.querySelector('.completed-tasks');
        const incompleteTasks = document.querySelector('.incompleted-tasks');

        // Event listeners for the radio buttons to handle completed/incomplete tasks
        radioElement1.addEventListener('change', function () {
            if (this.checked) {
                completedCount[index]++;
                completedTasks.innerHTML += `<div>Task completed: ${title}</div>`;
                taskElement.remove();
                descriptionElement.remove(); // Remove the corresponding description element
                checkSessionCompletion(index);
            }
        });

        radioElement2.addEventListener('change', function () {
            if (this.checked) {
                incompleteCount[index]++;
                incompleteTasks.innerHTML += `<div>Task incomplete: ${title}</div>`;
                taskElement.remove();
                descriptionElement.remove(); // Remove the corresponding description element
                checkSessionCompletion(index);
            }
        });

        // Append the task elements to the session container
        sessionContainer.appendChild(taskElement);
        sessionContainer.appendChild(descriptionElement);

        // Remove the "hidden" class from the session div
        sessionContainer.classList.remove('hidden');

        // Remove the task form from the DOM
        event.target.closest('.task').remove();
    }

    // Function to check session completion and update the session heading
    function checkSessionCompletion(sessionIndex) {
        const sessionNumber = sessionIndex + 1;
        const completedTasksCount = completedCount[sessionIndex];
        const incompleteTasksCount = incompleteCount[sessionIndex];

        if (completedTasksCount + incompleteTasksCount === 4) {
            const sessionHeading = document.querySelector(`.session-${sessionNumber} h1`);
            if (completedTasksCount === 4) {
                sessionHeading.textContent += ' (Completed)';
            } else {
                sessionHeading.textContent += ' (Incomplete)';
            }
            sessionHeading.classList.add('hidden');
        }
    }

    // Array to store completed and incomplete task counts for each session
    const completedCount = [0, 0, 0, 0];
    const incompleteCount = [0, 0, 0, 0];

    // Get references to form elements for task inputs
    const okButtons = document.querySelectorAll('.ok-button');
    const titleInputs = document.querySelectorAll('.title-input');
    const descriptionInputs = document.querySelectorAll('.description-input');

    // Loop through each "OK" button and attach the form submission event listener
    okButtons.forEach(function (okButton, index) {
        okButton.addEventListener('click', handleFormSubmit);
        okButton.dataset.index = index;
    });

    //********** FORM FUNCTIONS ***********//
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach((textarea, index) => {
        textarea.addEventListener('keydown', function (event) {
            // Check if the key pressed is Enter (keyCode 13)
            if (event.keyCode === 13) {
                // Trigger the click event on the corresponding .ok-button
                okButtons[index].click();
            }
        });
    });

    //********** MODAL STUFF ************/

    // modal info array
    const info = [
        {
            id: 1,
            text: "Decision fatigue breeds procrastination, regular breaks lead to clarity of mind and heightened focus. Keep it Simple.. Sexy.",
        },
        {
            id: 2,
            text: 'A minimalist, task organiser, divided into 25 minute pomodoro technique intervals, enter your tasks for the day, the description can be seen if you hover over the task title, but the task cant be changed once commited.',
        }, {
            id: 3,
            text: 'Each session lasts for 2.5hrs, individual task are 25 minutes in length, your current task is displayed above the timer',
        },
        {
            id: 4,
            text: 'Assign tasks at the end of each session as either completed or not, press the "do it later" button to assign your incomplete tasks to another session',
        },
    ];

    // Define a variable to keep track of the current info index
    let currentInfoIndex = 0;

    // Get a reference to the <p> element inside the modal
    const infoTextElement = document.querySelector('#modal p');

    // Function to update the info text in the modal
    function updateInfoText() {
        const currentInfo = info[currentInfoIndex];
        infoTextElement.textContent = currentInfo.text;
    }

    // Call updateInfoText to display the first info object when the page loads
    updateInfoText();

    // Event listeners for the next and prev buttons to update currentInfoIndex and call updateInfoText
    document.querySelector('.next-btn').addEventListener('click', function () {
        currentInfoIndex = (currentInfoIndex + 1) % info.length;
        updateInfoText();
    });

    document.querySelector('.prev-btn').addEventListener('click', function () {
        currentInfoIndex = (currentInfoIndex - 1 + info.length) % info.length;
        updateInfoText();
    });

    // Event listener for the open button to show the modal
    document.querySelector('#open-btn').addEventListener('click', function () {
        document.getElementById('modal-container').style.display = 'flex';
    });

    // Event listener for the close button to hide the modal
    document.querySelector('#close-btn').addEventListener('click', function () {
        document.getElementById('modal-container').style.display = 'none';
    });

}); // End of DOMContentLoaded event listener



// modal info array
const info = [
    {
        id: 1,
        text: "Decision fatigue breeds procrastination, regular breaks lead to clarity of mind and heightened focus. Keep it Simple.. Sexy.",
    },
    {
        id: 2,
        text: 'A minimalist, task organiser, divided into 25 minute pomodoro technique intervals, enter your tasks for the day and add a description if you would like.',
    }, {
        id: 3,
        text: 'Description can be seen if you hover over the task title, but the task cant be changed once commited... You got this.',
    },
    {
        id: 4,
        text: 'Each session lasts for 2.5hrs, individual task are broken with a 5 minute interval to regain focus, you should only worry about the task displayed above the timer',
    },
    {
        id: 5,
        text: 'Assign tasks at the end of each session as either completed or not, press the "do it later" button to assign your incomplete tasks to another session',
    },
];


const kSpan = document.getElementById('keep');
const iSpan = document.getElementById('it');
const sSpan = document.getElementById('simple');
const sexySpan = document.getElementById('sexy');

kSpan.addEventListener('mouseenter', function () {
    kSpan.textContent = 'Keep';
});
kSpan.addEventListener('mouseleave', function () {
    kSpan.textContent = 'K';
});

iSpan.addEventListener('mouseenter', function () {
    iSpan.textContent = 'it';
});
iSpan.addEventListener('mouseleave', function () {
    iSpan.textContent = 'I';
});

sSpan.addEventListener('mouseenter', function () {
    sSpan.textContent = 'Simple';
});
sSpan.addEventListener('mouseleave', function () {
    sSpan.textContent = 'S';
});

sexySpan.addEventListener('mouseenter', function () {
    sexySpan.textContent = 'Sexy';
});
sexySpan.addEventListener('mouseleave', function () {
    sexySpan.textContent = 'S';
});
