let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const URL = "http://localhost:3000/toys"
  const toyForm = document.querySelector(".add-toy-form");


  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(renderToys);
    })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.querySelector('input[name="name"]');
      const imageInput = document.querySelector('input[name="image"]');

      const newToy = {
        name: nameInput.value,
        image: imageInput.value,
        likes: 0, 
      };
     fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    }) .then((response) => response.json())
       .then((newToy) => {
            renderToys(newToy);
       }) 
      toyForm.reset();
  })
  
});


function renderToys(toy) {
  const toyCollection = document.querySelector("#toy-collection");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const img = document.createElement("img");
  img.src = toy.image;
  const p = document.createElement("p");
  p.textContent = toy.likes + " likes";

  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.textContent = "Like ❤️";
  button.addEventListener("click", (event => {
      toy.likes++;
      console.log(toy.likes);
      p.textContent = toy.likes + " likes";
      const updatedToy = {
        likes: toy.likes,
      };
      fetch('http://localhost:3000/toys/' + toy.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedToy),
      }) 
      
      .then((response) => response.json())
      .then((updatedData) => {
        p.textContent = toy.likes + " likes";
      })
      
  })
  )
  toyCollection.append(div);
  div.append(h2, img, p, button);
}