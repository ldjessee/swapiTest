/*
Main Javascript file
*/
var people = []
// document.addEventListener('DOMContentLoaded', loadSWPeople);

// Dead Code for now.
function getSWData (swUrl) {
  var swapiRequest = new XMLHttpRequest()
  let jsonData = null
  swapiRequest.open('GET', swUrl, true)
  swapiRequest.addEventListener('load', function() {
    console.log('loading data: ' + Date.now())
    if (swapiRequest.status >= 200 && swapiRequest.status < 400) {
      jsonData = JSON.parse(swapiRequest.responseText)
      console.log('Response was : ' + JSON.stringify(jsonData, null, 2))
      detailSWPeople(jsonData)
    } else {
      console.log('Error: request: ' + swapiRequest.statusText)
    }
  })
  swapiRequest.send(null)
}

function listSWPeople (people) {
  console.log('People are: ' + JSON.stringify(people, null, 2))
  let personBegin = '<div class="person"><span class="link" onClick=getPerson("'
  let personEnd = '</span></div>'
  var peopleList = null
  let contentBlock = document.getElementById('content')
  contentBlock.innerHTML = null
  if (typeof people == 'undefined' && people == null) {
    peopleList = '<div><p>Test List</p></div>'
  } else {
    let peopleNum = people.length
    peopleList = '<div class="list">'
    for (let i = 0; i < peopleNum; i++) {
      //console.log('people[' + i + '] name is ' + people[i]['name'])
      peopleList = peopleList + personBegin + people[i]['url'] + '")>' + people[i]['name'] + personEnd
    }
    peopleList = peopleList + '</div>'
  }
  contentBlock.innerHTML = peopleList
}

function getPerson (personUrl) {
  // Get person after switching to getData function...
  let person = getSWData(personUrl)
  console.log('PersonUrl thru getData returned ' + JSON.stringify(person, null, 2))
  // detailSWPeople(person)
}

function detailSWPeople (person) {
  console.log('detailSWPeople ' + JSON.stringify(person, null, 2))
  let personDetail = null
  let contentBlock = document.getElementById('content')
  let beginLabel = '<span class="personLabel">'
  let endLabel = ':</span><span class="personAttribute">'
  let nameLabel = beginLabel + 'Name' + endLabel
  let heightLabel = beginLabel + 'Height' + endLabel
  let massLabel = beginLabel + 'Mass' + endLabel
  let hairLabel = beginLabel + 'Hair Color' + endLabel
  let skinLabel = beginLabel + 'Skin Color' + endLabel
  let eyeLabel = beginLabel + 'Eye Color' + endLabel
  contentBlock.innerHTML = null
  if (typeof person == 'undefined' && person == null) {
    personDetail = '<div><p>Person Detail</p></div>'
  } else {
    personDetail = '<div class="detail">'
    personDetail = personDetail + nameLabel + person['name'] + '</span><br />'
    personDetail = personDetail + heightLabel + person['height'] + '</span><br />'
    personDetail = personDetail + massLabel + person['mass'] + '</span><br />'
    personDetail = personDetail + hairLabel + person['hair_color'] + '</span><br />'
    personDetail = personDetail + skinLabel + person['skin_color'] + '</span><br />'
    personDetail = personDetail + eyeLabel + person['eye_color'] + '</span><br />'
    personDetail = personDetail + '</div>'
    personDetail = personDetail + '<div class="button" onClick="refreshList()">Return</div>'
  }

  contentBlock.innerHTML = personDetail

}

function refreshList () {
  listSWPeople(people)
}

window.onload = function () {
  var swapiRequest = new XMLHttpRequest()
  var swapiURL = 'https://swapi.co/api/people/'
  console.log('javascript loaded: ' + Date.now())

  //let people = getSWAPI()
  //console.log('People are: ' + JSON.stringify(people, null, 2))
  //listSWPeople(people)

  swapiRequest.open('GET', swapiURL, true)
  swapiRequest.addEventListener('load', function() {
    //console.log('loading data: ' + Date.now())
    if (swapiRequest.status >= 200 && swapiRequest.status < 400) {
      let swapiResponse = JSON.parse(swapiRequest.responseText)
      //console.log('Response was : ' + JSON.stringify(swapiResponse, null, 2))
      people = swapiResponse['results']
      //console.log('People are: ' + JSON.stringify(people, null, 2))
      listSWPeople(people)
    } else {
      console.log('Error: request: ' + swapiRequest.statusText)
    }
  })
  swapiRequest.send(null)
  /* event.preventDefault() */



  /*
  window.addEventListener(
    "hasChange",
    function () {router() }
  )
  router();
  */
}

