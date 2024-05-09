import {Data} from '/home/mbigao/projetos/Treinee/atividade_s3/model/interface_data.ts';
import estoqueService from '/home/mbigao/projetos/Treinee/atividade_s3/service/estoqueService.ts';

export async function adicionarProduto(data:Data) 
{
    try
    {
        await estoqueService.criar(data);
        console.log("Produto adicionado com sucesso.");
    }
    catch(error)
    {
        console.log("Erro ao adicionar o produto.");
    }
}