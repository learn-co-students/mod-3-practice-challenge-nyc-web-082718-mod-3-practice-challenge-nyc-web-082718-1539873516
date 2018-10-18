DOGS = "http://localhost:3000/dogs";

// helper fx
const renderDog = function(dog) {
  return `<tr data-id='${dog.id}'><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-btn">Edit Dog</button></td></tr>`;
}

document.addEventListener('DOMContentLoaded', event => {
  const table = document.getElementById('table-body');
  const dogForm = document.getElementById('dog-form');
  editing = false;

  // display all dogs
  fetch(DOGS)
    .then(resp => resp.json())
    .then(dogsJSON => {
      table.innerHTML = dogsJSON.map(dog => renderDog(dog)).join('');

      // btn to edit dog
      const editBtns = document.querySelectorAll('.edit-btn');
      editBtns.forEach(btn => {
        btn.addEventListener('click', event => {
          editing = true;
          const dogRow = event.target.parentNode.parentNode;
          DogId = dogRow.dataset.id;
          const currentName = dogRow.querySelectorAll('td')[0].innerText;
          const currentBreed = dogRow.querySelectorAll('td')[1].innerText;
          const currentSex = dogRow.querySelectorAll('td')[2].innerText;

          dogForm.name.value = currentName;
          dogForm.breed.value = currentBreed;
          dogForm.sex.value = currentSex;
        })})
    })

  // create or edit dog
  dogForm.addEventListener('submit', event => {
    event.preventDefault();
    const dogBody = JSON.stringify({
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value
    });

    if (editing) {
      fetch(`${DOGS}/${DogId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dogBody
      })
        .then(x => {
          fetch(DOGS)
            .then(resp => resp.json())
            .then(dogsJSON => {
              table.innerHTML = dogsJSON.map(dog => renderDog(dog)).join('');
            })
        })
    } else {
      fetch(DOGS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dogBody
      })
        .then(x => {
          fetch(DOGS)
          .then(resp => resp.json())
          .then(dogsJSON => {
            table.innerHTML = dogsJSON.map(dog => renderDog(dog)).join('');
          })
        })
    }
    event.target.reset();
    editing = false;
  })

})
