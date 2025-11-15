"use client"

import { useContext } from "react"
import { BookContext } from "../context/BookContext"

export function useBookContext() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBookContext must be used within BookProvider")
  }
  return context
}
