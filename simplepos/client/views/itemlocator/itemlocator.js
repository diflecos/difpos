Template.itemlocator.rendered=function() {
	$('#item-locator-tablist a[href="#'+PARAMS.ITEMLOCATOR_DEFAULTMETHOD+'-tab"]').tab('show');
	$('#item-locator-tablist a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
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
esta funci�n ordena las entradas seg�n el "level"
*/
function categorySelectionSortByLevel(categorySelection) {
	if(categorySelection!=undefined) {
		categorySelection.sort(function(a,b) {
			return a.level-b.level;
		});	
	} 
	return categorySelection;
}

/* Devuelve el parent de la �ltima categor�a seleccionada */
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
		/* Recuperamos el parent a partir de la estructura de la Session, para ello ordenamos por level y cogemos el �ltimo */
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
		catname=event.target.dataset.catname;		
		Session.set("selectedCategory",catname)
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
		Session.set("selectedCategory",catname)
		
		categorySelection=Session.get("categorySelection");
		if(categorySelection.length==0) 
			level=0;
		else	
			level=Math.max.apply(null,categorySelection.map(function(selcat){return selcat.level;}))+1;
			
		categorySelection.push({ "level": level, "name": catname,"category_id": id});
		Session.set("categorySelection",categorySelection);
	}
});

Template.category_form.helpers({
	categorySelected: function() {
		return Session.get("selectedCategory");
	},
	reductionTypesOptions: function() {
		var options="<option value=\"\" selected=\"selected\">No Reduction</option>";
		for(var i=0;i<OPTIONS.REDUCTION_TYPE.length;i++) {
			options+="<option value=\""+OPTIONS.REDUCTION_TYPE[i].value+"\">"+OPTIONS.REDUCTION_TYPE[i].label+"</option>"; 
		}
		return options;
	}
});

Template.category_form.events({
	"click #add_order_item": function(event) {
		event.preventDefault();
		name=$("#order_item_name").val();
		unit_price=$("#order_item_unit_price").val();
		quantity=$("#order_item_quantity").val();
		currentOrder=Session.get("currentOrder");
		currentOrder.order_items.push({"name": name, "unit_price": unit_price, "quantity": quantity, "price": quantity*unit_price});
		currentOrder.final_price=Math.round(parseFloat(currentOrder.final_price)+quantity*unit_price*100)/100;
		Session.set("currentOrder",currentOrder);
	}
});
