Template.install.rendered=function() {

	
	root_id=Categories.insert({ name: "Inicio", shortdesc: "Inicio", desc: "Inicio", parent: null});
	
	up_id=Categories.insert({ name: "Partes de arriba", shortdesc: "Partes de arriba", desc: "Partes de arriba Partes de arriba Partes de arriba", parent: root_id});
	down_id=Categories.insert({ name: "Partes de abajo", shortdesc: "Partes de abajo", desc: "Partes de abajo Partes de abajo Partes de abajo", parent: root_id});
	
	Categories.insert({ name: "Camisas", shortdesc: "Camisas", desc: "Camisas", parent: up_id});
	Categories.insert({ name: "Camisetas", shortdesc: "Camisetas", desc: "Camisetas", parent: up_id});
	Categories.insert({ name: "Chaquetas", shortdesc: "Chaquetas", desc: "Chaquetas", parent: up_id});
	Categories.insert({ name: "Abrigos", shortdesc: "Abrigos", desc: "Abrigos", parent: up_id});
	Categories.insert({ name: "Blusas", shortdesc: "Blusas", desc: "Blusas", parent: up_id});
	Categories.insert({ name: "Tops", shortdesc: "Tops", desc: "Tops", parent: up_id});
	
	Categories.insert({ name: "Pantalones", shortdesc: "Pantalones", desc: "Pantalones", parent: down_id});
	Categories.insert({ name: "Leggings", shortdesc: "Leggings", desc: "Leggings", parent: down_id});
	Categories.insert({ name: "Shorts", shortdesc: "Shorts", desc: "Shorts", parent: down_id});
}