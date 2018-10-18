const allDogs = document.getElementById('table-body')

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

document.addEventListener("submit", e=>{
  e.preventDefault()
  let form = document.querySelector("#dog-form")
  let name =form.children[0].value
  let breed = form.children[1].value
  let sex =form.children[2].value
  let id =form.children[3].value
  patchDog(name, breed, sex,id)
  e.target.reset()
})

document.addEventListener("click", e=>{
  if (e.target.innerHTML === "Edit") {
    editDog(e.target.parentElement.parentElement)
  }
})

const fetchDogs = ()=>{
  fetch("http://localhost:3000/dogs")
    .then( res => res.json())
    .then( parsed => {
      for (let i = 0; i < parsed.length; i++) {
        allDogs.innerHTML += showDog(parsed[i])
      }
    })
}

const showDog = (dogObj)=>{
  return `<tr id="${dogObj.id}">
              <td>${dogObj.name}</td>
              <td>${dogObj.breed}</td>
              <td>${dogObj.sex}</td>
              <td><button>Edit</button>
              </td>
              </tr>
            `
}

const editDogLive=(dogObj)=>{
  return `
              <td>${dogObj.name}</td>
              <td>${dogObj.breed}</td>
              <td>${dogObj.sex}</td>
              <td><button>Edit</button>
              </td>
            `
}

const editDog = (dogRow) =>{
  let name = dogRow.children[0].innerText
  let breed = dogRow.children[1].innerText
  let sex = dogRow.children[2].innerText
  let id = dogRow.id
  fillEditForm(name, breed, sex, id)
}

const fillEditForm = (name, breed, sex, id) =>{
  let form = document.querySelector("#dog-form")
  form.children[0].value = name
  form.children[1].value = breed
  form.children[2].value = sex
  form.children[3].value = id
}

const patchDog = (name, breed, sex, id) =>{
  // debugger
  let currentDog = document.getElementById(`${id}`)
  fetch("http://localhost:3000/dogs/"+ id, {
    method: "PATCH",
    headers:{ "Content-type": "application/json"},
    body: JSON.stringify({
      "name": name,
      "breed": breed,
      "sex": sex
    })
  }).then(res=>res.json())
    .then(parsed=>{
      currentDog.innerHTML = editDogLive(parsed)
    })

}
