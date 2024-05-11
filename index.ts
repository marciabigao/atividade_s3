const scan = require('prompt-sync')({sigint: true});

import { Data } from "./model/interface_data";
import {adicionarProduto} from "/home/mbigao/projetos/Treinee/atividade_s3/controller/adicionar_produto.ts";
import { removerProdutos } from "./controller/remover_produtos";
import { listarProdutos } from "./controller/listar_produtos";
import { calcularValorTotal } from "./controller/calcular_valor_total";
import { calcularPesoTotal } from "./controller/calcular_peso_total";
import { calcularMediaValores } from "./controller/calcular_media_valores";
import { calcularMediaPesos } from "./controller/calcular_media_pesos";
import { totalItens } from "./controller/total_itens";
import { totalProdutos } from "./controller/total_produtos";

var prompt: string = "Digite a ação desejada:";
prompt += "\nDigite 1 para adicionar item ao estoque";
prompt += "\nDigite 2 para remover item ao estoque";
prompt += "\nDigite 3 para listar todos os itens do estoque";
prompt += "\nDigite 4 para calcular o valor total do estoque";
prompt += "\nDigite 5 para calcular o peso total do estoque";
prompt += "\nDigite 6 para calcular a média dos valores do estoque";
prompt += "\nDigite 7 para calcular a média dos pesos do estoque";
prompt += "\nDigite 8 para saber o total de itens no estoque";
prompt += "\nDigite 9 para saber o total de produtos no estoque";
prompt += "\nDigite 0 para voltar ao item anterior\n";


var entrada = scan(prompt)

var W: number = 2;

if(entrada == 0)
{
    if(W == 1)
        throw new Error("Você já está no primeiro comando.");
    else
        W = W - 1;
}

W = parseInt(entrada, 10);

(async () =>  {
    
    switch(W)
    {
        case(1):

            var nome = scan("Digite o nome do produto: ");
            var valor = scan("Digite o valor do produto: ");
            var peso = scan("Digite o peso do produto: ");
            var quantidade = scan("Digite a quantidade do produto: ");

            const dados = {
                nome: nome,
                valor: parseFloat(valor),
                peso: parseFloat(peso),
                quantidade: parseFloat(quantidade),
            } as Data;

            await adicionarProduto(dados);
            break;

        case(2):
        
            var identificador = scan("Digite o item a ser removido do estoque: ")
            await removerProdutos(identificador);
            break;

        case(3):

            await listarProdutos();
            break;

        case(4):

            await calcularValorTotal();
            break;

        case(5):

            await calcularPesoTotal();
            break;

        case(6):
        
            await calcularMediaValores();
            break;

        case(7):

            await calcularMediaPesos();
            break;

        case(8):

            await totalItens();
            break;
    
        case(9):

            await totalProdutos();
            break;   
        
    }
})();