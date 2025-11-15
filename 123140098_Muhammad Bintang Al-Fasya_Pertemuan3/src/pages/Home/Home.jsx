import { Header } from "../../components/Header/Header"
import { BookForm } from "../../components/BookForm/BookForm"
import { BookFilter } from "../../components/BookFilter/BookFilter"
import { BookList } from "../../components/BookList/BookList"
import { Stats } from "../Stats/Stats"
import "./Home.css"

export function Home() {
  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <BookForm />
        <Stats />
        <BookFilter />
        <BookList />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Manajemen Buku Pribadi. Muhammad Bintang Al-Fasya_123140098.</p>
      </footer>
    </div>
  )
}
