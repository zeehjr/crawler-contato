/*****************
|  DEPENDÊNCIAS  |
*****************/

const axios = require ('axios')
const cheerio = require('cheerio')

/************************* 
|  TUTORIAL - COMO USAR  |
*************************/

if (process.argv[2] === undefined) {
  console.log('Utilize o comando: node crawler.js [palavra_chave]')
  return
}

/*********************
| VARIÁVEIS GLOBAIS  |
*********************/

const palavra_chave = process.argv[2] // Ex: cabeleireiro são paulo
const paginas = 10 // número de páginas a serem pesquisadas 
const intervalo = 5 // tempo em segundos para cada pesquisa
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\W{2,3})+$/;
const telefoneRegex = /(\(?\d{2}\)?)? ?\d{4,5}-? ?\d{4}/;

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
    console.log('SUCESSO!')
    return true
  })
  .catch(function (error) {
    console.log('ERRO!')
    return false
  })

}

async function extraiDados(bodyText){
	
}

/***********************
|  FUNÇÕES AUXILIARES  |
***********************/

// Espera tempo em segundos
function esperar(s) {
  return new Promise(resolve => setTimeout(resolve, (1000*s) ))
}