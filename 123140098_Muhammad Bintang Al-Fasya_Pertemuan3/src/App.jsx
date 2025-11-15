import { useState, useEffect } from "react"
import { BookProvider } from "./context/BookContext"
import { Home } from "./pages/Home/Home"
import "./App.css"

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const savedBooks = localStorage.getItem("books")
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  return (
    <BookProvider>
      <Home />
    </BookProvider>
  )
}

export default App
