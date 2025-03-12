const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleButton.checked = true; 
}

let timer;
let timeLeft;
const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const startTimerButton = document.getElementById('start-timer');
const pauseTimerButton = document.getElementById('pause-timer');
const resumeTimerButton = document.getElementById('resume-timer');
const resetTimerButton = document.getElementById('reset-timer');

startTimerButton.addEventListener('click', () => {
    timeLeft = parseInt(timerInput.value);
    updateTimerDisplay();
    timer = setInterval(updateTimer, 1000);
});

pauseTimerButton.addEventListener('click', () => {
    clearInterval(timer);
});

resumeTimerButton.addEventListener('click', () => {
    timer = setInterval(updateTimer, 1000);
});

resetTimerButton.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 0;
    updateTimerDisplay();
    document.body.style.backgroundColor = '';
});

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
    } else {
        clearInterval(timer);
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft > 10) {
        document.body.style.backgroundColor = 'green';
    } else if (timeLeft > 5) {
        document.body.style.backgroundColor = 'yellow';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}

const thumbnails = document.querySelectorAll('.thumbnail');
const largeImage = document.getElementById('large-image');
const largeImageContainer = document.getElementById('large-image-container');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        largeImage.src = thumbnail.src;
        largeImage.style.display = 'block';
        largeImageContainer.style.display = 'block'; 
    });
});

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('dblclick', () => {
        largeImage.style.display = 'none';
        largeImageContainer.style.display = 'none'; 
    });
});
const addRowButton = document.getElementById('add-row');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const userTableBody = document.querySelector('#user-table tbody');
addRowButton.addEventListener('click', () => {
    const name = inputName.value.trim();
    const age = inputAge.value.trim();

    if (name && age) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
        });

        userTableBody.appendChild(row);
        inputName.value = '';
        inputAge.value = '';
    }
});

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', () => {
    const rows = Array.from(userTableBody.querySelectorAll('tr'));
    rows.sort((rowA, rowB) => {
        const nameA = rowA.cells[0].textContent.toLowerCase();
        const nameB = rowB.cells[0].textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    rows.forEach(row => userTableBody.appendChild(row));
});

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', () => {
    const rows = Array.from(userTableBody.querySelectorAll('tr'));
    const seenNames = new Set();
    rows.forEach(row => {
        const name = row.cells[0].textContent;
        if (seenNames.has(name)) {
            row.remove();
        } else {
            seenNames.add(name);
        }
    });
});
const reverseButton = document.getElementById('reverse-button');
reverseButton.addEventListener('click', () => {
    const rows = Array.from(userTableBody.querySelectorAll('tr'));
    rows.reverse();
    rows.forEach(row => userTableBody.appendChild(row));
});
