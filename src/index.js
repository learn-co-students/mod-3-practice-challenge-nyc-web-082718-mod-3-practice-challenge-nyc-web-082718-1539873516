let dogs;
document.addEventListener('DOMContentLoaded', () => {
 const dogForm = document.querySelector('#dog-form');
 debugger
  fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(jsonResp => {
    dogs = jsonResp;
   return addDog(jsonResp)
  }) //end of fetch

  dogForm.addEventListener('submit', (event) => {
    const dogNameInput = event.target.querySelector('name').value
    const dogBreedInput = event.target.querySelector('breed').value
    const dogSexInput = event.target.querySelector('sex').value
    let dogId = findDog(dogNameInput).id;
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dogNameInput,
        breed: dogBreedInput,
        sex: dogSexInput
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => {
      return showHTML(jsonResp)
    })
  }) //end of dogForm
})


function showHTML(json) {
  const tbody = document.getElementById('table-body')
  const dogTr = document.createElement('tr')
  dogTr.className = 'dog'
  const nameTd = document.createElement('td');
  nameTd.className = 'dog-name'
  nameTd.innerText = json.name
  const breedTd = document.createElement('td');
  breedTd.className = 'dog-breed'
  breedTd.innerText = json.breed;
  const sexTd = document.createElement('td');
  sexTd.className = 'dog-sex'
  sexTd.innerText = json.sex;
  const editTd = document.createElement('td');
  editTd.className = 'edit-dog'
  const button = document.createElement('button');
  button.className = 'dog-button'
  button.innerText = 'edit dog'
  dogTr.appendChild(nameTd);
  dogTr.appendChild(breedTd)
  dogTr.appendChild(sexTd);
  editTd.appendChild(button)
  dogTr.appendChild(editTd);
  tbody.appendChild(dogTr);
  return tbody;
}

function addDog(jsonResp) {
  jsonResp.forEach(function(dog){
    return showHTML(dog);
  })
}

function findDog(Dog) {
  return dogs.filter(function(dog){
    if (dog.name === dogName) {
      return dog;
    }
  })
} // end of findDog
// <tr><td>Dog *Name*</td>
// <td>*Dog Breed*</td>
// <td>*Dog Sex*</td>
// <td><button>Edit</button></td>
// </tr>`
//
//
//
// function updateHTML(jsonReps) {
//   const tr = document.createElement('tr')
//   tr.className = 'dog-tr'
//   document.createElement('td')
//   document.createElement('button')
//
// }
//
// <th class='padding center'>Name</th>
// <th class='padding center'>Breed</th>
// <th class='padding center'>Sex</th>
// <th class='padding center'>Edit Dog</th>
