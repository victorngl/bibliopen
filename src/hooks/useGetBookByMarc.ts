

export default function useGetBookByMarc() {

    const getBookByMarc = async (marc: string) => {

        const marc4js = require('marc4js');

        let bookInfo: Book | undefined | any = undefined;

        marc4js.parse(marc, { fromFormat: 'marc' }, (err: any, records: any) => {
            if (err) {
                console.error('Erro ao converter o registro MARC21 em JSON:', err);
            } else {
                // O objeto "records" agora contém o registro MARC21 convertido em JSON
                bookInfo = JSON.stringify(records, null, 2);
            }
        });

        bookInfo = {
            title: 'a',
            author: 'a',
            subject: 'a',
            published_year: '',
            available: false,
            isbn: 'a'
        }

        return bookInfo;
    }


    return { getBookByMarc };

}