/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Empresa Delicie
 *  Data: 10/10/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 *  Cors - dependencia para gerenciar permissões de requisição da API
 *      npm install cors --save
 * 
 *  Body-Parser - dependencia que gerencia o corpo das resquisições 
 *      npm install body-parser --save
 **/

//Dependencia para criar as requisições de API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');

//Cria o objeto app conforme a classe do express
const app = express()

app.use((request, response, next) => {
    //Define quem poderá acessar a api(* - Todos)
    response.header('Acess-Control-Allow-Origin', '*')

    //Define quais metodos serão utilizados na api
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Atribui as permissões ao cors
    app.use(cors())
//
    next()
})

//CRUD (Create, Read, Update e Delete)

/*
Instalação do PRISMA no projeto (biblioteca para conexão com Banco de Dados)
    npm install prisma --save
    npx prisma
    npx prisma init
    npm install @prisma/client --save

    npx prisma migrate dev  ###Serve para realizar o sincronismo entre o prisma e o Banco de Dados
*/

//Define que os dados que irão chegar no body da requisição será no padrao JSON
const bodyParserJson = bodyParser.json();

//Import do arquivo da controller que irá solicitar a model os dados do BD
var controllerReceita = require('./controller/controller.js')

//EndPoint: Retorna a receita  filtrando pelo ID
app.get('/v1/delicie/receita/:id', async function (request, response) {
    

    let idReceita = request.params.id;

    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceitaId(idReceita);

    
    response.json(dadosStatusReceita);
})

//EndPoint: Retorna a receita  foto e nome
app.get('/v1/delicie/receita/foto', cors() ,bodyParserJson, async function (request, response) {
    


    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceitaFotoNome();

    
    response.json(dadosStatusReceita);
})

//EndPoint: Retorna todas as receita 
app.get('/v1/delicie/receita', cors(), async function (request,response) {


    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceita();

    response.json(dadosStatusReceita);
})

app.listen(8080, () => console.log('Servidor aguardando requisições na porta 8080.'))