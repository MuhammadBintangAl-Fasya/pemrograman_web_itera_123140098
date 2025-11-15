"use client"

import { useState } from "react"
import { useBookContext } from "../../hooks/useBookContext"
import "./BookForm.css"

export function BookForm() {
  const { addBook } = useBookContext()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "Beli",
    year: new Date().getFullYear(),
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number.parseInt(value) : value,
    }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.author.trim()) {
      setError("Judul dan Penulis harus diisi")
      return
    }

    addBook(formData)
    setFormData({
      title: "",
      author: "",
      status: "Beli",
      year: new Date().getFullYear(),
    })
  }

  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Tambah Buku Baru</h2>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Judul Buku</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Penulis</label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-select">
              <option value="Beli">Ingin Dibeli</option>
              <option value="Milik">Milik Saya</option>
              <option value="Baca">Sudah Dibaca</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Tahun</label>
            <input
              id="year"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="form-button">
          Tambah Buku
        </button>
      </form>
    </div>
  )
}
