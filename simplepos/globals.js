// en esta variable global almacenamos los datos de la tienda
 
currentOrder={};   // En esta variable global guardamos el currentOrder y es con lo que operamos en cada momento. Cuando queremos refrescar la pantalla con los nuevos datos, simplemente salvamos este objeto en la Session y los templates que dependan de esa variable de Session se actualizarán

currency={};
currentOrderCurrency={};  // lo usamos para guardar el currency de una order cuando estemos haciendo un view o un print de esa order
brand={};
company={};
tax={};
store={}; 

navigation={}; // guarda el histórico de navegación del usuario
navigation=new Navigation();

