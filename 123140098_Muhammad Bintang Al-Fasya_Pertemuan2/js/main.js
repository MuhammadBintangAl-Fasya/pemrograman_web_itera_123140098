const dashboard = new Dashboard();

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const weatherContainer = document.getElementById('weather-container');

const updateClock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('id-ID', { hour12: false });
    const date = now.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    timeDisplay.textContent = time;
    dateDisplay.textContent = date;
};

const renderTasks = () => {
    tasksList.innerHTML = '';
    const tasks = dashboard.getTasks();
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} 
                   data-id="${task.id}">
            <span class="item-text">${task.text}</span>
            <div class="item-actions">
                <button class="btn btn-edit btn-small" data-id="${task.id}">Edit</button>
                <button class="btn btn-delete btn-small" data-id="${task.id}">Delete</button>
            </div>
        `;
        
        tasksList.appendChild(li);
    });
};

const renderNotes = () => {
    notesList.innerHTML = '';
    const notes = dashboard.getNotes();
    
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        
        noteCard.innerHTML = `
            <p class="note-text">${note.text}</p>
            <small style="color: var(--text-secondary);">${note.createdAt}</small>
            <div class="note-actions">
                <button class="btn btn-delete btn-small" data-id="${note.id}">Delete</button>
            </div>
        `;
        
        notesList.appendChild(noteCard);
    });
};

const renderWeather = async () => {
    const weather = await dashboard.fetchWeather();
    
    if (weather) {
        const weatherCode = weather.weather_code;
        const weatherDescription = getWeatherDescription(weatherCode);
        
        weatherContainer.innerHTML = `
            <div class="weather-item">
                <strong>Suhu:</strong> ${weather.temperature_2m}°C
            </div>
            <div class="weather-item">
                <strong>Kondisi:</strong> ${weatherDescription}
            </div>
        `;
    } else {
        weatherContainer.innerHTML = '<p>Unable to load weather data</p>';
    }
};

const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Langit cerah',
        1: 'Sebagian besar cerah',
        2: 'Berawan sebagian',
        3: 'Mendung',
        45: 'Berkabut',
        48: 'Kabut dengan embun beku',
        51: 'Gerimis ringan',
        61: 'Hujan ringan',
        71: 'Salju ringan',
        80: 'Hujan deras singkat',
        95: 'Badai petir'
    };
    return descriptions[code] || 'Unknown';
};

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        dashboard.addTask(taskText);
        taskInput.value = '';
        renderTasks();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

addNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        dashboard.addNote(noteText);
        noteInput.value = '';
        renderNotes();
    }
});

noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        addNoteBtn.click();
    }
});

tasksList.addEventListener('click', (e) => {
    const taskId = parseInt(e.target.dataset.id);
    
    if (e.target.classList.contains('checkbox')) {
        dashboard.toggleTask(taskId);
        renderTasks();
    } else if (e.target.classList.contains('btn-edit')) {
        const newText = prompt('Edit task:', dashboard.getTasks().find(t => t.id === taskId).text);
        if (newText) {
            dashboard.editTask(taskId, newText);
            renderTasks();
        }
    } else if (e.target.classList.contains('btn-delete')) {
        if (confirm('Hapus tugas?')) {
            dashboard.deleteTask(taskId);
            renderTasks();
        }
    }
});

notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const noteId = parseInt(e.target.dataset.id);
        if (confirm('Hapus Catatan?')) {
            dashboard.deleteNote(noteId);
            renderNotes();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    renderTasks();
    renderNotes();
    renderWeather();
});