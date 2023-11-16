/**
    //$queryRawUnsafe( ) -> Permite interpretar uma variavel como sendo um scriptSQL
    //$queryRaw( ) -> Esse executa o comando dentro de aspas e não podendo interpretar uma variavel
 */

/**
 * Métodos com inicio 'ctl' são funções da controller
 * e
 * Métodos com inicio 'mdl' são funções da model
 */

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()


const todasReceitas = async () =>{
    let sql = `
        select * from tbl_receita;
    `

    let rsReceita = await prisma.$queryRawUnsafe(sql)

    if(rsReceita.length > 0){
        return rsReceita
    }else{
        return false
    }

}

const todasReceitasId = async (id) =>{
    let sql = `
    select tbl_receita.id,
    tbl_receita.foto_receita, 
    tbl_receita.nome_da_receita,
    tbl_receita.modo_preparo, 
    tbl_receita.modo_preparo_decricao,
    tbl_receita.ingredientes,
    tbl_receita.lista_ingredientes,
    tbl_receita.tempo_de_preparo
from tbl_receita where tbl_receita.id = ${id};
    `

    let rsReceita = await prisma.$queryRawUnsafe(sql)

    if(rsReceita.length > 0){
        return rsReceita
    }else{
        return false
    }

}

const receitasFotoNome = async () =>{
    let sql = `
    select tbl_receita.foto_receita,
	    tbl_receita.nome_da_receita
    from tbl_receita;
    `

    let rsReceita = await prisma.$queryRawUnsafe(sql)

    if(rsReceita.length > 0){
        return rsReceita
    }else{
        return false
    }

}

module.exports = {
    todasReceitas,
    todasReceitasId,
    receitasFotoNome
}