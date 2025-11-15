"use client"

import { useState } from "react"
import { useBookContext } from "../../hooks/useBookContext"
import "./BookCard.css"

export function BookCard({ book }) {
  const { updateBook, deleteBook } = useBookContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(book)

  const statusColors = {
    Milik: "#10b981",
    Baca: "#3b82f6",
    Beli: "#f59e0b",
  }

  const handleSave = () => {
    if (editData.title.trim() && editData.author.trim()) {
      updateBook(book.id, editData)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditData(book)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus) => {
    setEditData((prev) => ({ ...prev, status: newStatus }))
  }

  if (isEditing) {
    return (
      <div className="book-card book-card-edit">
        <div className="edit-form">
          <h3>Edit Buku</h3>

          <div className="edit-group">
            <label>Judul</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
              className="edit-input"
            />
          </div>

          <div className="edit-group">
            <label>Penulis</label>
            <input
              type="text"
              value={editData.author}
              onChange={(e) => setEditData((prev) => ({ ...prev, author: e.target.value }))}
              className="edit-input"
            />
          </div>

          <div className="edit-group">
            <label>Status</label>
            <select
              value={editData.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="edit-select"
            >
              <option value="Beli">Ingin Dibeli</option>
              <option value="Milik">Milik Saya</option>
              <option value="Baca">Sudah Dibaca</option>
            </select>
          </div>

          <div className="edit-group">
            <label>Tahun</label>
            <input
              type="number"
              value={editData.year}
              onChange={(e) => setEditData((prev) => ({ ...prev, year: Number.parseInt(e.target.value) }))}
              min="1900"
              className="edit-input"
            />
          </div>

          <div className="edit-buttons">
            <button onClick={handleSave} className="btn-save">
              Simpan
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              Batal
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-card">
      <div className="book-content">
        <div className="book-status" style={{ backgroundColor: statusColors[book.status] }}>
          {book.status}
        </div>

        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>

        <div className="book-meta">
          <span className="meta-item">{book.year}</span>
          <span className="meta-item">{book.dateAdded}</span>
        </div>
      </div>

      <div className="book-actions">
        <button onClick={() => setIsEditing(true)} className="btn-action btn-edit" title="Edit Buku">
          Edit
        </button>
        <button onClick={() => deleteBook(book.id)} className="btn-action btn-delete" title="Hapus Buku">
          Hapus
        </button>
      </div>
    </div>
  )
}
