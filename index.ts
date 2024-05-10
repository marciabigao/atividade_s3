const scan = require('prompt-sync')({sigint: true});

import { Data } from "./model/interface_data";
import {adicionarProduto} from "/home/mbigao/projetos/Treinee/atividade_s3/controller/adicionar_produto.ts";
import { removerProdutos } from "./controller/remover_produtos";
import { listarProdutos } from "./controller/listar_produtos";
import { calcularValorTotal } from "./controller/calcular-valor_total";

var prompt: string = "Digite a ação desejada:";
prompt += "Digite 1 para adicionar item ao estoque";
prompt += "Digite 2 para remover item ao estoque";
prompt += "Digite 3 para listar todos os itens do estoque";
prompt += "Digite 4 para calcular valor total do estoque";
prompt += "Digite 0 para voltar ao item anterior";


var entrada = scan(prompt);
var W = parseInt(entrada, 10);

if(entrada == 0)
    W = W - 1;

switch(W)
{
    case(1):

        var nome = scan("Digite o nome do produto: ");
        var valor = scan("Digite o valor do produto: ");
        var peso = scan("Digite o peso do produto: ");
        var quantidade = scan("Digite a quantidade do produto");

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

    case(3):

        await listarProdutos();

    case(4):

        await calcularValorTotal();
        
        
}