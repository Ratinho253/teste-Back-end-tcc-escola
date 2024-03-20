var message = require('../controller/config/config.js')
var receitaDao = require('../model/DAO/receita.js')

//Retorna todas as Receitas
const ctlGetReceita = async () => {

    let dadosReceitaJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dadosReceita = await receitaDao.todasReceitas()

    if (dadosReceita) {
        dadosReceitaJSON = {
            quantidade: dadosReceita.length,
            receita: dadosReceita
        }
        return dadosReceitaJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

//Retorna todas as Receitas pelo id
const ctlGetReceitaId = async (id) => {
    let dadosReceitaJSON = {}

    if (id == '' || id == null || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_PARAMS
    } else {
    let dadosReceita = await receitaDao.todasReceitasId(id)

    if (dadosReceita) {
        dadosReceitaJSON = {
            receita: dadosReceita
        }
        return dadosReceitaJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}
}

//Retorna todas as Receitas  só a foto eo nome 
const ctlGetReceitaFotoNome = async (id) => {
    
    let dadosReceitaJSON = {}

    if (id == '' || id == null || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_PARAMS
    } else {
    let dadosReceita = await receitaDao.receitasFotoNome(id)
    

    if (dadosReceita) {
        dadosReceitaJSON = {
            receita: dadosReceita
        }
        return dadosReceitaJSON
       
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
    }
}


const deletarReceita = async function (id) {

    let idReceita = id
  
  
    let statusId = await receitaDao.todasReceitasId(idReceita)
      
    let dadosReceita = await receitaDao.deleteReceita(idReceita)
  
    if (statusId) {
  
      if (dadosReceita) {
        let statusId = {}
        console.log(dadosReceita);
        return statusId.status = message.SUCCESS_DELETED_ITEM
      }
    } else{
      return message.ERROR_NOT_FOUND
    }
       
}

// Inserir  Receita

const inserirReceita = async function (dadosReceita) {

    //Validação  para tratar campos obrigatorios
    if (dadosReceita.nome_da_receita == '' || dadosReceita.nome_da_receita == undefined || dadosReceita.nome_da_receita.length > 100 ||
    dadosReceita.foto_receita == '' || dadosReceita.foto_receita == undefined || dadosReceita.foto_receita.length > 5000 ||
    dadosReceita.modo_preparo == '' || dadosReceita.modo_preparo == undefined || dadosReceita.modo_preparo.length > 150 ||
    dadosReceita.lista_ingredientes == '' || dadosReceita.lista_ingredientes == undefined || dadosReceita.lista_ingredientes.length > 100 ||
    dadosReceita.tempo_de_preparo == '' || dadosReceita.tempo_de_preparo == undefined || dadosReceita.tempo_de_preparo.length > 10
    ) {
      return message.ERROR_REQUIRED_FIELDS // status code 400
    } else {
  
      // Envia os dados para a model inserir no banco de dados
      let resultDadosReceita = await receitaDao.insertReceita(dadosReceita)
  
      // Valida se o DB inseriu corretanmente os dados
      if (resultDadosReceita) {
  
        // chama a função que vai encontrar o id gerado apos o insert
        let novaReceita = await receitaDao.selectLastId()
  
  
        let dadosReceitaJSON = {}
  
        dadosReceitaJSON.status = message.SUCCESS_CREATED_ITEM.status
        dadosReceitaJSON.receita = novaReceita
  
        return dadosReceitaJSON// status code 201
      } else {
        return message.ERROR_INTERNAL_SERVER // status code 500
      }
  
    }
  
  }

  const AtualizarReceita = async function (dadosReceita, idReceita) {


    //Validação  para tratar campos obrigatorios
     if (dadosReceita.nome_da_receita == '' || dadosReceita.nome_da_receita == undefined || dadosReceita.nome_da_receita.length > 100 ||
    dadosReceita.foto_receita == '' || dadosReceita.foto_receita == undefined || dadosReceita.foto_receita.length > 5000 ||
    dadosReceita.modo_preparo == '' || dadosReceita.modo_preparo == undefined || dadosReceita.modo_preparo.length > 150 ||
    dadosReceita.lista_ingredientes == '' || dadosReceita.lista_ingredientes == undefined || dadosReceita.lista_ingredientes.length > 100 ||
    dadosReceita.tempo_de_preparo == '' || dadosReceita.tempo_de_preparo == undefined || dadosReceita.tempo_de_preparo.length > 10
    ) {
      return message.ERROR_REQUIRED_FIELDS // status code 400
  
      // validação de id incorreto ou não informado
    } else if (idReceita == '' || idReceita == undefined || isNaN(idReceita)) {
      return message.ERROR_INVALID_ID // status code 400 
    } else {
  
      // adiciona um id do aluno no json do dados
  
      dadosReceita.id = idReceita
  
  
  
      // encaminha os dados para a model do aluno 
      let resultDadosAluno = await receitaDao.uptadeReceita(dadosReceita)
  
      if (resultDadosAluno) {
        let dadosReceitaJson = {}
        dadosReceitaJson.status = message.SUCCESS_UPDATED_ITEM.status
        dadosReceitaJson.aluno = dadosReceita
        return dadosReceitaJson // status code 200
      } else {
        return message.ERROR_INTERNAL_SERVER
      }
  
    }
  
  
  }



module.exports = {
    ctlGetReceita,
    ctlGetReceitaId,
    ctlGetReceitaFotoNome,
    deletarReceita,
    inserirReceita,
    AtualizarReceita,
}