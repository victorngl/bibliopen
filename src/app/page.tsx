import Navbar from "@/components/layout/navbar/Navbar"
import BookForm from "./books/page"

export default function Home() {

  const book: Book = {
    title: "O pequeno principe",
    available: false,
    author: "Joao Victor",
    isbn: "123",
    published_year: "2024",
    subject: "Historia"
  }

  return (
    <>
      <h1><BookForm book={book} /></h1>
    </>
  )
}
