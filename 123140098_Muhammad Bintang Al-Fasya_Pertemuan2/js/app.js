class Dashboard {
    constructor() {
        this.tasks = this.loadFromStorage('tasks') || [];
        this.notes = this.loadFromStorage('notes') || [];
        this.weatherData = null;
    }

    loadFromStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    saveToStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        this.tasks.unshift(task);
        this.saveToStorage('tasks', this.tasks);
        return task;
    }

    editTask(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            this.saveToStorage('tasks', this.tasks);
        }
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToStorage('tasks', this.tasks);
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage('tasks', this.tasks);
        }
        return task;
    }

    addNote(noteText) {
        const note = {
            id: Date.now(),
            text: noteText,
            createdAt: new Date().toLocaleString()
        };
        this.notes.unshift(note);
        this.saveToStorage('notes', this.notes);
        return note;
    }

    deleteNote(id) {
        this.notes = this.notes.filter(n => n.id !== id);
        this.saveToStorage('notes', this.notes);
    }

    async fetchWeather() {
        try {
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current=temperature_2m,weather_code,wind_speed_10m'
            );
            const data = await response.json();
            this.weatherData = data.current;
            return this.weatherData;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    }

    getTasks() {
        return this.tasks;
    }

    getNotes() {
        return this.notes;
    }
}