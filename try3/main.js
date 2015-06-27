/* ========= Model ========== */
'use strict';

(function(){

  
  var newCatName = document.getElementById('new-cat-name');
  var newCatImage = document.getElementById('new-cat-image');
  var newClickCount = document.getElementById('new-cat-count');
  var adminForm = document.getElementById('admin-form');

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
    ],
    adminFormVisible: false
  }

  /* ========= View ========== */
  var listview = {
    init: function(){
      this.nav = document.getElementById('nav');
      this.render();
    },

    render: function(){
      while (this.nav.firstChild) {
        this.nav.removeChild(this.nav.firstChild);
      }

      for(var i = 0; model.cats.length > i; i++){
        var catList = document.createElement('li');
        var catName = document.createTextNode(model.cats[i].name);
        catList.setAttribute('id', model.cats[i].name);
        catList.appendChild(catName);
        

        catList.addEventListener('click', (function(cat) {
          return function() {
            if(model.adminFormVisible){
              octopus.toggleAdmin();
            }
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

  var adminform = {
    init: function(){
      this.adminBtn = document.getElementById('admin-btn');
      this.adminBtn.addEventListener('click', function() {
        octopus.toggleAdmin();
      });

      var currentCat = octopus.getCurrentCat();
      newCatName.value = currentCat.name;
      newCatImage.value = currentCat.imgsrc;
      newClickCount.value = currentCat.count;

      adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        octopus.updateCat(octopus.getCurrentCat());
      });

      this.render();
    },
    render: function(){
      adminForm.style.display = 'none';
    }
  };


  /* ========= Octopus ========== */
  var octopus = {
    init: function(){
      model.currentCat = this.getCurrentCat() || model.cats[0];
      listview.init();
      catview.init();
      adminform.init();
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
    },
    toggleAdmin: function(){
      
      if(!model.adminFormVisible){
        adminForm.style.display = 'block';
      } else {
        adminForm.style.display = 'none';
      }

      model.adminFormVisible = !model.adminFormVisible;
    },
    updateCat: function(cat){
      cat.name = newCatName.value;
      cat.imgsrc = newCatImage.value;
      cat.count = newClickCount.value;
      
      var theCatToUpdate = objectFindByKey(model.cats, 'name', cat.name);

      theCatToUpdate.name = newCatName.value;
      theCatToUpdate.imgsrc = newCatImage.value;
      theCatToUpdate.count = newClickCount.value;

      listview.render();
      catview.render();
    }
  };

  /* ========== Helper ======== */
  function objectFindByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  octopus.init();

})();