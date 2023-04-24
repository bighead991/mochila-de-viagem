const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")


form.addEventListener("submit", (evento) => {
  // INTERROMPE O EVENTO PADRÃO POST DO FORMULARIO
  evento.preventDefault()

   criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)
})

  //CRIAR UM ELEMENTO ATRAVES DO JAVASCRIPT
function criaElemento(nome, quantidade) {

  // CRIANDO UM NOVO ELEMENTO NO HTML E ADICIONANDO UMA CLASSE AO NOVO ELEMENTO 
  const novoItem = document.createElement('li')
  novoItem.classList.add("item")

  // CRIANDO UM NOVO ELEMENTO NO HTML E ADICIONANDO UMA CLASSE AO NOVO ELEMENTO 
  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = quantidade

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += nome

  lista.appendChild(novoItem)

  console.log(lista)
}
