import estoqueService from "../service/estoqueService";

export async function totalProdutos() 
{
    const totalProdutos = await estoqueService.totalProdutos();
    console.log("O total de produtos no estoque é " + totalProdutos + ".");
}