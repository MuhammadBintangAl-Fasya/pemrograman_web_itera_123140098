import { useBookContext } from "../../hooks/useBookContext"
import "./Stats.css"

export function Stats() {
  const { allBooks } = useBookContext()

  const stats = {
    total: allBooks.length,
    owned: allBooks.filter((b) => b.status === "Milik").length,
    read: allBooks.filter((b) => b.status === "Baca").length,
    toRead: allBooks.filter((b) => b.status === "Beli").length,
  }

  return (
    <div className="stats-container">
      <h2>Statistik Buku</h2>
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-content">
            <p className="stat-label">Total Buku</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card stat-owned">
          <div className="stat-content">
            <p className="stat-label">Milik Saya</p>
            <p className="stat-value">{stats.owned}</p>
          </div>
        </div>

        <div className="stat-card stat-read">
          <div className="stat-content">
            <p className="stat-label">Sudah Dibaca</p>
            <p className="stat-value">{stats.read}</p>
          </div>
        </div>

        <div className="stat-card stat-to-read">
          <div className="stat-content">
            <p className="stat-label">Ingin Dibeli</p>
            <p className="stat-value">{stats.toRead}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
