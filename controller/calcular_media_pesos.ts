import readCSV from "../model/readCSV";
import estoqueService from "../service/estoqueService";

export async function calcularMediaPesos() 
{
    const media = await estoqueService.mediaPesos();
    console.log("A média dos pesos no seu estoque é " + media + " kg.");
}