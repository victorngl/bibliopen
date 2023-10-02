'use client'

import { ChangeEvent, FC, useState } from "react";

interface BookFormProps {
    book?: Book,
}

const BookForm: FC<BookFormProps> = ({ book }) => {
    const [bookForm, setBookForm] = useState<Book>({
         title: '',
         author: '',
         isbn: '',
         published_year: 0,
         genre: '',
         available: false,
    })

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookForm({ ...bookForm, [name]: value })
    }

    const handleClick = () => {
        console.log(bookForm);
       
    }

    const handleSearchISBN = async () => {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + bookForm?.isbn)
        const responseJson = await response.json()

        
        setBookForm({...bookForm, title: responseJson.items[0].volumeInfo.title})
        
    }

    console.log('render')

    return (

        <div>
            <form>
                <p>Titulo</p>
                <input name="title" type="text" value={bookForm?.title} onChange={(e) => handleFormChange(e)}></input>
                <p>Autor</p>
                <input name="author" type="text" value={bookForm?.author} onChange={(e) => handleFormChange(e)}></input>
                <p>ISBN</p>
                <input name="isbn" type="text" value={bookForm?.isbn} onChange={(e) => handleFormChange(e)}></input>
                <p>Ano de Publicação</p>
                <input name="published_year" type="number" value={bookForm?.published_year} onChange={(e) => handleFormChange(e)}></input>
                <p>Genero</p>
                <input name="genre" type="text" value={bookForm?.genre} onChange={(e) => handleFormChange(e)}></input>
                <p>Disponivel</p>
                <input name="available" type="boolean" value={bookForm?.available} onChange={(e) => handleFormChange(e)}></input>
            </form>

            <div>
                <button className=" "onClick={handleClick}>LOG</button>
                <button className=" "onClick={handleSearchISBN}>Get byISBN</button>
            </div>
        </div> 
    )
}

export default BookForm;