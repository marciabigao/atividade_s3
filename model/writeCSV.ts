import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Data } from './interface_data';

const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'nome', title: 'NOME' },
      { id: 'valor', title: 'VALOR' },
      { id: 'peso', title: 'PESO'},
      { id: 'quantidade', title: 'QUANTIDADE'},
    ],
  });

  return csvWriter.writeRecords(data);
};

export default writeCSV;