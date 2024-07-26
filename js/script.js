'use strict';

const teste = document.getElementById('cep');
const enumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && enumero(cep);
const erro = document.getElementById('erro');
const container = document.getElementById('container');

const limparformulario = (endereco) => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const adcElemento = (text) => {
    var divNova = document.createElement("div");
    var divAtual = document.getElementById("contianer");
    divNova.classList.add('erro'); 
    var conteudoNovo = document.createTextNode(text);
    divNova.appendChild(conteudoNovo);

    document.body.insertBefore(divNova, divAtual);
}

const pesquisarCep = async() => {
    limparformulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    
    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
    
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = ''; 
            document.getElementById('bairro').value = ''; 
            document.getElementById('cidade').value = ''; 
            document.getElementById('estado').value = ''; 
            
            const text = 'cep não encontrado';
            adcElemento(text);
        }else {
            preencherFormulario(endereco);
        }
    }else{
        const text = 'cep invalido';
        adcElemento(text);
    }
}

teste.addEventListener('focusout', pesquisarCep);