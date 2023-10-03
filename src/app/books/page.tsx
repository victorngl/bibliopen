'use client'

import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import useGetInfoByISBN from "@/hooks/useGetBookByISBN";

interface BookFormProps {
    book?: Book,
}

const BookForm: FC<BookFormProps> = ({ book }) => {
    const { getBookByISBN } = useGetInfoByISBN();

    const { register, getValues, handleSubmit, setValue } = useForm<Book>({
        defaultValues: book,
      });
    
    const onSubmit: SubmitHandler<Book> = (data) => console.log(data)

    const handleSearchISBN = async () => {

        const book: Book | undefined = await getBookByISBN(getValues("isbn"))

        if (book != undefined) {
            setValue("author", book.author);
            setValue("title", book.title);
            setValue("isbn", book.isbn);
            setValue("published_year", book.published_year);
            setValue("subject", book.subject);
        }

    }

    console.log('render')

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Número de ISBN"
                            required
                            {...register("isbn", { required: true } )}
                            
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
                            {...register("title", { required: true } )}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            
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
                            {...register("author", { required: true } )}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            
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
                            {...register("published_year", { required: true } )}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                           
                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Assunto
                        </label>
                        <input
                            type="text"
                            id="subject"
                            {...register("subject", { required: true } )}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            
                        />
                    </div>

                </div>
                <div className="grid md:grid-cols-6 gap-2">
                    <button
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

