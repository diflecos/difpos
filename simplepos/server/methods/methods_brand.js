Meteor.methods({
	brandSave: function(brand) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(brand.validateAll())	{
			brand.save();
		} else {  
			throw new Meteor.Error("brand-validation-error","Falló la validación del brand "+brand,brand.getValidationErrors());
		}
		
		return brand;
	},
	brandRemove: function(brandId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		Brands.remove(brandId);
	},
});
