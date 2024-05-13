import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Data } from './interface_data';

const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'nome', title: 'nome' },
      { id: 'valor', title: 'valor' },
      { id: 'peso', title: 'peso'},
      { id: 'quantidade', title: 'quantidade'},
    ],
  });

  return csvWriter.writeRecords(data);
};

export default writeCSV;