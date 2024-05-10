import estoqueService from "../service/estoqueService";

export async function totalItens() 
{
    const total = await estoqueService.totalItens();
    console.log("O total de itens no seu estoque é " + total + ".");
}