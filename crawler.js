/*****************
|  DEPENDÊNCIAS  |
*****************/

const axios = require ('axios')
const cheerio = require('cheerio')
const fs = require('fs')

/************************* 
|  TUTORIAL - COMO USAR  |
*************************/

if (process.argv[2] === undefined || process.argv[3] === undefined) {
  console.log('Utilize o comando: node crawler.js [palavra_chave] [nome_arquivo_saida]')
  return
}

/***************
|  CONSTANTES  |
***************/

const regexLinks = /href="(http[^"]+)/g;
const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\W{2,3})+$/g;
const regexTelefone = /\(?\d{2,3}?\)?[ -]?\d{4,5}[ -]?\d{4}/g;

/*********************
| VARIÁVEIS GLOBAIS  |
*********************/

const palavra_chave = process.argv[2] // Ex: cabeleireiro são paulo
const paginas = 10 // número de páginas a serem pesquisadas 
const intervalo = 5 // tempo em segundos para cada pesquisa
const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\W{2,3})+$/g;
const regexTelefone = /(\(?\d{2}\)?)? ?\d{4,5}-? ?\d{4}/g;

/****************************
|  TELA INICIAL DO SISTEMA  |
****************************/

console.log('')
console.log('/********************************')
console.log('|                               |')
console.log('|  SEJA BEM VINDO AO            |')
console.log('|  CRAWLER DE CONTATOS - BLOGS  |')
console.log('|                               |')
console.log('********************************/')
console.log('')

/****************
|  MÉTODO MAIN  |
****************/

main()
async function main () {

  // loop entre todas as páginas de pesquisa no BING
  for (let i = 1; i <= paginas; i++) {
    console.log('# Varrendo página: ' + i + ' de ' + paginas + '...')
    requisicao(i)
    await esperar(intervalo)
  }

}

/****************
|  REQUISIÇÕES  |
****************/

async function requisicao (_pagina) {

  // parâmetros do Bing
  const q = 'q=loc:br site:.com.br/contato ' + palavra_chave
  const first = 'first=' + (_pagina - 1) * 10

  // requisição
  axios.get('https://www.bing.com/search?' + q + '&' + first)
  .then(function (response) {
    //const $ = cheerio.load(response.data)
    //const links = $('#b_content #b_results li')
    console.log('SUCESSO!');
	
    return true
  })
  .catch(function (error) {
    console.log('ERRO!')
    return false
  })

}

/***********************
|  EXTRAÇÃO DOS DADOS  |
***********************/

async function extraiDados(bodyText){
	
	let emails = bodyText.match(regexEmail)
	let telefones = bodyText.match(regexTelefone)
	
	let max = Math.max(emails.length, telefones.length);
	
	for (let i = 0; i < max; i++){
		let str = 
	}
	
	
}

/***********************
|  FUNÇÕES AUXILIARES  |
***********************/

// Espera tempo em segundos
function esperar(s) {
  return new Promise(resolve => setTimeout(resolve, (1000*s) ))
}