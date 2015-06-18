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
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	},
	specialOffersForItems: function() {
		return SpecialOffers.find({applies_to: "item"});
	},
	specialOffersForOrderItems: function() {
		return SpecialOffers.find({applies_to: "order_item"});
	}
});

Template.category_form.events({
	"click #add_order_item": function(event) {
		event.preventDefault();
		
		name=$("#order_item_name").val();
		unit_price=$("#order_item_unit_price").val();
		unit_discount_name=$("#unit_discount_name").val();
		unit_discount_value=$("#unit_discount_value").val();
		unit_discount_reduction_type=$("#unit_discount_reduction_type").val();
		quantity=$("#order_item_quantity").val();
		order_item_discount_name=$("#order_item_discount_name").val();
		order_item_discount_value=$("#order_item_discount_value").val();
		order_item_discount_reduction_type=$("#order_item_discount_reduction_type").val();
		
		if(unit_discount_value>0) {
			if(unit_discount_reduction_type=="Amount")
				final_unit_price=unit_price-unit_discount_value;
			else if(unit_discount_reduction_type=="Percentage")
				final_unit_price=unit_price*(100-unit_discount_value)/100;
		} else {
			final_unit_price=unit_price;
		}
		
		price=quantity*final_unit_price;
		
		if(order_item_discount_value>0) {
			if(order_item_discount_reduction_type=="Amount")
				final_price=price-order_item_discount_value;
			else if(order_item_discount_reduction_type=="Percentage")
				final_price=price*(100-order_item_discount_value)/100;
		} else {
			final_price=price;
		}

		index=currentOrder.order_items.length==0?0:currentOrder.order_items[currentOrder.order_items.length-1].index+1;
		
		currentOrder=Session.get("currentOrder");
		currentOrder.order_items.push({
			"index": index,
			"name": name, 
			"unit_price": unit_price, 
			"unit_discount": {
				"name": unit_discount_name,
				"type": unit_discount_reduction_type,
				"value": unit_discount_value 
			},
			"final_unit_price": final_unit_price,
			"quantity": quantity, 
			"price": price,
			"discount": {
				"name": order_item_discount_name,
				"type": order_item_discount_reduction_type,
				"value": order_item_discount_value 
			},
			"final_price": final_price			
		});
		currentOrder.final_price=Math.round(parseFloat(currentOrder.final_price)+final_price*100)/100;
		Session.set("currentOrder",currentOrder);
	}, 
	"change #unit_special_offer_selector": function(event) {
		special_offer_id=event.target.value;
		special_offer=SpecialOffers.findOne({_id: special_offer_id});
		if(special_offer!=undefined) {
			$("#unit_discount_name").val(special_offer.name);
			$("#unit_discount_value").val(special_offer.value);
			$("#unit_discount_reduction_type").val(special_offer.reduction_type);
		} else {
			$("#unit_discount_name").val("");
			$("#unit_discount_value").val("");
			$("#unit_discount_reduction_type").val("");		
		}
	}, 
	"change #order_item_special_offer_selector": function(event) {
		special_offer_id=event.target.value;
		special_offer=SpecialOffers.findOne({_id: special_offer_id});
		if(special_offer!=undefined) {
			$("#order_item_discount_name").val(special_offer.name);
			$("#order_item_discount_value").val(special_offer.value);
			$("#order_item_discount_reduction_type").val(special_offer.reduction_type);
		} else {
			$("#order_item_discount_name").val("");
			$("#order_item_discount_value").val("");
			$("#order_item_discount_reduction_type").val("");		
		}
	}
});
