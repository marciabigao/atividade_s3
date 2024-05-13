import { Data } from "../model/interface_data";
import estoqueService from "../service/estoqueService";

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