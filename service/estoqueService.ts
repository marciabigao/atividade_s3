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
        var idRemoção = 0;

        for(var linha of arquivoCompleto)
        {
            idRemoção++;

            if(linha.nome == identificador)
                {
                    arquivoCompleto.splice(idRemoção, 1);
                }
        }

        await writeCSV(filePath, arquivoCompleto);
    }

    async listar() 
    {
        const arquivoCompleto = await readCSV(filePath);

        for(var linha of arquivoCompleto)
        {
            console.log(`Nome: ${linha.nome}, Valor: R$${linha.valor}, Peso: ${linha.peso} kg, Quantidade: ${linha.quantidade}`);
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
            return acumulador + Number(valorAtual.quantidade);
       }
       
       var totalItens = arquivoCompleto.reduce(calcularSomaQuantidades, 0);

       if(typeof totalItens == 'undefined')
            throw new Error("Não foi possível efetuar essa divisão");

       var somaGlobal = arquivoCompleto.reduce(calcularSomaValores, 0);

       return (somaGlobal / totalItens).toFixed(2);
    }

    async mediaPesos() 
    {
       const arquivoCompleto = await readCSV(filePath);
       
       function calcularSomaPesos(acumulador = 0, valorAtual)
       {
            return acumulador + (valorAtual.peso * valorAtual.quantidade); 
       }

       function calcularSomaQuantidades(acumulador = 0, valorAtual)
       {
            return acumulador + Number(valorAtual.quantidade);
       }
       
       var totalItens = arquivoCompleto.reduce(calcularSomaQuantidades, 0);

       if(typeof totalItens == 'undefined')
            throw new Error("Não foi possível efetuar essa divisão");

       var somaGlobal = arquivoCompleto.reduce(calcularSomaPesos, 0);

       return (somaGlobal / totalItens).toFixed(2);
    }

    async totalItens() 
    {
        const arquivoCompleto = await readCSV(filePath);

        function calcularTotalItens(acumulador = 0, valorAtual)
        {
            return acumulador + Number(valorAtual.quantidade);
        }

        var somaItens = arquivoCompleto.reduce(calcularTotalItens, 0);

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



