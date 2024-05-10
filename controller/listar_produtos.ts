import readCSV from "../model/readCSV";
import estoqueService from "../service/estoqueService";

export async function listarProdutos() 
{
    await estoqueService.listar();
}