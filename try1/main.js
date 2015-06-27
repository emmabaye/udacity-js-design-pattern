
var cats = [
  {name: "Ait",
   img: "http://www.helpinghomelesscats.com/images/cat1.jpg",
   count: 0},
  {name: "Bop",
   img: "http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg",
   count: 0},
  {name: "Cal",
   img: "http://exmoorpet.com/wp-content/uploads/2012/08/cat.png",
   count: 0},
  {name: "Don",
   img: "http://www.helpinghomelesscats.com/images/cat.jpg",
   count: 0},
  {name: "Ema",
   img: "http://www.mycatspace.com/wp-content/uploads/2013/08/adopting-a-cat.jpg",
   count: 0},
];

var clickCount = 0;

// Create cat photos navigation
for(var i = 0; cats.length > i; i++){
  var allCatList = document.getElementById('nav');
  var catList = document.createElement('li');
  catList.onclick = showClickedPhoto;
  // catList.setAttribute("id", cats[i].name);
  var catName = document.createTextNode(cats[i].name);
  catList.appendChild(catName);
  allCatList.appendChild(catList);
}



// Create cat photo area 
function showClickedPhoto(){

  var largePhoto = document.getElementById('large-photo');
  var counter = document.getElementById('counter');

  while (largePhoto.firstChild) {
    largePhoto.removeChild(largePhoto.firstChild);
  }
  while (counter.firstChild) {
    counter.removeChild(counter.firstChild);
  }


  var clickedCat = objectFindByKey(cats, "name", this.innerText);

  var catHeader = document.createElement('h3');
  var catTitle = document.createTextNode(this.innerText);
  catHeader.appendChild(catTitle);

  var clickCounter = document.createElement('p');
  clickCounter.setAttribute("id", "count");
  var count = document.createTextNode(clickedCat.count);
  clickCounter.appendChild(count);

  var catimgElement = document.createElement('img');
  catimgElement.setAttribute("src", clickedCat.img);
  catimgElement.setAttribute("id", "cat-photo");
  
  largePhoto.appendChild(catHeader);
  counter.appendChild(clickCounter);
  largePhoto.appendChild(catimgElement);

  catimgElement.onclick = countPlus;
}

function objectFindByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}


// Click Counter
function countPlus(){
  clickCount++;
  document.getElementById('count').innerText = clickCount;
    
}