Store=function Store(store) {  // store debe ser un objeto con los siguientes campos:  name,currency,address,phone
	this.name=store.name;
	this.currency=new Currency(store.currency);
	this.address=new Address(store.address);
	this.phone=store.phone;
}