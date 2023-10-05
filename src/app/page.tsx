import Navbar from "@/components/layout/navbar/Navbar"
import BookForm from "./items/page"

export default function Home() {

  const book: Item = {
    title: "O pequeno principe",
    author: ['João Victor'],
    isbn: "123",
    published_year: "2024",
    subject: ['AAA'],
    language: "Portuguese",
  }

  return (
    <>
      <h1><BookForm item={book} /></h1>
    </>
  )
}
