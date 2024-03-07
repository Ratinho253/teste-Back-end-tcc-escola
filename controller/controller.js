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


module.exports = {
    ctlGetReceita,
    ctlGetReceitaId,
    ctlGetReceitaFotoNome
}