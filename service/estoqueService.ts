import readCSV from "/home/mbigao/projetos/Treinee/atividade_s3/model/readCSV.ts";
import writeCSV from "/home/mbigao/projetos/Treinee/atividade_s3/model/writeCSV.ts";
import { Data } from "/home/mbigao/projetos/Treinee/atividade_s3/model/interface_data.ts";
import fs from 'fs';

const filePath = '/home/mbigao/projetos/Treinee/atividade_s3/database/estoque.csv';

class estoqueService
{
    async criar(data: Data)
    {
        if(typeof data.nome !== 'string' || isNaN(data.peso) || isNaN(data.valor) || isNaN(data.quantidade))
        {
            throw new Error("Esses dados não são válidos para o estoque.");
        }
        else
        {
            const arquivoCompleto = await readCSV(filePath);
            const valoresNomes: string[] = [];

            for(const linha of arquivoCompleto)
            {
                const valor = linha.nome;
                valoresNomes.push(valor);
            }

            if(valoresNomes.includes(data.nome))
            {
                throw new Error("Esse item já existe no estoque.");
            }
            else
            {
                await writeCSV(filePath, [data]);
            }
        }
    }
}