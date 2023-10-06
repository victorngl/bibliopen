'use client'

import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import useGetInfoByISBN from "@/hooks/useGetBookByISBN";
import useGetBookByMarc from "@/hooks/useGetBookByMarc";
import ErrorBoundary from "@/components/utils/ErrorBoundary";

interface ItemFormProps {
    item?: Item
}

const BookForm: FC<ItemFormProps> = ({ item }) => {
    const [error, setError] = useState<string>('');
    
    const { getBookByISBN } = useGetInfoByISBN();
    const { getBookByMarc } = useGetBookByMarc();

    const { register, getValues, handleSubmit, setValue, reset } = useForm<Item>({
        defaultValues: item,
    });

    
    const onSubmit: SubmitHandler<Item> = (data) => {
        if (item) {
            console.log('UPDATE')
        }
        else {
            console.log('CREATE')
        }
    }

    const handleSearchISBN = async () => {

        const book: Item | undefined = await getBookByISBN(getValues("isbn"))

        if (book != undefined) {
            reset(book);
            
        }
        else if(book == undefined) {

            setError('ISBN não encontrado.');

            setTimeout( () => {
                setError('');
            }, 2000)
        }

    }

    const handleSearchMARC = () => {

        const bookMarc: Item | undefined = getBookByMarc(getValues("marc") as string)
        
        console.log(bookMarc);

        if (bookMarc != undefined) {
            reset(bookMarc)
        }
        
        
    }

    return (
        <>
            {error && <ErrorBoundary>{error}</ErrorBoundary>}

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
                            {...register("isbn", { required: true })}

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
                            {...register("title", { required: true })}
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
                            {...register("author", { required: true })}
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
                            {...register("published_year", { required: true })}
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
                            {...register("subject", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="edition"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Edição
                        </label>
                        <input
                            type="text"
                            id="edition"
                            {...register("edition", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="language"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Idioma
                        </label>
                        <input
                            type="text"
                            id="language"
                            {...register("language", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="physical_description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Descrição Física
                        </label>
                        <input
                            type="text"
                            id="physical_description"
                            {...register("physical_description", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="general_notes"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Notas Gerais
                        </label>
                        <input
                            type="text"
                            id="general_notes"
                            {...register("general_notes", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="bibliography_notes"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Notas Bibliográficas
                        </label>
                        <input
                            type="text"
                            id="bibliography_notes"
                            {...register("bibliography_notes", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required

                        />
                    </div>

                    <div className="">
                        <label
                            htmlFor="dewey"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Código Dewey
                        </label>
                        <input
                            type="text"
                            id="dewey"
                            {...register("dewey", { required: true })}
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
                            MARC Tags
                        </label>
                        <textarea
                            id="marc"
                            {...register("marc", { required: false })}
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
                        Salvar
                    </button>

                    <button
                        type="button"
                        onClick={handleSearchISBN}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Buscar pelo ISBN
                    </button>

                    <button
                        type="button"
                        onClick={handleSearchMARC}
                        className="text-white whitespace-nowrap bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Atualizar por MARC
                    </button>
                </div>

            </form>



        </>
    )
}

export default BookForm;
