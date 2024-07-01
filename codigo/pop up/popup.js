const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sMateria = document.querySelector('#m-materia')
const sAssunto = document.querySelector('#m-assunto')
const sStatus = document.querySelector('#m-status')
const btnEditar = document.querySelector('#btnEditar')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sMateria.value = itens[index].materia
    sAssunto.value = itens[index].assunto
    sStatus.value = itens[index].status
    id = index
  } else {
      sMateria.value = ''
      sAssunto.value = ''
      sStatus.value = ''
  }

}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.materia}</td>
    <td>${item.assunto}</td>
    <td>${item.status}</td>
    <td class="acao">
    
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

  if (sMateria.value == '' || sAssunto.value == '' || sStatus.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].materia = sMateria.value
    itens[id].assunto = sAssunto.value
    itens[id].status = sStatus.value
  } else {
    itens.push({'materia': sMateria.value, 'assunto': sAssunto.value, 'status': sStatus.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()