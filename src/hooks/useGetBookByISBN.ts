
export default function useGetBookByISBN() {

    const getBookByISBN = async (isbn: string) => {

        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
        const responseJson = await response.json()

        if (responseJson.totalItems != 0) {

            const bookInfo: Book = {
                title: responseJson.items[0].volumeInfo.title,
                author: responseJson.items[0].volumeInfo.authors[0],
                subject: responseJson.items[0].volumeInfo.categories[0],
                published_year: responseJson.items[0].volumeInfo.publishedDate,
                available: false,
                isbn: isbn,
            } as Book

            return bookInfo;
        }

        return undefined;

    }


    return { getBookByISBN };
    
}