import readCSV from "../model/readCSV";
import estoqueService  from "../service/estoqueService";
const scan = require('prompt-sync')({sigint: true});

const filePath = "database/estoque.csv";

export async function removerProdutos(identificador: string) 
{
    var arquivoCompleto = await readCSV(filePath);

    var estaNoArquivo: boolean = false;

    var i = 0;
    for(i = 0; i < arquivoCompleto.length; i++)
    {
        if(arquivoCompleto[i][0] == identificador)
            {
                estaNoArquivo = true;
            }
    }

    if(!(estaNoArquivo))
    {
        throw new Error("O item em questão não se encontra no estoque.");
    }
    
    console.log("Você realmente deseja remover o seguinte produto?");
    console.log(arquivoCompleto[i]);

    var resposta = scan("(y/N)? ");
    
    if(resposta == 'y')
    {
        await estoqueService.remover(identificador);
        console.log("Seu produto foi removido com sucesso.")
    }
    
}