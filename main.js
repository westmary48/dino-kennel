const dinos = [
  {
    id: 'dino1',
    name: 'Rex',
    type: 'T Rex',
    age: 100,
    owner: 'Zoe',
    adventures: [],
    health: 100,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  },

  {
    id: 'dino2',
    name: 'Susan',
    type: 'T Rex',
    age: 1,
    owner: 'Mary',
    adventures: [],
    health: 1,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  },

  {
    id: 'dino3',
    name: 'Tim',
    type: 'T Rex',
    age: 45,
    owner: 'Luke',
    adventures: [],
    health: 45,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  },

];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId, textToPrint)
  selectedDiv.innerHTML = textToPrint;
}

const closeSingleViewEvent = () => {
  printToDom('single-view', '');
  printDinos(dinos);
}

const viewSingleDino = (e) => {
  const dinoId = e.target.closest('.card').id
  const selectedDino = dinos.find((currentDino) => dinoId === currentDino.id)
  console.log('selectedDino', selectedDino)

 let domString = ''
  domString+= '<button id="close-single-view" class="btn btn-danger">Close</button>'
  domString += '<div class"container">'
  domString+= '<div class = "row">'
  domString+= '<div class ="col-6">'
  domString+=`<img class="img-fluid" src="${selectedDino.imageUrl}" alt=""/>`
  domString+= '</div>'
  domString+= '<div class="col-6">'
  domString+= `<h2>${selectedDino.name}</h2>`
  domString+= `<p>Type: ${selectedDino.type}</p>`
  domString+= `<p>Age: ${selectedDino.age}</p>`
  domString+= `<p>Owner: ${selectedDino.owner}</p>`
  domString+= `<p>Health: ${selectedDino.health}</p>`
  domString+= '</div>'
  domString+= '</div>'
  domString+= '</div>'

 printToDom('kennel', '')
 printToDom('single-view', domString)
 document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent)
}

const singleDinoAddEvents = () => {
  const dinoViewButtons = document.getElementsByClassName('single-dino');
  for(let i = 0; i < dinoViewButtons.length; i++) {
    dinoViewButtons[i].addEventListener('click', viewSingleDino);
  }
}

const dinoHealth = (e) => {
  const dinoId = e.target.closest('.card').id;

  const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
  if(dinos[dinoPosition].health < 100) {
  dinos[dinoPosition].health += 1;
  printDinos(dinos);
  }
  // console.log('went over image', dinoPosition);
}

const deleteDinoEvents = (e) => {
  const dinoId = e.target.closest('.card').id
  const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
  dinos.splice(dinoPosition, 1);
  printDinos(dinos);
  // console.log('TRASHCAN')
}


const petEvents = () => {
  const dinoPetButtons = document.getElementsByClassName('dino-photo');
  for(let i = 0; i < dinoPetButtons.length; i++) {
    dinoPetButtons[i].addEventListener('mouseleave', dinoHealth);
  }
}

const deleteEvents = () => {
  const dinoDeleteButtons = document.getElementsByClassName('delete-dino');
  for(let i = 0; i < dinoDeleteButtons.length; i++) {
    dinoDeleteButtons[i].addEventListener('click', deleteDinoEvents);
  }
}

const printDinos = (dinoArray) => {
  let domString = '';
  for (let i =0; i < dinoArray.length; i++){
    domString += '<div class="col-4">';
    domString += `<div id="${dinoArray[i].id}"class="card">`;
    domString += `<img class="card-img-top dino-photo" src="${dinoArray[i].imageUrl}" alt="Card image cap">`;
    domString += '<div class="card-body">';
    domString += `  <h5 class="card-title">${dinoArray[i].name}</h5>`;
    domString += `  <p class="card-text">Health: ${dinoArray[i].health}</p>`;
    domString += '<button class="btn btn-info single-dino">View</button>'
    domString += '<button class="btn btn-danger delete-dino">Delete</button>'
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  }
  printToDom('kennel', domString);
  singleDinoAddEvents();
  petEvents();
  deleteEvents();
};

const newDino = (e) => {
  e.preventDefault();

  const brandNewDino = {
  id: `dino${dinos.length +1}`,
  name: document.getElementById('dino-name').value,
  type: document.getElementById('dino-type').value,
  age: document.getElementById('dino-age').value,
  owner: document.getElementById('dino-owner').value,
  adventures: [],
  health: 100,
  imageUrl: document.getElementById('dino-image').value,
  }
  dinos.push(brandNewDino);
  document.getElementById('new-dino-form').reset();
  document.getElementById('collapseOne').classList.remove('show');
  printDinos(dinos);
};


const init = () => {
  document.getElementById('submit-new-dino').addEventListener('click', newDino)
  printDinos(dinos)
}

init()