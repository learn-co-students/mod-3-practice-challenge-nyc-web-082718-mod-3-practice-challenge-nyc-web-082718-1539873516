dogList = []

class Dog {
constructor(dogObj) {
  this.id = dogObj.id,
  this.name = dogObj.name,
  this.breed = dogObj.breed,
  this.sex = dogObj.sex
  dogList.push(this)
}

render() {
  return`<tr id="${this.id}">
          <td>${this.name}</td>
          <td>${this.breed}</td>
          <td>${this.sex}</td>
          <td><button id="${this.id}">Edit</button></td>
          </tr>`
}

//find the dog's id
static findById(id) {
  return dogList.find((dog) => {
    return dog.id === id
  })
} //end of static method


updateForm() {
  return`<input id="name" type="${this.name}" name="${this.name}" value="${this.name}" placeholder="name">
              <input id="breed" type="${this.breed}" name="${this.breed}" value="${this.breed}" placeholder="breed">
              <input id="sex" type="${this.sex}" name="${this.sex}" value="${this.sex}" placeholder="sex">
              <input data-id="${this.id}" type="submit" value="Submit">`
}









} //end of class
