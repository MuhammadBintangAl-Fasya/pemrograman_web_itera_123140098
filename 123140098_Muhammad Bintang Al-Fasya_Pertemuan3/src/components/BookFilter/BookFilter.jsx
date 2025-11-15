"use client"
import { useBookContext } from "../../hooks/useBookContext"
import "./BookFilter.css"

export function BookFilter() {
  const { filterStatus, setFilterStatus, searchTerm, setSearchTerm } = useBookContext()

  const statuses = ["Semua", "Milik", "Baca", "Beli"]

  return (
    <div className="filter-container">
      <div className="max-width-container">
        <div className="search-group">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau penulis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Filter Status:</label>
          <div className="filter-buttons">
            {statuses.map((status) => (
              <button
                key={status}
                className={`filter-button ${filterStatus === status ? "active" : ""}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
