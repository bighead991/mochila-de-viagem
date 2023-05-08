const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach((elemento) => {
  criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
  // INTERROMPE O EVENTO PADRÃO POST DO FORMULARIO
  evento.preventDefault()

  const nome = evento.target.elements['nome']
  const quantidade = evento.target.elements['quantidade']

   // 
   const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }
 
  // COLETANDO O ELEMENTO CASO ELE JÁ EXISTE NA LISTA
  const ifExists = itens.find(elemento => elemento.nome === nome.value)

  // CONDIÇÃO CASO ELE JÁ EXISTA
  if (ifExists) {
    itemAtual.id = ifExists.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === ifExists.id)] = itemAtual

  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1  : 0 

    criaElemento(itemAtual)
    
    // ITERANDO CADA ITEM E SALVANDO NO ARRAY
    itens.push(itemAtual)

  }



  // SALVANDO INFORMAÇÃO NO LOCALSTORAGE DO NAVEGADOR
  localStorage.setItem("itens", JSON.stringify(itens))
  

  // LIMPANDO CONTEUDO DO FORMULARIO APOS ENVIADO
  nome.value = ""
  quantidade.value = ""

})

  //CRIAR UM ELEMENTO ATRAVES DO JAVASCRIPT
function criaElemento(item) {

  // CRIANDO UM NOVO ELEMENTO NO HTML E ADICIONANDO UMA CLASSE AO NOVO ELEMENTO 
  const novoItem = document.createElement('li')
  novoItem.classList.add("item")

  // CRIANDO UM NOVO ELEMENTO NO HTML E ADICIONANDO UMA CLASSE AO NOVO ELEMENTO 
  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id // CRIA UM NOVO ELEMENTO NO HTML COMO DATA ATRIBUTES

  // INCLUINDO NUMERO ITEM COMO UM DEPENDENTE DE NOVO ITEM E INSERINDO NO HTML MAIS O NOME DO ITEM
  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  localStorage.setItem("itens", JSON.stringify(itens))
}