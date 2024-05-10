import readCSV from "../model/readCSV";
import estoqueService from "../service/estoqueService";

export async function calcularPesoTotal() 
{
    const totalGlobal = await estoqueService.pesoTotal();
    console.log("O peso total de seu estoque é " + totalGlobal + ".");
}