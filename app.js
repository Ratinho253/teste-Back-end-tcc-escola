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


var message = require('./controller/config/config.js')
//EndPoint: Retorna a receita  filtrando pelo ID
app.get('/v1/delicie/receita/:id', async function (request, response) {
    

    let idReceita = request.params.id;

    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceitaId(idReceita);

    
    response.json(dadosStatusReceita);
})

//EndPoint: Retorna a receita  foto e nome
app.get('/v1/delicie/receita/foto/:id', cors() ,bodyParserJson, async function (request, response) {
    


    let idReceita = request.params.id;

    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceitaFotoNome(idReceita);

    
    response.json(dadosStatusReceita);
})

//EndPoint: Retorna todas as receita 
app.get('/v1/delicie/receita', cors(), async function (request,response) {


    //Recebe os dados da controller do status de usuario    
    let dadosStatusReceita = await controllerReceita.ctlGetReceita();

    response.json(dadosStatusReceita);
})

//EndPoint: Deletar as receita por id 
app.delete('/v1/delicie/receita/deletar/:id', cors(), async function (request, response) {
   
    let idReceita = request.params.id
  
    let dadosReceita = await controllerReceita.deletarReceita(idReceita)
  
    if (dadosReceita) {
      response.status(message.SUCCESS_DELETED_ITEM.status)
      console.log( );
      response.json()
    } else {
      response.status(message.ERROR_ID_NO_EXISTENT.status)
      response.json()
    }
  
  })


  // EndPoint: Inserir receita
  app.post('/v1/delicie/inserir/receita', cors(), bodyParserJson, async function (request, response) {

    let contentType = request.headers['content-type']
  
    if (String(contentType).toLowerCase() == 'application/json') {
  
      // recebe os dados encaminhados na requisição
      let dadosBody = request.body
  
      let resultDadosReceita = await controllerReceita.inserirReceita(dadosBody)
  
      response.status(resultDadosReceita.status)
      response.json(resultDadosReceita)
  
    }else {
      response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
  })

  
  // EndPoint: atualizar receita

  app.put('/v1/delicie/inserir/receita/atualiza/:id', cors(), bodyParserJson, async function (request, response) {

    let contentType = request.headers['content-type']
  
    if (String(contentType).toLowerCase() == 'application/json') {
      // Recebe o id do aluno pelo parametro
      let idReceita = request.params.id
  
      // Recebe os dados dos alunos encaminhado no corpo da requisição
      let dadosBody = request.body
  
      // Encaminha os dados para o controller
      let resultDadosReceita = await controllerReceita.AtualizarReceita(dadosBody, idReceita)
  
      response.status(resultDadosReceita.status)
      response.json(resultDadosReceita)
  
    } else {
      response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
  })
  

app.listen(8080, () => console.log('Servidor aguardando requisições na porta 8080.'))