import { Data } from "../model/interface_data";
import estoqueService from "../service/estoqueService";
import readCSV from "../model/readCSV";

export async function calcularValorTotal() 
{
    const valorTotal = await estoqueService.valorTotal();
    console.log("O valor total do seu estoque é " + valorTotal + ".");
}