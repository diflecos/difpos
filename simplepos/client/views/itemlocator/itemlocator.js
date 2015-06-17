Template.itemlocator.rendered=function() {
	$('#item-locator-tablist a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	
	Session.set("categorySelection",new Array());
}

/* 
Dado un array de objetos como el siguiente: 
categorySelection=[
  { "level": 0, "name": "Inicio", "category_id": "dST8LFTkRwRCkmrxK" },
  { "level": 1, "name": "Partes de arriba", "category_id": "Y8dgxKCwp7fDWeLEK" },
  { "level": 2, "name": "Blusas", "category_id": "6cNrxvxdXztNxWqQi" }
]
esta función ordena las entradas según el "level"
*/
function categorySelectionSortByLevel(categorySelection) {
	if(categorySelection!=undefined) {
		categorySelection.sort(function(a,b) {
			return a.level-b.level;
		});	
	} 
	return categorySelection;
}

/* Devuelve el parent de la última categoría seleccionada */
function lastCategorySelectionParentId(categorySelection) {
	if(categorySelection===undefined) {
		return null;
	} else if(categorySelection.length==0) {
		return null;
	} else {			
		categorySelectionSortByLevel(categorySelection);
		return categorySelection[categorySelection.length-1].category_id;
	}
}

Template.itemlocator.helpers({
	selectedCategories: function() {
		categorySelection=Session.get("categorySelection");	
		return categorySelectionSortByLevel(categorySelection);
	},
	childCategories: function() { 
		/* Recuperamos el parent a partir de la estructura de la Session, para ello ordenamos por level y cogemos el último */
		categorySelection=Session.get("categorySelection");
		return Categories.find({"parent": lastCategorySelectionParentId(categorySelection)});
	},
	isThereChildCategories: function() { 
		categorySelection=Session.get("categorySelection");
		return Categories.find({"parent": lastCategorySelectionParentId(categorySelection)}).count()>0;
	}
});

Template.itemlocator.events({
	"click a.categorySelected": function(event) {
		level=event.target.dataset.level;  
		aux=Session.get("categorySelection");	
		categorySelection=new Array();
		for(var i=0;i<aux.length;i++) {
			if(aux[i].level<=level) {
				categorySelection.push(aux[i]);
			}
		}
		Session.set("categorySelection",categorySelection);
	}
});

Template.categorySelector.events({
	"click a.categorySelector": function(event) {
		id=event.target.dataset.mongoid;  
		catname=event.target.dataset.catname;
		
		categorySelection=Session.get("categorySelection");
		if(categorySelection.length==0) 
			level=0;
		else	
			level=Math.max.apply(null,categorySelection.map(function(selcat){return selcat.level;}))+1;
			
		categorySelection.push({ "level": level, "name": catname,"category_id": id});
		Session.set("categorySelection",categorySelection);
	}
});