import readCSV from "../model/readCSV";
import estoqueService from "../service/estoqueService";

export async function calcularMediaValores() 
{
    const media = await estoqueService.media();
    console.log("A média dos valores do estoque é R$" + media + ".");
}