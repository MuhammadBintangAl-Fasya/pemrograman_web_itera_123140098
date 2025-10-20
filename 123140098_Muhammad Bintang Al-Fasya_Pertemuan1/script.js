
class TaskManager {
  constructor() {
    this.tasks = [] // Menyimpan daftar tugas
    this.currentFilter = "all" // Filter awal: semua tugas
    this.searchTerm = "" // Kata kunci pencarian
    this.editingId = null 
    this.init() 
  }

  init() {
    this.loadTasks()
    this.setupEventListeners()
    this.render()
  }

  // Ambil data tugas dari localStorage
  loadTasks() {
    const saved = localStorage.getItem("tasks")
    this.tasks = saved ? JSON.parse(saved) : []
  }

  // Simpan data tugas ke localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks))
  }

  // Pasang semua event listener
  setupEventListeners() {
    // Ketika form disubmit
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleAddTask()
    })

    // Input pencarian
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchTerm = e.target.value
      this.render()
    })

    // Tombol filter (semua, aktif, selesai)
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        this.currentFilter = e.target.dataset.filter
        this.render()
      })
    })
  }

  // Validasi input form
  validateForm() {
    const name = document.getElementById("taskName").value.trim()
    const course = document.getElementById("taskCourse").value.trim()
    const deadline = document.getElementById("taskDeadline").value

    let isValid = true

    // Hapus pesan error sebelumnya
    document.getElementById("nameError").textContent = ""
    document.getElementById("courseError").textContent = ""
    document.getElementById("deadlineError").textContent = ""

    // Validasi nama tugas
    if (name.length < 3) {
      document.getElementById("nameError").textContent = "Nama tugas minimal 3 karakter"
      document.getElementById("taskName").classList.add("error")
      isValid = false
    } else {
      document.getElementById("taskName").classList.remove("error")
    }

    // Validasi mata kuliah
    if (course.length < 2) {
      document.getElementById("courseError").textContent = "Mata kuliah minimal 2 karakter"
      document.getElementById("taskCourse").classList.add("error")
      isValid = false
    } else {
      document.getElementById("taskCourse").classList.remove("error")
    }

    // Validasi tenggat waktu
    if (!deadline) {
      document.getElementById("deadlineError").textContent = "Tenggat waktu harus dipilih"
      document.getElementById("taskDeadline").classList.add("error")
      isValid = false
    } else {
      const selectedDate = new Date(deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Cegah tanggal di masa lalu
      if (selectedDate < today) {
        document.getElementById("deadlineError").textContent = "Tenggat waktu tidak boleh di masa lalu"
        document.getElementById("taskDeadline").classList.add("error")
        isValid = false
      } else {
        document.getElementById("taskDeadline").classList.remove("error")
      }
    }

    return isValid
  }

  // Tambah tugas baru
  handleAddTask() {
    if (!this.validateForm()) return

    const name = document.getElementById("taskName").value.trim()
    const course = document.getElementById("taskCourse").value.trim()
    const deadline = document.getElementById("taskDeadline").value

    const task = {
      id: Date.now().toString(), // ID unik berdasarkan waktu
      name,
      course,
      deadline,
      completed: false, // Status awal: belum selesai
      createdAt: new Date().toISOString(),
    }

    this.tasks.unshift(task) // Tambah ke awal daftar
    this.saveTasks() // Simpan ke localStorage
    this.resetForm() // Kosongkan form
    this.render() // Perbarui tampilan
  }

  // Reset form dan hapus error
  resetForm() {
    document.getElementById("taskForm").reset()
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""))
    document.querySelectorAll("input").forEach((el) => el.classList.remove("error"))
  }

  // Ubah status selesai/belum
  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveTasks()
      this.render()
    }
  }

  // Hapus tugas
  deleteTask(id) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveTasks()
      this.render()
    }
  }

  // Edit tugas
  editTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      document.getElementById("taskName").value = task.name
      document.getElementById("taskCourse").value = task.course
      document.getElementById("taskDeadline").value = task.deadline
      this.editingId = id
      document.querySelector(".btn-primary").textContent = "Perbarui Tugas"
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Filter daftar tugas
  getFilteredTasks() {
    return this.tasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.course.toLowerCase().includes(this.searchTerm.toLowerCase())

      if (this.currentFilter === "active") {
        return matchesSearch && !task.completed
      } else if (this.currentFilter === "completed") {
        return matchesSearch && task.completed
      }
      return matchesSearch
    })
  }

  // Format tanggal ke format lokal
  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Cek apakah deadline hari ini
  isToday(dateString) {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Cek apakah tugas terlambat
  isOverdue(dateString, completed) {
    if (completed) return false
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Update jumlah statistik
  updateStats() {
    const total = this.tasks.length
    const incomplete = this.tasks.filter((t) => !t.completed).length
    const completed = this.tasks.filter((t) => t.completed).length

    document.getElementById("totalCount").textContent = total
    document.getElementById("incompleteCount").textContent = incomplete
    document.getElementById("completedCount").textContent = completed
  }

  // Tampilkan daftar tugas
  render() {
    this.updateStats()
    const filteredTasks = this.getFilteredTasks()
    const taskList = document.getElementById("taskList")
    const emptyState = document.getElementById("emptyState")

    // Jika tidak ada tugas
    if (filteredTasks.length === 0) {
      taskList.innerHTML = ""
      emptyState.style.display = "block"
      const message =
        this.tasks.length === 0
          ? "Belum ada tugas. Tambah tugas lah bro, biar hidup menantang!"
          : "Tidak ada tugas yang sesuai dengan filter."
      document.getElementById("emptyMessage").textContent = message
      return
    }

    emptyState.style.display = "none"
    taskList.innerHTML = filteredTasks
      .map((task) => {
        const isOverdue = this.isOverdue(task.deadline, task.completed)
        const isToday = this.isToday(task.deadline)

        return `
          <div class="task-item ${task.completed ? "completed" : ""}">
              <input 
                  type="checkbox" 
                  class="task-checkbox" 
                  ${task.completed ? "checked" : ""}
                  onchange="taskManager.toggleTask('${task.id}')"
              >
              <div class="task-content">
                  <div class="task-name">${this.escapeHtml(task.name)}</div>
                  <div class="task-meta">
                      <div class="task-meta-item">
                          <span>📚</span>
                          <span>${this.escapeHtml(task.course)}</span>
                      </div>
                      <div class="task-meta-item">
                          <span>📅</span>
                          <span>${this.formatDate(task.deadline)}</span>
                      </div>
                  </div>
                  <div>
                      ${isOverdue ? '<span class="task-badge badge-overdue">Terlambat</span>' : ""}
                      ${isToday && !task.completed ? '<span class="task-badge badge-today">Hari Ini</span>' : ""}
                  </div>
              </div>
              <div class="task-actions">
                  <button class="btn-small btn-edit" onclick="taskManager.editTask('${task.id}')">
                      Edit
                  </button>
                  <button class="btn-small btn-delete" onclick="taskManager.deleteTask('${task.id}')">
                      Hapus
                  </button>
              </div>
          </div>
        `
      })
      .join("")
  }

  // Escape HTML untuk mencegah XSS
  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Jalankan aplikasi
const taskManager = new TaskManager()
