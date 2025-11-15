import { useBookContext } from "../../hooks/useBookContext"
import { BookCard } from "../BookCard/BookCard"
import "./BookList.css"

export function BookList() {
  const { books, allBooks } = useBookContext()

  if (allBooks.length === 0) {
    return (
      <div className="book-list-container">
        <div className="empty-state">
          <h3>Belum ada buku</h3>
          <p>Mulai dengan menambahkan buku pertama Anda di formulir di atas!</p>
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="book-list-container">
        <div className="empty-state">
          <h3>Tidak ada hasil</h3>
          <p>Coba ubah filter atau pencarian Anda.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2>Koleksi Buku ({books.length})</h2>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
