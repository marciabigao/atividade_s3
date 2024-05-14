import readCSV from "../model/readCSV";
import writeCSV from "../model/writeCSV";
import { Data } from "../model/interface_data";
import fs, { write } from 'fs';

const filePath = "database/estoque.csv";

export default new class estoqueService
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
    };

    async remover(identificador: string) 
    {
        var arquivoCompleto = await readCSV(filePath);
        var idRemoção: number = 0;

        for(var i = 0; i < arquivoCompleto.length; i++)
        {
            if(arquivoCompleto[i][0] == identificador)
                {
                    idRemoção = i;
                }
        }

        arquivoCompleto.splice(idRemoção, 1);

        await writeCSV(filePath, arquivoCompleto);
    }

    async listar() 
    {
        const arquivoCompleto = await readCSV(filePath);

        for(var i = 1; i < arquivoCompleto.length; i++)
        {
            console.log(arquivoCompleto[i][0] + ' ' + arquivoCompleto[i][1] + ' ' + arquivoCompleto[i][2] + ' ' + arquivoCompleto[i][3] );
        }
    }

    async valorTotal() 
    {
        const arquivoCompleto = await readCSV(filePath);

        function valorTotalArray(acumulador = 0, valorAtual)
        {
            return acumulador + (valorAtual.valor * valorAtual.quantidade); 
        }

        var totalGlobal = arquivoCompleto.reduce(valorTotalArray, 0);

        return totalGlobal;
    }

    async pesoTotal() 
    {
        const arquivoCompleto = await readCSV(filePath);
        
        function pesoTotalArray(acumulador = 0, valorAtual)
        {
            return acumulador + (valorAtual.peso * valorAtual.quantidade);
        }

        var totalGlobal = arquivoCompleto.reduce(pesoTotalArray, 0);

        return totalGlobal;
    }

    async mediaValores() 
    {
       const arquivoCompleto = await readCSV(filePath);

       function calcularSomaValores(acumulador = 0, valorAtual)
       {
            return acumulador + (valorAtual.valor * valorAtual.quantidade); 
       }

       function calcularSomaQuantidades(acumulador = 0, valorAtual)
       {
            acumulador += valorAtual.quantidade;
            return acumulador;
       }
       
       var totalItens = arquivoCompleto.reduce(calcularSomaQuantidades, 0);

       if(typeof totalItens == 'undefined')
            throw new Error("Não foi possível efetuar essa divisão");

       var somaGlobal = arquivoCompleto.reduce(calcularSomaValores, 0);

       console.log(somaGlobal, totalItens);

       return somaGlobal / totalItens;
    }

    async mediaPesos() 
    {
       const arquivoCompleto = await readCSV(filePath);
       
       var data: Data;
       var somaGlobal = 0;
       var totalItens = 0;

       for(var lista of arquivoCompleto)
       {
            data = lista;
            somaGlobal += data.peso * data.quantidade;
            totalItens += data.quantidade;
       }

       return somaGlobal / totalItens;
    }

    async totalItens() 
    {
        const arquivoCompleto = await readCSV(filePath);
        var somaItens = 0;

        for(var linha of arquivoCompleto)
        {
            somaItens += linha.quantidade;
        }

        return somaItens;
    }

    async totalProdutos() 
    {
        const arquivoCompleto = await readCSV(filePath);
        var total = 0;
        
        for(var linha of arquivoCompleto)
        {
            var produtoAtual = linha.nome;
            total++;

            for(var linha of arquivoCompleto)
            {
                arquivoCompleto.filter((linha) => linha.nome == produtoAtual);
            }
        }

        return total;
    }
}



