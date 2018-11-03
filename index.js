
document.addEventListener('DOMContentLoaded', () =>{
  console.log('body', body)
  console.log(humzah)
  /*******************************************************
  * All of the variables & data
  *******************************************************/
  let allMonsters = [];
  let page = 1;
  const monsterContainer = document.getElementById('monster-container');
  const backButton = document.getElementById('back');
  const forwardButton = document.getElementById('forward');
  const createButton = document.getElementById('create');
  const monsterForm = document.getElementById('monster-form');

  /*******************************************************
  * On load fetch actions
  *******************************************************/
  fetch('http://localhost:3000/monsters')
    .then((responseObject) => responseObject.json())
    .then((monJSONData) => {
    allMonsters = monJSONData;
    console.log(`${allMonsters.length} loaded`)
    renderMonsters(page);
  })

  /*******************************************************
  * Event Listeners
  *******************************************************/
  backButton.addEventListener('click', (event) => {
    console.log("trying to go back");
    if (page <= 1) {
      alert("No Monsters That Way");
    }
    else {
      page--;
      renderMonsters(page);
    }
  })

  forwardButton.addEventListener('click', (event) => {
    console.log("trying to go foreward");
    console.log(allMonsters.length);
    if ((page * 50) > allMonsters.length ) { //- 50
      alert("No Monsters That Way");
    }
    else {
      page++;
      renderMonsters(page);
    }
  })

  monsterForm.addEventListener('submit', (event) => {
    console.log("Clicking Button");
    event.preventDefault();

    if (!!event.target.name.value && !!event.target.age.value && !!event.target.description.value){
      postMon(event);
    }
    else {
      alert("Invalid Values");
    }
  })

  /*******************************************************
  * Helper Functions
  *******************************************************/
  function renderMonsters(page){
    console.log(`Rendering Page: ${page}`);
    let lastMon = page * 50;
    let firstMon = lastMon - 50;

    const monsOnPage = allMonsters.slice(firstMon, lastMon);

    let newMonPage = '';
    monsOnPage.forEach((mon) => {
      newMonPage +=
      `
        <div>
          <h2>${mon.name}</h2>
          <h4>${mon.age}</h4>
          <p>${mon.description}</p>
        </div>
      `
    });
    monsterContainer.innerHTML = newMonPage;
  }

  const postMon = (event) => {
    console.log("Trying to add a Monster");
    //debugger;
    const newName = event.target.name.value;
    const newAge = event.target.age.value;
    const newDescription = event.target.description.value;

    fetch('http://localhost:3000/monsters',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          "name": newName,
          "age": newAge,
          "description": newDescription
        })
      }
    )
    .then(response => {
      return response.json();
    })
    .then(json => {
      allMonsters.push(json);
      monsterForm.reset();
      renderMonsters(page);
    })
  }

})
