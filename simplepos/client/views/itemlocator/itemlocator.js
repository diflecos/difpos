Template.itemlocator.rendered=function() {
	$('#item-locator-tablist a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	
	Session.set("categorySelection",new Array());
}

Template.itemlocator.helpers({
	selectedCategories: function() {
		categorySelection=Session.get("categorySelection");	
		if(categorySelection!=undefined) {
			categorySelection.sort(function(a,b) {
				return a.level-b.level;
			});
			
			return Session.get("categorySelection");
		} else {
			return undefined;
		}
	},
	childCategories: function() { 
		/* Recuperamos el parent a partir de la estructura de la Session, para ello ordenamos por level y cogemos el último */
		categorySelection=Session.get("categorySelection");
		if(categorySelection.length==0) {
			parent=null;
		} else {			
			categorySelection.sort(function(a,b) {
				return a.level-b.level;
			});
			parent=categorySelection[categorySelection.length-1].category_id;
		}
		
		return Categories.find({"parent": parent});
	}
});

Template.categorySelector.events({
	"click a": function() {
		id=event.target.dataset.mongoid;  
		catname=event.target.dataset.catname;
		
		categorySelection=Session.get("categorySelection");
		if(categorySelection.length==0) 
			level=0;
		else	
			level=Math.max(categorySelection.map(function(selcat){return selcat.level;}));
			
		categorySelection.push({ "level": level, "name": catname,"category_id": id});
		Session.set("categorySelection",categorySelection);
	}
});