import { createContext, useState, useCallback } from "react"

export const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("Semua")

  const addBook = useCallback((book) => {
    const newBook = {
      id: Date.now(),
      ...book,
      dateAdded: new Date().toLocaleDateString(),
    }
    setBooks((prev) => [newBook, ...prev])
    return newBook
  }, [])

  const updateBook = useCallback((id, updatedData) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...updatedData } : book)))
  }, [])

  const deleteBook = useCallback((id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }, [])

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "Semua" || book.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <BookContext.Provider
      value={{
        books: filteredBooks,
        allBooks: books,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
