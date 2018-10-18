document.addEventListener('DOMContentLoaded', () => {

const tableContainer = document.getElementById('table-body')
const formContainer = document.getElementById('dog-form')
const dogName = document.getElementById("name")
const dogBreed = document.getElementById("breed")
const dogSex = document.getElementById("sex")
const dogRow = document.getElementById("dog-row")



  fetch('http://localhost:3000/dogs')
    .then((response) => {
      return response.json()
    })
    .then((dogObj) => {
      dogObj.forEach((myDog) => {
        let newDog = new Dog(myDog)
        tableContainer.innerHTML += newDog.render()
      })
    }) //end of then


    document.addEventListener("click", function(event){
        let editButtonId = event.target.id

        let foundDog = Dog.findById(parseInt(editButtonId)) //returns an object

        formContainer.innerHTML = foundDog.updateForm() //showing the dog in the form
    }) //end of event listener

    formContainer.addEventListener("submit", function(event) {
      event.preventDefault()
      debugger
      let dogId = event.target.lastElementChild.dataset.id

      let foundDog = Dog.findById(parseInt(dogId))

       const inputName = document.getElementById("name").value
       const inputBreed = document.getElementById("breed").value
       const inputSex = document.getElementById("sex").value

       const dogRow = document.getElementById(`${dogId}`)
       dogRow.innerHTML = `<tr>
                             <td>${inputName}</td>
                             <td>${inputBreed}</td>
                             <td>${inputSex}</td>
                             <td><button id="${foundDog.id}">Edit</button></td>
                             </tr>`

      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputName,
          breed: inputBreed,
          sex: inputSex
        })
      })
})








}) //end of DOM content loader
