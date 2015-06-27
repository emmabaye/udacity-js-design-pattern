/* ========= Model ========== */
'use strict';

(function(){

  var model = {
    currentCat: null,
    cats: [
      {name: "Ait",
       imgsrc: "http://www.helpinghomelesscats.com/images/cat1.jpg",
       count: 0},
      {name: "Bop",
       imgsrc: "http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg",
       count: 0},
      {name: "Cal",
       imgsrc: "http://exmoorpet.com/wp-content/uploads/2012/08/cat.png",
       count: 0},
      {name: "Don",
       imgsrc: "http://www.helpinghomelesscats.com/images/cat.jpg",
       count: 0},
      {name: "Ema",
       imgsrc: "http://www.mycatspace.com/wp-content/uploads/2013/08/adopting-a-cat.jpg",
       count: 0},
    ]
  }

  /* ========= View ========== */
  var listview = {
    init: function(){
      this.nav = document.getElementById('nav');
      this.render();
    },

    render: function(){
      for(var i = 0; model.cats.length > i; i++){
        var catList = document.createElement('li');
        var catName = document.createTextNode(model.cats[i].name);
        catList.setAttribute('id', model.cats[i].name);
        catList.appendChild(catName);
        

        catList.addEventListener('click', (function(cat) {
          return function() {
            octopus.setCurrentCat(cat);
            catview.render();
          };
        })(model.cats[i]));

        this.nav.appendChild(catList);
      }
    }
  };
  
  var catview = {
    init: function(){
      this.catPhoto = document.getElementById('cat-photo');
      this.catName = document.getElementById('cat-name');
      this.clickCount = document.getElementById('click-count');

      this.catPhoto.addEventListener('click', function() {
        octopus.incrementCount();
      });
      
      this.render();
    },
    render: function(){
      var currentCat = octopus.getCurrentCat();
      this.catPhoto.setAttribute('src', currentCat.imgsrc);
      this.catName.innerHTML = currentCat.name;
      this.clickCount.innerHTML = currentCat.count;
    }
  };


  /* ========= Octopus ========== */
  var octopus = {
    init: function(){
      model.currentCat = this.getCurrentCat() || model.cats[0];
      listview.init();
      catview.init();
    },
    getCurrentCat: function(){
      return model.currentCat;
    },
    setCurrentCat: function(cat){
      model.currentCat = cat;
    },
    incrementCount: function(){
      model.currentCat.count++;
      catview.render();
    }
  };

  octopus.init();

})();