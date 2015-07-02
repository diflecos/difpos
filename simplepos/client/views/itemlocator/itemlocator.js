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
		$.each(aux,function(i,value) {
			if(aux[i].level<=level) {
				categorySelection.push(aux[i]);
			}		
		});
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
		unit_price=currentOrder.currency.convertDB(unit_price);
		unit_discount_name=$("#unit_discount_name").val();
		unit_discount_reduction_type=$("#unit_discount_reduction_type").val();
		unit_discount_value=$("#unit_discount_value").val();
		quantity=$("#order_item_quantity").val();
		order_item_discount_name=$("#order_item_discount_name").val();
		order_item_discount_value=$("#order_item_discount_value").val();
		order_item_discount_reduction_type=$("#order_item_discount_reduction_type").val();
		
		if(unit_discount_value>0) {
			switch(unit_discount_reduction_type) {
				case "Amount":
					unit_discount=new AmountDiscount(unit_discount_name,currentOrder.currency.convertDB(unit_discount_value));				
					break;
				case "Percentage":
					unit_discount=new PercentageDiscount(unit_discount_name,unit_discount_value);				
					break;
				default:
					unit_discount=undefined;				
					break;
			}
		} else {
			unit_discount=undefined;
		}
		
		if(order_item_discount_value>0) {
			switch(order_item_discount_reduction_type) {
				case "Amount":
					order_item_discount=new AmountDiscount(order_item_discount_name,currentOrder.currency.convertDB(order_item_discount_value));				
					break;
				case "Percentage":
					order_item_discount=new PercentageDiscount(order_item_discount_name,order_item_discount_value);				
					break;
				default:
					order_item_discount=undefined;				
					break;
			}
		} else {
			order_item_discount=undefined;
		}		
		
		order_item=new OrderItem(name,unit_price,unit_discount,quantity,order_item_discount);
		currentOrder.addOrderItem(order_item);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
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
