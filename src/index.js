document.addEventListener('DOMContentLoaded', () => {

  const tableBody = document.getElementById("table-body")
  const dogForm = document.getElementById("dog-form")
  console.log(dogForm)

  dogList = [];

  fetch('http://localhost:3000/dogs')
    .then((response) => {
      return response.json()
    })
    .then((dogObj) => {
      dogList = dogObj
      dogList.forEach((dog) => {
        tableBody.innerHTML += `<tr><td>${dog.name}</td>
                                  <td>${dog.breed}</td>
                                  <td>${dog.sex}</td>
                                  <td><button id="${dog.id}">Edit</button></td></tr>`
      })
    })

    document.addEventListener("click", function(event) {
      let dogEditId = parseInt(event.target.id)

      if(event.target.tagName === "BUTTON") {

        let foundDog = dogList.find((dog) => {
            return dog.id === dogEditId
          })

        dogForm.innerHTML = `<input id="name" type="${foundDog.name}" name="${foundDog.name}" placeholder="name">
                              <input id="breed" type="${foundDog.breed}" name="${foundDog.breed}" placeholder="breed">
                              <input id="sex" type="${foundDog.sex}" name="${foundDog.sex}" placeholder="sex">
                              <input id="submit" type="submit"value="Submit">
                              `

      dogForm.addEventListener("submit", function(event) {
        event.preventDefault()

        const inputName = document.getElementById("name").value
        const inputBreed = document.getElementById("breed").value
        const inputSex = document.getElementById("sex").value

        tableBody.innerHTML = `<tr><td>${inputName}</td>
                                <td>${inputBreed}</td>
                                <td>${inputSex}</td></tr>`

          let foundDog = dogList.find((dog) => {
                return dog.id === dogEditId
          })

        fetch(`http://localhost:3000/dogs/${foundDog.id}`, {
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



      }//end of if statement
  })






}) //end of DOM content loader
