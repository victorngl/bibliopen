'use client'

import { ChangeEvent, FC, useState } from "react";

import useGetInfoByISBN from "@/hooks/useGetBookByISBN";

interface BookFormProps {
    book?: Book,
}

const BookForm: FC<BookFormProps> = ({ book }) => {
    const { getBookByISBN } = useGetInfoByISBN();

    const [bookForm, setBookForm] = useState<Book>({
        title: '',
        author: '',
        isbn: '',
        published_year: '',
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

        const book: Book | undefined = await getBookByISBN(bookForm.isbn)

        if (book != undefined) {
            setBookForm(book)
        }

    }

    return (
        <>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div className="">
                        <label
                            htmlFor="isbn"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ISBN
                        </label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Número de ISBN"
                            required
                            value={bookForm?.isbn} onChange={(e) => handleFormChange(e)}
                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Titulo
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={bookForm?.title} onChange={(e) => handleFormChange(e)}
                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="author"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Autor
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={bookForm?.author} onChange={(e) => handleFormChange(e)}
                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="published_year"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Ano de Publicação
                        </label>
                        <input
                            type="text"
                            id="published_year"
                            name="published_year"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={bookForm?.published_year} onChange={(e) => handleFormChange(e)}
                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="genre"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Gênero
                        </label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={bookForm?.genre} onChange={(e) => handleFormChange(e)}
                        />
                    </div>

                </div>
                <div className="grid md:grid-cols-6 gap-2">
                    <button
                        onClick={handleClick}
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Cadastrar
                    </button>

                    <button
                        type="button"
                        onClick={handleSearchISBN}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Buscar pelo ISBN
                    </button>
                </div>

            </form>



        </>
    )
}

export default BookForm;

