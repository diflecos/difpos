Address=function Address(address) { // address debe ser un objeto con los siguientes campos: name,street,town,zipcode,country
	this.name=address.name;
	this.street=address.street;
	this.town=address.town;
	this.zipcode=address.zipcode;
	this.country=address.country;
}