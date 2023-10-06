


export default function useGetBookByMarc() {

  const getBookByMarc = (marc: string): Item | undefined => {

    const bookInfo: Item = extrairItensDeMARC21(marc);

    return bookInfo;
  }

  return { getBookByMarc };
}

function extrairItensDeMARC21(marc21Record: string): Item {

  function marc21ToJson(marc21Record: string) {
    const lines = marc21Record.split('\n');
    const json: Record<string, any[]> = {};
    let currentField = '';

    lines.forEach((line: string) => {
      if (line) {
        const tag = line.substring(0, 3);
        const indicator1 = line.charAt(4);
        const indicator2 = line.charAt(5);
        const subfieldData = line.substring(8);

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

        const subfieldSegments = subfieldData.split('|').filter(Boolean);

        subfieldSegments.forEach((segment: string) => {
          const subfieldCode = segment.charAt(0);
          const subfieldValue = segment.substring(1);

          const subfield = {
            code: subfieldCode,
            value: subfieldValue,
          };

          const lastField = json[tag][json[tag].length - 1];
          lastField.subfields.push(subfield);
        });
      }
    });

    return json;
  }

  const jsonRecord = marc21ToJson(marc21Record);

  const item: Item = {
    isbn: '',
    title: '',
    published_year: '',
    language: '',
    author: [],
    subject: [],
  };

  if (jsonRecord['020']) {
    const subfieldA = jsonRecord['020'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {

      const resultado = subfieldA.value.replace(/\s/g, '').replace(/\([^)]*\)/g, '');
      item.isbn = resultado || '';
    }
  }

  if (jsonRecord['245']) {
    const subfieldA = jsonRecord['245'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.title = subfieldA.value || '';
    }
  }

  if (jsonRecord['260']) {
    const subfieldC = jsonRecord['260'][0]?.subfields.find((sf: any) => sf.code === 'c');
    if (subfieldC) {
      item.published_year = subfieldC.value || '';
    }
  }


  if (jsonRecord['008'] && jsonRecord['008'][0]?.value) {
    const languageCode = jsonRecord['008'][0]?.value.substring(35, 38);

    if (languageCode) {
      item.language = languageCode;
    }
  }

  if (jsonRecord['100']) {
    item.author = jsonRecord['100'].map((field: any) => {
      const subfieldA = field.subfields.find((sf: any) => sf.code === 'a');
      return subfieldA ? subfieldA.value || '' : '';
    });
  }

  if (jsonRecord['650']) {
    item.subject = jsonRecord['650'].map((field: any) => {
      const subfieldA = field.subfields.find((sf: any) => sf.code === 'a');
      return subfieldA ? subfieldA.value || '' : '';
    });
  }

  if (jsonRecord['020']) {
    const subfieldB = jsonRecord['020'][0]?.subfields.find((sf: any) => sf.code === 'b');
    if (subfieldB) {
      item.genre = subfieldB.value || '';
    }
  }

  if (jsonRecord['250']) {
    const subfieldA = jsonRecord['250'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.edition = subfieldA.value || '';
    }
  }

  if (jsonRecord['300']) {
    const subfieldA = jsonRecord['300'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.physical_description = subfieldA.value || '';
    }
  }

  if (jsonRecord['500']) {
    const subfieldA = jsonRecord['500'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.general_notes = subfieldA.value || '';
    }
  }

  if (jsonRecord['504']) {
    const subfieldA = jsonRecord['504'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.bibliography_notes = subfieldA.value || '';
    }
  }

  if (jsonRecord['082']) {
    const subfieldA = jsonRecord['082'][0]?.subfields.find((sf: any) => sf.code === 'a');
    if (subfieldA) {
      item.dewey = subfieldA.value || '';
    }
  }

  return item;
}