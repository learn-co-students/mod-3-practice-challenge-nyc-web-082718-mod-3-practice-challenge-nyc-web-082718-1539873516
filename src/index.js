document.addEventListener('DOMContentLoaded', () => {
  addEditListener()
  addSubmitListener()
  requestDogData()

})

const requestDogData = () => {
  fetch('http://localhost:3000/dogs')
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    renderDogTableData(json)
    // debugger
  })
}

const renderDogTableData = (dogJsonArray) => {
  const table = document.getElementById('table-body')
  dogJsonArray.forEach( (dog) => {
    const tableRow = makeTableRow(dog)
    table.appendChild(tableRow)
  })
}

const makeTableRow = (dog) => {
  const row = document.createElement('tr')

  const nameCell = document.createElement('td')
  nameCell.innerText = dog.name

  const breedCell = document.createElement('td')
  breedCell.innerText = dog.breed

  const sexCell = document.createElement('td')
  sexCell.innerText = dog.sex

  const editCell = document.createElement('td')
  const editBtn = document.createElement('button')
  editBtn.innerText = 'Edit Dog'
  editCell.appendChild(editBtn)

  row.appendChild(nameCell)
  row.appendChild(breedCell)
  row.appendChild(sexCell)
  row.appendChild(editCell)

  row.id = dog.id

  return row
}

const addEditListener = () => {
  const table = document.getElementById('table-body')
  table.addEventListener('click', (event) => {
    if (event.target && event.target.nodeName == 'BUTTON') {
      const row = event.target.parentElement.parentElement
      const dog = dogObjFromTr(row)
      // update form with info from this dog obj
      const form = document.querySelector('form')
      const inputs = form.querySelectorAll('input')
      form.setAttribute('dog-id', dog.id)
      inputs[0].value = dog.name
      inputs[1].value = dog.breed
      inputs[2].value = dog.sex
    }
  })
}

const dogObjFromTr = (rowElement) => {
  const tds = rowElement.querySelectorAll('td')
  return {
    'id': rowElement.id,
    'name': tds[0].innerText,
    'breed': tds[1].innerText,
    'sex': tds[2].innerText,
  }
}

const addSubmitListener = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const form = document.querySelector('form')
    const id = form.getAttribute('dog-id')
    const inputs = form.querySelectorAll('input')
    fetch('http://localhost:3000/dogs/' + id, {
      'method': 'PATCH',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify({
        'name': inputs[0].value,
        'breed': inputs[1].value,
        'sex': inputs[2].value,
      })
    })
    .then( (response) => {
      return response.json()
    })
    .then( (json) => {
      console.log(json)
      inputs[0].value = ''
      inputs[1].value = ''
      inputs[2].value = ''
      form.setAttribute('dog-id', '')
      reRenderTableWithReq()
    })
  })
}

const reRenderTableWithReq = () => {
  const table = document.getElementById('table-body')
  table.innerHTML = ''
  requestDogData()
}
