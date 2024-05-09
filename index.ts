const scan = require('prompt-sync')({sigint: true});

import { Data } from "./model/interface_data";
import {adicionarProduto} from "/home/mbigao/projetos/Treinee/atividade_s3/controller/adicionar_produto.ts";

var entrada = scan("Digite a ação desejada:");
var W = parseInt(entrada, 10);

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


}