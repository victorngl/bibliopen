export default function useGetBookByMarc() {

    function marc21ToJson(marc21Record: string) {
        const lines = marc21Record.split('\n');
        const json: any = {};
        let currentField = '';
      
        lines.forEach((line: any) => {
          if (line) {
            const tag: any = line.substring(0, 3);
            const indicator1 = line.charAt(4);
            const indicator2 = line.charAt(5);
            const subfieldCode = line.charAt(7);
            const subfieldValue = line.substring(8);
      
            if (tag) {
              if (!json[tag]) {
                json[tag] = [];
              }
      
              if (tag !== currentField) {
                const field = {
                  tag,
                  indicator1,
                  indicator2,
                  subfields: [],
                };
      
                json[tag].push(field);
                currentField = tag;
              }
      
              const subfield = {
                code: subfieldCode,
                value: subfieldValue,
              };
      
              const lastField = json[tag][json[tag].length - 1];
              lastField.subfields.push(subfield);
            }
          }
        });
      
        return json;
      }

    const getBookByMarc = async (marc: string): Promise<Item | object | undefined> => {

        
        let bookInfo: Item | undefined  = undefined;

        const marcToJson: object = marc21ToJson(marc)

        //const marcReturn = JSON.stringify(marcToJson, null, 2)
        
        /*
        bookInfo = {
            title: 'a',
            author: 'a',
            subject: 'a',
            published_year: '',
            available: false,
            isbn: 'a'
        }
        */

        return marcToJson;
    }


    return { getBookByMarc };

}