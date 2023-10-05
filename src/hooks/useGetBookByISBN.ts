
export default function useGetBookByISBN() {

    const getBookByISBN = async (isbn: string): Promise<Item | undefined> => {

        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
        const responseJson = await response.json()

        if (responseJson.totalItems != 0) {

            const volumeInfo = responseJson.items[0].volumeInfo;

            const bookInfo: Item = {
                title: volumeInfo.title,
                author: volumeInfo.authors,
                subject: volumeInfo.categories,
                published_year: volumeInfo.publishedDate,
                isbn: isbn,
                edition: volumeInfo.contentVersion,
                language: volumeInfo.language,
            } 

            return bookInfo;
        }

        return undefined;

    }

    return { getBookByISBN };
    
}