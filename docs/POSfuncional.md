## Temas pendientes 
- hay que encontrar alguna herramienta que nos permita documentar los workflows concretos de cada objeto (qué estados hay, qué transiciones entre ellos, qué condiciones tienen que cumplirse para que se realicen las transiciones y qué acciones se lanzan antes o después de la transición) --> si además de documentar los workflows nos permite generar algún tipo de código ya sería la caraba
- en general queda pendiente identificar cómo se va a estructurar la seguridad y la redundancia de los datos: por ejemplo, dos usuarios distintos sin la menor relación pueden crear dos categorías con el  mismo nombre por ejemplo (lo cual crea una redundancia un poco). Cada una de ellas sin embargo puede servir a cosas muy muy diferentes a pesar de tener el mismo nombre y por otro lado un usuario no podrá acceder a gestionar más que su categoría, nunca ver o modificar o añadir o borrar cosas a la del otro --> esto implica por un lado un aumento tremendo del tamaño de las tablas y por otro unos chequeos de seguridad casi a cada instante --> seguro que no nos merece la pena subdividir la apli de pos de la apli de servicios a pymes????  igual lo que podemos idear es algún mecanismo de comunicación entrambas para facilitar un poco el tema (yo qué sé, igual poder definir usuarios comunes o algo así o que para generar una factura el pos se conecte a la otra apli y le pase los datos con los que hay que generarla...  el tema de juntar en una misma apli tanto el pos como los servicios a pymes complica todo bastante!!!
- como identificar claramente qué objetos ha ido creando cada usuario y cuales tiene derecho a consultar/modificar/etc (un usuario podrá ver registros que no haya creado directamente siempre y cuando pertenezcan a su ¿empresa/marca? y ésta le haya dado permiso para ver/modfiicar/etc) --> en ppio los usuarios deberían ir ligados a una marca (o tal vez mejor a varias marcas creadas por una misma empresa) y potencialmente deben poder ver todo lo de esa marca y nada de lo de otras marcas (lo suyo en todo caso es que este dato de a qué marca/s puede acceder un user esté disponible en todo momento en la caché del navegador y si se produce alguna modificación de estas asociaciones que el sistema deslogue al usuario y le obligue a entrar otra vez) --> ver también como indicar quien es (quienes son!?) los propietarios de la marca. La idea es que una persona simplemente se registre en la web introduciendo sus datos de persona y de usuario que quiere tener. A partir de ahí se puede logar y puede crear sus propias cosas (su marca, su estructura de empresa, etc, etc) pero no puede ni ver ni modificar lo que hayan creado los demás --> esto implica tener un seguimiento de quien ha creado qué (por ejemplo a través del primer registro del histórico del workflow (aunque puede haber muchos objetos que no tengan un workflow asociado y que por lo tanto no pueda determinarse quién lo creó... por ejemplo una marca mismamente no tiene porqué tener un workflow asociado...)  --> en concreto hay que pensar que para que una persona pueda hacer una factura de su empresa a otra tiene que poder crear ambas 2 empresas y acceder a sus datos (tanto él como cualquier otra persona que trabaje con él). También hay que tener en cuenta que las empresas deben poder estar repetidas porque se puede dar el caso de dos empresas diferentes, A y B, que quieran poder facturar a una tercera, C. En este caso A da de alta C para poder hacer la factura y dado que B no puede ver C (porque lo ha creado A) debe volver a crear C de nuevo (es decir, un nuevo registro con los mismos datos). La alternativa es que B pudiera ver los datos de C que ha creado A...  pero no convence mucho porque podría dar lugar a que la gente pudiera saber a qué empresas facturan los demás... otra posibilidad es que cada persona que dé de alta algún dato de empresa indique si quiere o no que esos datos estén disponibles públicamente (en ese caso el lío puede venir de que el primero que dé de alta a una empresa no lo haga bien, no introduzca todos los datos o lo que sea... y de todas formas seguro que nadie permite compartir)
- es posible que los datos de auditoría se puedan generar en una tabla aparte que sirva para todos los objetos del sistema (es decir, una tabla que referencie la tabla, el id y le añada los datos de created_by, created_on, lastmod_by, lastmod_on) --> seguro que si lo hacemos así podemos definir algún tipo de behaviour/componente o algo así en plan transversal --> el problema puede venir de que esa tabla crezca a lo bruto (a tener en cuenta que tiene que tener buen rendimiento porque esos datos, por lo menos el created_by, se van a utilizar con mucha frecuencia para determinar los permisos de acceso  --> tema a tener en cuenta: si a una persona le quitamos o añadimos o modificamos un tfno o address o email, eso no genera una modificación en el registro correspondiente de person pero sin embargo sí podríamos considerar que la fullperson se habría modificado --> eso implica que person no registraría la modificación en el lastmod_by o el lastmod_on pero realmente sí sería interesante saber que la fullperson ha sido modificada  -->  fullperson 
- terminar de ver el tema de la facturación de servicios (añadir categorías, y desglose de servicios en otros más simples, por ejemplo), el tema de las notificaciones (que quede registrado a qué dirección, tfno, address, etc se hizo la comunicación, quien la hizo, si tenemos constancia de que se recibió o no, si tenemos algún doc asociado)
- ver también si sacamos los datos de los precios a una tabla por separado (precio base, tax, final price, currency, etc)
[ ] qué diferencia hay entre el delivery (entrega) y el shipping_service (transporte de mercancía)? el delivery en ppio lo hacemos nosotros y el shipping_service es algo que hace un carrier cualquiera 
	--> puede un delivery estar asociado a varios shipping services?? en ppio pudiera ser que sí si el carrier no hubiera acertado a hacer la entrega y hubiéramos tenido que contratar a otro que completara la operación
	--> puede un delivery NO estar asociado a un shipping_service? en ppio sí por las entregas en tienda por ejemplo... (o eso se considera shipping_service? yo diría que no)
	--> en ppio parece que el delivery debería de indicar claramente a quien hay que hacer la entrega, en qué dirección, tal vez la dirección de partida... y en todo caso si para llevarlo a cabo necesitamos un shipping_service pues se contrata con el carrier y que herede todos estos datos del delivery
	--> a nivel de pagos nosotros está claro que tenemos que pagar el shipping_service al carrier pero luego también podemos ponerle un precio al delivery para que el cliente nos lo pague a nosotros...  (y ambos precios y ambos pagos pueden ser diferentes sea para cargarle un sobrecoste a un servicio que gestionamos nosotros, sea para obsequiar al cliente con una oferta sobre este servicio absorbiéndole una parte del coste)
- los cash-in/cash-out no deberían estar asociados a transacciones de tipo cash por coherencia?
- Ver la forma de importar facturas/albaranes de manera automática (ver qué formato deben tener) --> ver también la forma de registrar en el sistema que alguno de esos items viene con tara o que falta...
- Ver si merece la pena modelar los procesos básicos (order, sale, invoice, delivery, etc, etc) de manera abstracta, es decir, sin tener en cuenta el uso concreto que le vayamos a dar. Luego veremos cómo tiene que ser la UI para acercar la terminología al usuario. Es decir, un item debe venir ligado a un pedido (en este caso el cliente somos nosotros y el supplier ellos) y marchar ligado a otro pedido (en este caso el cliente es la persona que compra en la tienda y el supplier somos nosotros). Ambos pedidos tienen ligado un albarán y una factura (que puede emitirse o no).  --> reescribir un poco la documentación en función de estos cambios
- Lo mismo que en las store tenemos repertoriados todos los point_of_sale que pueden existir (o sea, todos los pcs desde los que se puede ejecutar la apli de POS y con permisos por empleada para que solo se puedan conectar al que están autorizadas a utilizar) también deberíamos posiblemente repertoriar todos los puestos de almacén que pueden utilizar la herramienta de gestíón de stock e incluso todos los puestos móviles de verificación de inventario que se usen en tiendas. 
- como seguir los movimientos de stock de un almacén a otro? existen una especie de "pedidos internos" (orders de type 'internal') con sus albaranes asociados pero sin pago, ni factura ni nada --> bueno, puede que sí que haya un pago: el del delivery!
- Poner un modo de "inventario" en la aplicación POS que permita ir escaneando producto a producto y que finalmente saque las diferencias entre lo que hay realmente y lo que suponía el sistema que debería haber y que proponga la corrección del stock y la identificación del stock "desaparecido" como robo u otro concepto a elegir
- Scanear y que se abra una nueva venta, seguir scaneando y que se añadan los productos automáticamente
- Multiventa o venta en espera 
- Sistema de fidelización de clientes
- Estadisticas (ver de que forma se pueden generar informes un poco a medida y luego configurar 4-5 que sean útiles dejando abierta la puerta a que cada usuario se configure un poco lo que necesite)
- Facturación electronica (facturae) para la administración
- Gestion de temporadas --> esto igual es fácil de implementar mediante categorías (usando una categoría para cada temporada y ya)... hay algo especifico a tener en cuenta?
- Encontrar alguna herramienta sencilla que nos permita mantener la doc de los workflows de los objetos básicos del sistema

## Technical
### Field names
Deberiamos llamar los ids de cada tabla como la tabla? por ejemplo product_id en lugar de solo id para la tabla product --> esto puede ayudar a buscar en todo el código donde se hace referencia a tal o cual campo de tipo id  -->  las guidelines de yii dicen que mejor id a secas

[ ] Asegurarnos que no se usan palabras reservadas como nombres de columnas (date?, time?, user?...)

### Constraints
Las FK options de todo el modelo: on delete/update: cascade  --> pero en ppio la idea es borrados lógicos

### Relaciones entre tablas
Hay que nombrar adecuadamente las relaciones entre tablas? en ppio no, los nombres que se generan en las relations en ppio no tienen que ver...

### i18n
Articulo interesante sobre cómo implementar la i18n: http://www.yiiframework.com/wiki/243/how-to-translate-and-do-the-translations-the-easy-way/

### Files/Images
Cada fichero en el sistema tendrá un registro en la tabla file y ese registro apuntará a un file_type, que a su vez tendrá varios file_formats asociados. 

Por otro lado, cada business_object del sistema tiene asociado uno o varios file_types que puede recibir. Así que en el momento de la creación de una nueva instancia de business_object sólo se podrán subir ficheros que cumplan con alguno de los file types. Por ejemplo, los productos tendrán el file_type "imagen_de_producto" asociado asi que permitirán que se suban solo ficheros de ese tipo para asociarle. 

[x] Como validamos una imagen antes de subirla? Cuando sabemos que un business_object va con imagen asociada buscamos en la tabla de business_object qué file_types puede recibir. De ellos identificamos los que tengan el flag is_image=1 y recuperamos los valores de min_width/min_height, etc

[ ] Cuando un mismo business_object puede tener asociadas imágenes de distinto tipo, cómo sabemos qué restricciones aplican a cada campo? --> por ejemplo en el caso de un producto podemos tener las imágenes superampliadas, las de tamaño normal que se ven en la pág de producto y también algún thumbnail para visualizar en el carrito de la compra --> igual la pregunta es más bien cómo saber una vez que se han subido imágenes de todos los tamaños cual es de qué tipo para mostrarlas donde deban aparecer? Realmente todo el problema viene de que no haya tipos predefinidos para ciertas cosas: por ejemplo si supiésemos los nombres concretos de los tipos de fichero que va a utilizar un producto sería simplemente hardcodearlos y ya --> igual los podemos poner en el fichero de config o simplemente fijar los nombres y hardcodear --> otra posibilidad sería que la tabla de business_object además de referenciar las tablas también contuviese estos datos en registros sin tabla asociada pero no está claro

[ ] asegurarse que todas las tablas que estén enlazadas con file lleven las imágenes como opcionales (NULLables)

### Audit Fields
[ ] A que tablas les añadimos los audit fields? --> lo ideal sería a todas absolutamente pero eso implicaría engordar mucho mucho el modelo --> VERLO A LA LUZ DE LOS WORKFLOWS (a priori los workflows dan una info bastante apropiada pero no lo suficientemente detallada: por ej, caso de una modifición de los datos sin que haya un cambio de estado no se reflejaría...  --> no hay alguna forma de incluir este tipo de modificaciones en el histórico del workflow?)

### Otros
Para el public id de las orders u otros: lo mejor es sumar una cantidad fija (por ejemplo 28494992, configurable o algo) y luego el num resultante hacerle un scramble según un diccionario específico de la aplicación (configurable también aunque da un poco igual). Lo de sumar el numero es para que el primer pedido no quede como   uuuuuuuue o algo así por los 0s del ppio

Datos a mantener en la sesion del navegador: user_id, thumbnail del user, idioma del user, store_id, datos del brand, profile_id, session_id  --> todo esto debería posiblemente implementarse a través de un ApplicationComponent que permitiese acceder a estos datos de manera trivial como \Yii::app()->store  o  \Yii::app()->session  o algo así --> a tener en cuenta que puede haber confusion entre los conceptos propios (user, session, profile, etc) con los específicos de Yii!!

En las tablas address, phone, email, no aparece el id de la person porque eso hace que no se puedan asociar a una tienda o edificio por ejemplo sin que haya una persona de por medio. El problema viene de que una persona pueda tener varios phones o emails... 

Mismo problema para la tabla de comentarios... para que un objeto tenga varios comentarios (que sería muy interesante), la tabla debe incluir el id del objeto al que se hace referencia pero eso implica que son ya comentarios específicos de ese objeto y no es una tabla reutilizable. Idem con los ficheros... (por ejemplo tanto los productos como las categorías deberían poder tener varias imágenes)

Para los casos de file, comment, phone/email/address...  --> es mejor tener una única tabla y luego relaciones many-many (con sus tablas XXX_has_YYY) o es mejor tener tablas específicas (person_comment, session_comment, person_address, warehouse_address, etc)? a priori el mejor enfoque parece el de una única tabla con sus XXX_has_YYY pero no está muy claro el porqué --> puede que dependa un poco de si los elementos pueden ser reutilizables... (pero a priori no hay nada que pueda ser reutilizable... dos personas no van a vivir en general en la misma dirección ni van a tener el mismo email o tfno y de los comments ni hablamos)


## General
### Amounts y currency
Es necesario cada vez que indiquemos una cantidad en una tabla ponerle también el currency en el que se ha hecho? sería interesante pero aún así cómo lo hacemos, con el id del currency o con el simbolo o con qué? --> con el id del currency? Si lo ponemos en cada tabla el modelo engorda mucho y si no lo ponemos estamos arriesgando que un pequeño cambio a nivel global de la region nos joda todas las cifras de la cadena...  --> lo ponemos siempre en todos los sitios que aparezca una cantidad

## Application structure (TODO)
Como se integran todos los POS? en ppio todos tiran contra el central que tiene absolutamente toda la info. luego aparte, como backup, habrá unos POS super-simplificados en tienda con su propio modelo de datos y unos jobs de sincronización. El supersimplificado tendrá solo las tablas siguientes: la tabla de tiendas, la de usuarios, una tabla de order_items en los que se recogen los items que se venden y poco más --> la vendedora escaneará cada item para grabar su código e introducirá el precio de venta aplicando ella misma los descuentos, etc. Atencion, los tickets que se generen deben tener algún tipo de identificación para saber un poco de donde salen. 
Lo ideal es que exista una especie de lanzadera para abrir el POS, que compruebe si hay o no conexión con la bbdd central, si hay conexión hacemos una sincronización y abrimos el POS en red y si no hay conexión abrimos el POS local

- Aplicacion de gestion de stock para los almacenes: aquí se recepcionarán los pedidos a los proveedores, se verificarán los albaranes y se dará de alta la estructura de productos y categorías para poder etiquetar cada cosa y luego escanearlas en el POS
- POS de red --> en local solo la UI, los datos siempre en global 
- POS sin red --> se tendría que descargar en algún momento que sí hubiera red. tiene que ser super super simple (lectura de los códigos de los artículos, meter descuentos a mano, meter grupos de productos a mano, permitir la venta con los diferentes medios de pago y ya, y algún botón de sincronizar
- Aplicacion central de estadísticas (para gestores de alto nivel, por ejemplo el CEO o los supervisores de área o auditores)
- Aplicacion de gestion avanzada (para los informaticos que controlan el cotarro)
- Aplicacion de la web de servicios a pymes
- Jobs de sincronización corriendo cada 5 mins que sincronicen la info necesaria a cada tienda, prinicipalmente usuarios/perfiles/permisos de cada tienda, productos en venta, ventas realizadas, etc --> a tener en cuenta que cualquier fallo de la sincro a nivel de usuarios/perfiles/permisos jode la tienda bien --> las sincros igual se pueden hacer solo al cierre de la jornada o a petición del administrador tabla a tabla  
- Jobs de facturación para servicios a pymes (para cobrar las licencias contratadas!) --> son procesos que en ppio se lanzarán a mano (vamos, que igual no son jobs como tal)
- A nivel de modelo de datos otra posibilidad es dividir el modelo en 2 partes, una que resida en local con todo lo necesario para el POS y otra con todo lo necesario para la gestión global de la tienda. Ambas partes tendrán algunos solapes en algunas tablas y será lo que se ocupe de sincronizar el job/s  --> a priori no se me ocurre qué datos podrían ser inutiles a nivel global... así que los modelos serían idénticos prácticamente  --> igual a nivel de POS no se necesita conocer toda la estructura de la empresa, tiendas, etc aunque eso no permitiría buscar un prod a ver en qué tienda está...  por otro lado tener toda la info de todo al 100% en una tienda es un riesgo importante en caso de que roben y se lleven el pc o en caso de una auditoría. Igual se puede apañar para que cada tienda tenga solo lo que necesita pero que puedan lanzar consultas en red si fuera necesario
- Para evitar caidas de toda la red de POSes cuando haya una nueva versión, etc, sería interesante deployar la nueva versión en un sitio y dejar la antigua en otro sitio y simplemente hacer que una o dos tiendas medio representativas prueben la nueva version durante un tiempo antes de cambiarlas todas
- A tener en cuenta que para las sincronizaciones será necesario ampliar el modelo de datos con alguna cosa más (algún flag que marque si tal o cual registro se ha sincronizado, alguna tabla que controle la sincro de todas las demás,...)

### POS simplificado (standalone sin red)
Para que el POS supersimplificado sea aún más simple igual podemos no tener sincronización de usuarios y meter esas ventas como un usuario genérico (offline_user). Igual luego la aplicación puede tener algún mecanismo para asignar todas esas ventas del offline_user a un usuario (por ejemplo en el momento de importarlas). Lo bueno de este enfoque es ques implica no tener toda la info de usuarios del sistema en un pc local que pueden robar y hackear. Otra posibilidad es que en lugar de tener un job de sincronización hacer una exportación csv e importarla a mano y una vez integrados los datos borrarlos también a mano del POS afectado. La vendedora debe poder: meter su nombre (sin necesidad de logarse con su usuario), crear nuevas ventas, introducir a mano o con escaner los códigos de los productos, introducir a mano las descripciones de los productos (aunque esto se use para imprimir en el ticket, porque para el sistema lo único que contará será el código del artículo), introducir a mano los precios de los productos (con sus descuentos ya incluidos), introducir cupones, introducir datos de pagos, sacar el total e imprimir el ticket. También debería de haber una gestión básica de sesión (con el user asociado a NULL o a uno predefinido) y se deben soportar el cash-in y cash-out. Otra cosa que es importante es que se soporte una referencia a la tienda por si se jode el sistema entero que luego se pueda saber a qué tienda corresponde cada venta. Las reservas en principio que las hagan a mano y luego las integren en el sistema y lo mismo para las devoluciones... aunque no está claro cómo se les genera el coupon correspondiente (igual se les devuelve la pasta y ya)

### POS UI
Login > Jumbotron con msgs > Inicio 
	> Admin (solo resp tienda)
	> Nueva venta > Introducir items (les sale la lista de promos que pueden elegir, seleccionar promo y artículos correspondientes a la promo) > Pagar (seleccionar metodo y hacer pago y así hasta llegar al total) > Se cobra al cliente > Imprimir recibo/factura > Inicio
	> Devolucion > Introducir num venta (impreso en recibo) > Mostrar los items de la venta y seleccionar los que se van a devolver > Reintegrar dinero al cliente de la misma manero que nos pagó (permitir siempre cash pa porsi...?) > Imprimir nuevo recibo de la venta con la devolución incluida (por si el cliente quiere devolver algo más en el futuro)
	> Consultar artículo > Introducir código del item > Mostrar toda la info del artículo en consulta > Inicio
	> Logout
	
	Modulos de pantalla: 
	- seleccion de item (debe permiter seleccion mediante scanner o intro manual del código, browse del catalogo de productos, buscar por texto y también crear a mano un nuevo sale item con 4 informaciones basicas) + items mas frecuentes (a configurar por resp tienda)
	- pantalla de pago (identifica la cantidad total a pagar y permite meter cuantos pagos sean necesarios para llegar hasta la cantidad total. debe permitir la seleccion de método de pago e introducir los detalles correspondientes (incluido cuanto es el cambio que hay que dar al cliente)

	
#### Ventana de producto
* cómo mostrar el precio de cada variante? en ppio cuando la dependienta escanea un código qr le saldrá el precio de esa variante concreta
* en la pestaña de Localización solo se deberían mostrar los artículos que no estén vendidos ni reservados 
* se muestran todas las fotos a nivel de producto y además las específicas de la variante concreta que se está consultando
* en la pestaña de variantes deberíamos poder pinchar en otras variantes para desplazarnos a ellas y poder ver los datos concretso de esas otras variantes (por ejemplo el precio o sus fotos)

#### Ventana de fullperson
* además de los datos específicos de la persona se mostrará otra pestaña si esa persona tiene un rol específico (por ejemplo customer con informaciones sobre últimas compras, detalles específicos, etc o employee con informaciones de RRHHs --> hay que tener cuidado que estas informaciones no las pueda ver cualquiera!)
* como le añadimos una botonera de Continuar/Cancelar para cuando el paso por esta pantalla sea parte de un flujo de ventanas (por ejemplo despues de una venta, para generar el invoice hay que crear/seleccionar una nueva persona y luego volver a la venta para imprimir la factura)

### Estructura en modulos/extensiones Yii
A priori habría varios módulos claramente reutilizables en otras aplicaciones

[x] [Extensiones o Módulos?!](http://stackoverflow.com/questions/14139519/what-is-the-difference-between-component-extension-module-in-yii) Las extensiones consisten de lógica absolutamente independiente de los modelos de datos de la aplicación (por ejemplo, una extension que envía emails, que hace compresion zip, etc). Si depende de los modelos concretos de la aplicación pero es reutilizables sería más bien un módulos

#### Extensiones
Ver si existen ya extensiones hechas que se puedan reutilizar fácilmente
- tal vez pueda haber una extension para leer códigos qr/barcodes/etc?
- generacion de pdfs? 
- impresion?

#### Modulos 
- PersonalData (person, company, address/phone/email/social)
- Security (users, profiles/permissions, prefs, old_passwds, user_msgs)
- HR (employee, department, salary, absence)
- Workflows
	
## Seguridad
### Usuarios
La imagen de un tio está asociada a su person o a su user? --> es más, cabe la posibilidad de tener users sin person asociada? --> lo ideal sería que cada user tuviera una persona asociada... pero eso quitaría la posibilidad de tener usuarios genéricos (aunque siempre se podrían definir personas falsas... pero no es mu elegante)  --> lo mejor es que la foto esté asociada a la persona y que se puedan tener usuarios sin asociar a persona (para estos usuarios o no se muestra foto o se muestra una foto generica)

### Perfiles (TODO)
Como tratar el tema de los perfiles? Es decir, aparte de dar permisos sobre las operaciones CRUD de una tabla es posible que necesitemos validaciones adicionales: por ejemplo, una responsable de tienda debe poder introducir en el sistema una oferta concreta aplicable a la tienda --> eso implica que podrá escribir en la tabla de descuentos pero solo introduciendo descuentos que apliquen a su tienda, nunca a nivel global o a otras tiendas...   la otra opción es centralizar todo ese tipo de cosas y que sólo un perfil se encargue de toda la administración y que las resps de tienda simplemente sean las que piden al administrador esto y lo otro  --> igual es posible poner varios perfiles muy concretos que no se puedan borrar ni nada y que tengan un comportamiento predefinido, no configurable, y luego tener la posibilidad de añadir otros perfiles adiciones configurables solo con los permisos CRUD --> otra opción es separar ciertas tablas en varias: por ejemplo, el tema de los descuentos crear una tabla de descuentos a nivel de región (solo administrable por Jara y yo), otra tabla con descuentos a nivel de categoría (solo accesible para Jara y yo), otra con los de nivel tienda (administrable por la resp de tienda), etc

Qué perfiles queremos? sobre todo qué diferencias hay entre unos y otros (y cómo se van a implementar)?
* superadmin (inborrable)
* admin (pueden hacer todo salvo borrar o modificar el superadmin)
* audit (solo lectura sobre todos los datos) --> este perfil además de para auditoría podría usarse para el management de la empresa en un momento --> ven los datos, toman decisiones y les piden a los resps de zona que sus resps de tienda ejecuten las acciones necesarias  --> podría ser un buen perfil para Jara
* resp zona (solo lectura sobre su zona?) --> debería ser básicamente un perfil de auditoría limitado a su zona  --> para cualquier operación se la tiene que pedir a las reponsables de tienda de su zona y que lo hagan ellas
* resp tienda (puede ver todas las sesiones 'pos' de la tienda de cualquier vendedora, tener acceso a las estadísticas de la tienda y cancelar cualquier operacion. no puede crear usuarios nuevos ni modificar/cancelar existentes, puede abrir sesión 'pos' o 'admin' pero limitada a las operaciones de la tienda)
* vendedora (solo puede abrir sesiones tipo 'pos', meter operaciones y cancelar las operaciones de esa misma sesión. no puede ver sus propias sesiones de otros días)

Para generar facturas en tienda la dependienta tiene que poder acceder potencialmente a todos los datos de clientes (pero atención, solo clientes, que no pueda acceder a los datos de otros empleados!)

## Brand structure
### General
Tenemos las marcas que no están restringidas, son globales y dentro de estas están las regional_store_network que sí estarán restringidas a un mismo país (incluso a una zona dentro mismo país) según los impuestos y currency a aplicar. (por ejemplo para la marca Balzaq tendremos una región que será España Península con el IVA al 21% y otra región que será España Canarias con el IGIC al 7%) --> para los envíos también restringimos al ámbito de ese país???  en ppio sí!     El stock estará también asociado a una región o a otra (a través de su localización) y los productos se guardarán sin el impuesto y sin el currency --> importante, si un artículo se lleva de una localización a otra y cambia la zona de un impuesto a otro o de un currency a otro podríamos tener un problema (en el primer caso, cambiaría el precio final en función de que se le aplique un impuesto u otro y en el segundo caso sería incluso peor porque un precio que se le dió en una moneda sería ahora interpretado en función de otra distinta) --> A TENER MUY EN CUENTA      La consolidación a nivel de marca habrá que diferenciarla por regional_store_network

El modelo de tienda y de almacén es muy parecido a nivel de organización: dependen de una regional_store_network y están asociadas a una compañía concreta y por lo tanto trabajan siempre con la misma currency y tax. Cada tienda y cada almacén tienen un empleado de referencia (responsables) que están asociados a la compañía que lleva esa region, y unos datos de contacto: address, phone e email. A su vez están, tanto tiendas como almacenes, divididas en secciones. Además las tiendas tienen asociados unos horarios de atención al público

### Regional_store_network
En ppio la regional_store_network no está relacionada con un country --> la razón es que podemos tener un país con varias regional_store_networks (por ejemplo en España mismo tenemos el caso de Canarias) o viceversa, que varios países constituyan una única zona (por ejemplo la UE si armonizara impuestos...) o también un caso mezclado: que zonas de distintos países constituyeran una única regional_store_network

#### Impuestos
Cada region de la marca tendrá un impuesto (y si una región del mismo pais tiene otro impuesto (Canarias) hay que tratarlo como una regional_store_network diferente con stock diferenciiado...). En el producto/artículo sólo almacenamos el precio sin impuesto (aunque en la UI le demos al usuario la posibilidad de introducir el precio final, pero a partir de ese calculamos el sin impuesto que es el que almacenamos) y si se produce un aumento del IVA se repercute automáticamente (no quita que si queremos absorberlo podemos simplemente definir una promo global por el valor del aumento). El precio final del artículo se calculará únicamente en el momento de la venta en función del impuesto que se le aplique y de las reglas de promociones y descuentos aplicables antes y después de impuestos. 

Cómo calcular el precio final de venta de un artículo?
1. Recogemos su price_before_tax de la tabla
2. Aplicamos los descuentos antes de impuestos que le apliquen comenzando por el nivel más alto (store_chain --> product_item)
3. Aplicamos impuesto 
4. Aplicamos los descuentos despues de impuestos que le apliquen
	
### Store
#### Puntos de venta 
[x] Como sabe el UI desde qué tienda y desde qué puesto de esa tienda se está conectando? La tabla point_of_sale (asociada a cada tienda) tiene repertoriados todos los pos de cada tienda. Lo suyo es que quien instale el pos simplemente establezca exactamente de qué pos de trata la primera vez, este dato se guarda (cómo exactamente? local storage? cookie?) y luego cada vez que alguien se logue aparezca en el formulario de user/passwd el nombre del pos y un botoncito que permita cambiarlo por si se cambia de sitio --> aunque igual esta posibilidad de cambio no debería estar accesible para una simple dependienta no siendo que se equivoque!!! --> posibilidad demasiado sencilla de falsear los datos de ventas!

[ ] Las vendedoras deberían estar habilitadas para todos los pos de una tienda concreta (o en general que estén habilitadas para una lista de pos) o para todos los pos posibles? --> CONFIG?  --> lo suyo es que se puedan habilitar sólo para puntos de venta muy concretos (aunque luego se puedan fácilmente habilitar para todos en un momento dado)

#### Horarios de tienda
Cada tienda puede tener uno o más horarios definidos, uno de los cuales debe ser el default (sin fechas concretas de aplicación) que se aplicará cuando no haya otro definido para una fecha concreta. El resto de horarios deben indicar un rango de fechas en el que serán válidos mediante los campos valid_from, valid_until. El valid_from será inclusivo y el valid_until no. Los horarios no deben solaparse nunca en sus rangos de fechas --> si se diera el caso escogeríamos el último horario definido para una fecha dada (el que tenga id más alto) aunque lo mejor es verificar que no sucede nunca esto. Dentro de los periodos en los que está definido un horario pueden existir días especiales (special_dates) en los que o bien no se abre (festivos, por ejemplo) o bien se hace un horario especial (semanas de navidad por ejemplo). En principio el único uso de estos horarios es: para verificar que las sesiones de venta comienzan sin grandes retrasos respecto al horario previsto, a nivel de información en la página web

### Warehouse
#### Horarios de almacén (TODO)
Aunque no tan necesario como para una tienda tal vez también sería interesante tener la posibilidad de definir estos horarios (sin que fuera obligatorio ni mucho menos) de la misma manera que para las tiendas.

### Employees

## Stock
### Categorías
Como evitar la recursion de las categorías (que una categoría sea hija de su propia hija o casos similares)? de momento se puede dejar a criterio del usuario indicándole que puede causar un grave error? este tema seguro que hay literatura en internet

### Producto/Variante de producto/Artículo
El stock se estructura en 3 niveles:
* product: con las características generales del producto. Impepinable que cada product esté fabricado por un único manufacturer (si 2 manufacturers los fabrican lo trataríamos como 2 products distintos, lo que sí podría darse es que haya varios suppliers para el mismo product)
* product_variant: declinación del producto según ciertas características (por ejemplo distintos colores, distintas tallas, etc)
* item: este es el artículo concreto que vamos a vender. Es algo físico y por lo tanto está asociado a una sección concreta de un almacén y/o a una sección concreta de una tienda (aunque no sea obligatorio informar estos campos) e igualmente es lo que forma parte de los albaranes y de los pedidos y ventas

Tanto los productos como las variantes pueden tener fotos asociadas. las que se asocien a nivel de producto se supondrá que son válidas para todas las variantes. Los items no pueden tener fotos asociadas puesto que se supone que todos son iguales entre ellos dentro de una variante, así que las fotos las pondríamos a nivel de variante.

El supplier_price en la UI se puede introducir a nivel de producto pero al final se guarda y se edita a nivel de product_variant. Idem con el PVP

De que sirve tener el precio a nivel de la tabla producto...? Para cogerlo de base para crear nuevos artículos de ese producto más adelante... (por ejemplo en caso de reposición)

[ ] Podemos tener items que existan sin ser parte de un product_variant o de un producto? es decir, items que existan por si solos sin esta jeraquía?  --> a priori parece que no. Si se diera el caso lo mejor parece que sería crear un product y un product_variant de compromiso  --> esto implica que la persona de almacén que reciba el albarán no lo tiene que reflejar literalmente en el sistema, sino que puede ser que sea mejor estructurarlo de una manera u otra para que el funcionamiento sea más adecuado

[ ] Las fechas in_stock_since cómo se interpretan? es la fecha de compra del artículo, es la fecha de entrada en el almacén? es la fecha en la que se ha procesado y dejado listo para la venta el artículo, se deja a criterio del usuario? --> posiblemente lo interesante sería tener todas las fechas para que el seguimiento fuera óptimo (aunque no obligatorias para evitar demasiada sobrecarga)  --> en ppio lo suyo será tener todas estas fechas pero en sus correspondientes instancias de delivery, order, sale, etc


### Facturas y albaranes (de proveedor o nuestra, no importa)
No existe por si mismo una tabla de factura o de albarán. Lo que sí existe es el concepto de pedido con toda la información asociada y se considera tanto a la factura como al albarán como maneras concretas de visualizar el pedido. 

Un concepto importante a entender es el de serie de la factura/albarán: dado que una empresa puede tener varias líneas de negocio no relacionadas las facturas relativas a una u otra línea se diferenciarán mediante este código de serie (tabla invoice_delivery_note_series). Así si este código de serie es por ejemplo BAQ, el número de la factura será BAQ-202034 

Los productos por si mismos o sus variantes no figurarán (salvo tal vez a modo de completar la información) en un albarán o factura de proveedor en concreto porque son entidades abstractas. Son los items los que están asociados al albarán o factura. El workflow en el centro logistico sería: 
1. Se recibe el albarán/factura correspondiente a un pedido y se crea un nuevo pedido de tipo 'purchase'
2. A continuación, opcionalmente, se informan el interviente cliente (la empresa) e interviente suplier (el proveedor). Si no estuvieran ya en el sistema se crean y se asocian al pedido
3. Opcionalmente se pueden introducir los datos del pago del pedido (con qué transacción se realizó, etc, etc)
4. A continuacion se crea la estructura del stock (categorías/productos/variantes/artículos) pero siguiendo la propia estructura del albarán/factura: 
  0. Se verificará a mano la factura/albarán para ver que todo esté bien. Si no es el caso reclamamos al supplier (y paralizamos todo el proceso? Igual hay alguna manera de indicar en el sistema que algún item está reclamado al supplier (por que falte o porque tenga tara)... y continuar con la puesta a disposición de la mercancía
  1. Crear nuevo order_item
  2. Seleccionamos si este order_item es un artículo (item) o un pack
  3. A continuación se nos dará a elegir si queremos asociar un artículo de un producto ya creado en el sistema o si queremos darlo de alta como nuevo. Si ya existe en el sistema simplemente lo buscamos y una vez encontrado indicamos si el artículo es de alguna de las variantes que ya existen. Si no es así la creamos nueva. 
  3. Si es un artículo de un producto no existente damos de alta el producto: rellenamos los datos básicos del producto (nombre, descripción, etc) y podremos añadir características (por ejemplo si la linea del albarán corresponde a 5 pantalones marrones en tallas S,M,L,X,XL podremos añadir 2 características: color y talla) e indicar cuales de ellas dan lugar a variantes y sus valores (en este caso, por ejemplo, si no tenemos pantalones de ese producto en otros colores, solo dará lugar a variantes la talla --> a tener en cuenta que esto puede ser diferente para el proveedor que para nosotros porque puede que el fabricante sí tenga en su stock más colores del mismo pantalón pero que nosotros solo hayamos comprado el marrón). Si en el mismo pedido vinieran también pantalones de más colores en otra línea y ya lo sabemos, podemos poner que color también sea una característica que dé lugar a variantes e indicar aparte del marrón los otros colores. Si pensamos que no pero más adelante nos damos cuenta de este hecho entonces tendríamos que dar la posibilidad de reconvertir una característica que no da lugar a variantes en una que sí. En nuestro ejemplo se dará de alta un producto con nombre "Pantalón marrón" y 5 variantes asociadas. 
  4. A continuación, una vez creada la jerarquía de productos/variantes hay que indicar las cantidades que vienen de cada variante para que se generen los registros de item apropiados. Al terminar de dar de alta el artículo el sistema nos proprondrá la creación del producto y variante/s asociadas en base a esos datos. 
  5. Si es un pack igualmente damos de alta los artículos que lo componen de la misma manera que en el paso anterior, solo que asociándolos al pack
  6. Al terminar simplemente verficamos que todo sea coherente, que el precio y cantidades totales encajan, etc y ya está
* Igual lo que se puede hacer para dar más flexibilidad es no obligar a tener la asociación entre items y pedido, si se quiere se usa, sino no (o que sea configurable...)

### Features
Solo tenemos una tabla de features, que describe qué features están disponibles en el sistema. Estas features se pueden asociar a un producto y se les puede dar un valor a nivel de producto o valores específicos según el artículo. Estos features hay que predefinirlos (para poder seleccionarlos luego para un producto u otro o un artículo u otro) junto con sus posibles valores. Los features tienen un tipo (int, float, color, list, colorlist) y permiten definir un inicio y final de rango o también una lista de opciones. La forma de dar de alta un nuevo producto sería: 
1. Crear nuevo producto --> damos valor a todas las propiedades comunes del producto y generamos una nueva línea en la entrada de product 
2. Seleccionar los features que ya haya definidos en el sistema y que apliquen al producto en cuestión. Para cada feature pedir al usuario que indique si es un valor común para todo el producto (se genera una entrada en product_feature_value con el valor concreto) o si hay variaciones en los productos asociados (en ese caso indicar qué valores concretos se pueden dar). Una vez se hayan indicado todos los posibles valores de las features que cambiar a nivel de item generamos la combinación correspondiente para obtener los items (si no hay features que cambien a nivel de item se genera un único ítem sin valores de features) y se generan las líneas correspondientes en la tabla item enlazadas con sus valores concretos de item_feature_value. A continuación se le pide al usuario que rellene las cantidades de cada item

### Productos virtuales (TODO)
Como implementar un producto virtual (descargable o un simple código)?

### Productos fuera de catalogo
Como cobrar un producto que no aparece definido en el catálogo? --> la dependienta buscaria el prod_item y si no lo encuentra simplemente rellena a mano un order_item y lo incorpora a la venta --> a tener en cuenta que si el prod_item realmente sí existía pero no se encontró por lo que fuera (no tiene qrcode o no se lee o la dependiente no lo buscó) y se vende en este modo manual en el inventario nos aparecerá como que NO se ha vendido aún!


## Special offers
### Discounts
[ ] En ppio sería interesante poder por un lado definir promos globales a todas las tiendas pero que por otro lado una vendedora pudiera introducir ella misma (o su responsable) una promo concreta en el momento

Como se implementa un descuento tipo 2x1 o 2x39,90€? Dependiendo de la composición del pack se pueden dar varios casos: 
- pack-categoría: llevate una camisa y un pantalón y paga solo uno de los 2 --> creamos un pack con price_strategy de 'most-expensive' y luego 2 registros en pack_component uno apuntando a la categoría camisas y otro a pantalones 
- pack-producto: llevate esta camisa concreta, este pantalón concreto y un cinturón por 39,90 --> creamos un pack con price_strategy de 'fixed_price' a 39,90 y luego 3 registros en pack_component uno apuntando al producto de la camisa concreta, otro al pantalon concreto y el tercero a la categoría de cinturones
- pack-articulo: seleccion de varios (cuantos?) artículos/productos/categorías concretos (o no) con un precio en concreto
agrupacion asimetrica (por ejemplo: este abrigo concreto con una camisa cualquiera a 49.90 y te regalamos un llavero, un bolso o un foular)
2x1, 3x2: aplicable en ppio a productos/articulos de la misma categoría o del mismo producto
articulo de regalo o a precio reducido con al comprar algo caro --> esto podría ser un pack...
un artículo/producto/categoría además podría formar parte de varias agrupaciones en un momento dado... en el momento que se venda o deje de estar disponible habría que desactivarlas todas (si quedara activo no pasaría nada tampoco porque el vendedor nunca sería capaz de introducir la oferta concreta)
Se puede implementar con una tabla de promos con las condiciones básicas de la promo (validez, fechas, etc) y el tipo de promo --> en función de este tipo de promo iríamos a una tabla u otra a buscar los datos concretos para esa promo. La cajera debería seleccionar qué promo concreta quiere aplicar y luego seleccionar los artículos afectados a esa promo
El pack siempre será una promo, nunca puede ser un producto --> no hay un qrcode del producto pack asociado en ppio, no queremos tener un control de que todos los componenetes de la promo estén en la misma tienda, tenemos el problema de un artículo forme parte de varios productos-pack y al venderlo haya que desactivarlos todos, etc...

En los descuentos: como las categorías no están asociadas a una tienda en concreto podemos poner un descuento a la categoría X y eso se aplicará automáticamente en todas las tiendas... cuando lo más probable es que solo querramos aplicarlo a nivel de tienda...  --> lo que podemos hacer es que en esos casos se rellene también el store_id si es necesario para limitar la oferta...   idem para el caso de descuento sobre un producto que se puede encontrar en varias tiendas

En ppio el POS no va a reconocer los descuentos/promos/agrupaciones de productos por si mismo. Se supone que tanto el cliente como la vendedora deben conocerlo y el cliente debe pedirlo y/o la vendedora conocerlo. Luego en el momento de hacer la venta la vendedora debe seleccionar la oferta concreta que se hace _antes_ de scanear los productos

### Ofertas excluyentes
[ ] Para el flag que indica si una oferta es excluyente con otras (en ppio todas deberían ser excluyentes para que a alguien no se le apliquen 2 descuentos a un tiempo). El tema es: dado un item que tiene derecho a varias promos, alguna de ellas excluyente: se aplica sólo la excluyente? se aplican las otras? Lo mejor parecería aplicar las ofertas por orden de generalidad, es decir, empezamos aplicando las que estén definidas a nivel de cadena, luego de tienda, luego de producto, etc. Si vemos que alguna es mutuamente excluyente...  Otra opción es hacerlas todas 100% mutuamente excluyentes y apuntar cada product_item a su oferta en cada momento y listos... el tema aquí serían los 2x1 y tal

### Packs 
[ ] Se puede tener un pack cuyos productos constituyentes no se puedan vender individualmente? en este caso parecería que el pack deja de ser pack y se convierte en producto, no?

[ ] Como categorizar un pack? en ppio no se puede --> por ejemplo, si hay una categoría de camisetas y un pack de camiseta + pañuelo a X euros entonces debe existir en el sistema la definición del pack en el que uno de los componentes es de la categoría camiseta --> lo que podemos hacer es que cuando se muestre la categoría "camisetas" no solo mostramos los productos concretos que estén asociados a esta categoría sino también los posibles packs que se puedan formar (de hecho además los podemos mostrar de una manera especial, en plan promociones e incluso añadir también todos los descuentos que existan y que afecten a esa categoría)

[ ] Si no se pueden categorizar los packs cómo podemos implementar una "venta por outfit"? pues o bien consideramos cada outfit como un producto por si mismo (y por lo tanto no permitimos la venta de los componentes por separado) o sino malamente


## Session
Una sesion puede agrupar varias operaciones:
* recuentos de cash en caja (la UI debería de obligar a que hubiera mínimo un recuento al init_session y otro al end_session para las sesiones tipo 'pos')
* orders
* item_returns --> que deberían estar asociados a una venta y a un payment
* reservas --> que deberían estar asociadas a un payment y más tarde a una venta (o a una cancelación de reserva)
* entradas y salidas de cash no asociadas a orders ni otras operaciones
* cancelaciones --> aqui hay que distinguir porque una cosa es cancelar la instroducción en el sistema de una operación y otra cancelar una operación que ya esté introducida desde hace un tiempo. En el primer caso simplemente no se debería grabar nada asociado a esa operación, mientras que en el segundo se debería de indicar en bbdd que la operación concreta está cancelada, quien la canceló (esto se encuentra a través del usuario de la sesión en la que se produjo la cancelación) y porqué
* anulaciones de transacciones 
* consulta y envío de mensajes --> aquí puede pensarse en mensajes de usuario y/o en mensajes de sistema (por si quieren consultar algún detalle de la última venta o algo...)
* consulta de las operaciones de la sesion??  de otras sesiones en ppio no pero de la en curso (o de los últimos días) sí podría estar intersante


### Controles de caja
Los controles de caja de inicio y final de sesión no está muy claro cómo funcionan para un usuario administrativo (por ejemplo yo) que entra a hacer esto y lo otro sin relación con un turno de venta ni nada... --> introducimos entonces el concepto de tipo de sessión: admin, audit, shoponline, pos  --> solo se harán los controles de cuadre de caja en las sesiones tipo pos   ---> Como identificar el tipo de sesion? la idea es que los usuarios con perfil de vendedor o responsable de tienda solo puedan abrir sesiones tipo pos. Los administradores solo como admin, etc. El perfil del user determina totalmente el tipo de sesión. Para jara o bien sólo se le da perfil de responsable de tienda o bien tiene 2 perfiles, uno admin y otro resp de tienda o bien usa el mío de admin

### Cancelacion de operacion
Consideramos que es cancelación de operación cuando la operación se introdujo en un momento dado como válida y luego más adelante se determinó que por lo que sea la operación se introdujo en el sistema erróneamente: la cancelación por lo tanto implica que ninguno de esos datos deberían figurar en el sistema (sin embargo ya están ahí y no los queremos borrar). La forma de cancelar es tomar nota de lo que hizo la operación teniendo en cuenta el status en el que se encuentre el objeto asociado y básicamente deshacerlo de la manera más apropiada. A continuación se creará un registro en el histórico del objeto afectado indicando la causa y fechahora de la cancelación y se actualizará su status. Ejemplo: en el caso de una venta ya pagada habría que 
1. localizar el pago y las transacciones asociadas y pasarlas al estado cancelado (es decir, como si no hubieran existido) --> esto implica que la cancelación de la operación no es en absoluto una devolución de los importes asociados. A continuación pasar el pago a Cancelado también (a todos los efectos deja de existir)
2. localizar los artículos y packs asociados a la venta (a través de los order_items) y volverlos a marcar como disponibles para la venta (desasociandolos de los order_items). 
3. pasar los order_items de la venta al status "Cancelado"

En ningún caso se hacen devoluciones de dinero de la venta dentro del marco de una operación de cancelación (eso se reflejará como una devolución o una salida extraordinaria de dinero por ejemplo) 

[x] Qué pasa si tenemos una tara? En ese caso se implementará como item_return marcando como razón para la devolución "tara" y la devolución de la pasta de hará dentro del marco de esa devolución (es decir, no es que la operación no haya existido ni mucho menos: ha existido y simplemente ha acontecido algo natural como es una devolución)

[ ] revisar la implementación de las cancelaciones de operación y anulación de transacción --> posiblemente se debería resolver utilizando los workflows en lugar de usar tablas especiales --> el problema de resolverlo con workflows es cómo sabe el sistema que un estado que se llama "Cancelled" implica que un objeto está cancelado (y aún más, qué interpretación tiene una cancelación para cada tipo de objeto?). Es decir, podemos definir un workflow para cualquier objeto con todo tipo de estados y transiciones entre ellos pero el sistema no sabe en ningún caso qué significado tiene cada estado a nivel funcional y no puede tomar decisiones funcionales en base al estado actual o al recorrido que se haya hecho --> la información del workflow es únicamente interpretable por el usuario...  --> lo que sí se puede hacer es predefinir los nombres de algunos estados (a priori "Cancelled" e "Init"...  tal vez no haya mucho más...)

## Orders
### Caso estandar (TODO)
Un pedido representa una venta o una compra (type='sale' o type='purchase'). En ppio esto (type='sale' o type='purchase') no tiene más trascendencia que para luego sacar la contabilidad pero a nivel del modelo de bbdd es todo igual: un pedido tendrá 
- intervientes: un proveedor (que podemos ser nosotros en una venta u otra entidad en caso de compra), un cliente (idem)
- un pago: total o parcial en el caso de una reserva
- una lista asociada de order_items que a su vez estarán constituidos de uno o varios items (pack)
- un código de serie de facturación y un número de factura o albarán
- un delivery que a su vez tendrá asociada una delivery_note

(REVISAR) El flag de on_sale está presente tanto a nivel de product como de product_item --> inicialmente la idea era manipularlo a nivel de producto y sincronizar los product_item con este valor -->  El valor de este campo es poner todos los artículos correspondientes a un producto a la venta a la vez (o quitarlos de la venta) pero no tiene un significado claro a nivel de base de datos así que: eliminamos el on_sale a nivel de producto y lo dejamos a nivel de artículo y simplemente a través de la UI damos la posibilidad de marcar todos los artículos del producto con on_sale=1 o on_sale=0 a la vez

### Pagos
La tabla payment simplemente agrupa en un único sitio todas las transacciones que conforman el pago de una venta (o de una reserva, o de una devolución). Todas las transacciones están asociadas a un único pago obligatoriamente y tienen una cantidad (amount), una currency, un flow_direction (in o out, que indica si el dinero entra o sale de la empresa), una fecha de efectividad (que igual hay que interpretarla en función del tipo de método de pago) y luego a continuación los detalles específicos del método de pago que puedan ayudar a identificar la transacción en el sistema que lo maneje. Entonces cada operación de venta, reserva, devolución tendrá asociada un único pago por un importe X que tendrá asociadas una serie de transacciones que materializarán ese pago

#### Transacciones
#### Anulacion de transacciones
En un momento dado puede darse el caso de una transacción anulada por alguna razón (por ejemplo, 30 días más tarde de la compra Paypal nos retira los fondos). En ese caso el usuario busca la transacción que quiere anular e introduce una anulación de transacción indicando motivo y fechahora --> esto hace que la transacción quede asociada a su anulación y a continuación hay que buscar el pago asociado y ajustar la cantidad para que refleje la cantidad real que se percibió por la operación. El hecho de que el usuario deba seleccionar entre todas las transacciones la que busca implica que o bien las puede ver todas (que va a ser que no) o bien solo puede realizar anulaciones de transacciones un perfil especial de administración. El caso intermedio de que un usuario solo pueda anular las transacciones que él mismo ha realizado no es muy interesante porque por un lado no interesa que puedan tener sus estadísticas de ventas y por otro las transacciones que más problemas van a dar son las de la tienda online que van con un usuario "virtual". 

### Factura cliente
Como hacer para que cuando se vendan varios items del mismo product_variant aparezcan reflados en la factura, ticket, etc como
X cantidad del producto tal en lugar de X líneas, una para cada item --> la vendedora debería escanear cosa a cosa y que luego se produzca una agrupación automática de artículos correspondientes al mismo producto. Para otro tipo de negocio esto puede ser problemático porque si por ejemplo se venden 200 unidades de algo no es plan que la vendedora tenga que escanear las 200 --> debería poder simplemente escanear 1 e indicar una cantidad de 200 pero en ese caso no sabríamos exactamente qué 200 concretas se han vendido --> esto parece implicar que los items no deberían tener un código identificativo (en ese caso no importaría qué 200 en concreto se han vendido sino que simplemente los indicaríamos como vendidos en la bbdd, teniendo en cuenta a qué tienda estuvieran asociados, y ya)

### Agrupaciones de artículos (packs)
Básicamente las tablas pack y pack_component se utilizarán para definir posibles agrupaciones de artículos que puedan hacerse y los precios especiales que llevarán (si el precio total fuera simplemente la suma de todos los artículos entonces posiblemente no merecería la pena hacer la compra o la venta agrupada...). Estas definiciones de pack estarán formadas por pack_components que pueden estar asociados a una tienda, a una categoría, a un producto o a una variante de producto: por ejemplo: 
- un pack que sea "3 productos de la tienda X por Y euros" implicaría 3 pack_components asociados a la tienda X
- un pack que sea "compra 1 producto de la tienda X y llevate otro gratis" serían 2 pack_components de tienda también
- un pack de "camiseta + cualquier otro producto de la tienda por Z euros" implicaría un 1 pack_component de tienda y otro de la categoría "camisetas"
- un pack como "vestido puturrú con tallas S,M,L,XL y XXL, 3 de cada" sería básicamente un pack con 3 packs_componentes de product_variant por cada una de las variantes S,M,L,XL y XXL

Los artículos se pueden vender agrupados de manera premeditada (en ese caso existirá una oferta concreta en la tabla pack con sus pack_components donde se especifique qué productos/artículos pueden formar parte de ese pack y qué reducción de precio tiene asociada) o de manera espontánea (la vendedora decide hacer una oferta conjunta en el momento para asegurar la venta). En el primer caso la venta de esa agrupación hará referencia a la oferta de pack que se está utilizando (el order_item apuntará al registro de pack que a su vez apuntará a los pack_components y los items del order_item a su vez cada uno apuntará al pack_component concreto con el que se identifican). En resumen, si los artículos se venden agrupadamente de acuerdo a una oferta predefinida, iremos matcheando el order_item con la oferta de pack y los artículos de ese order_item con los pack_components (así todo queda emparejado y no hay líos). En cambio, en el segundo caso no existirá una oferta pack definida y por lo tanto aunque se venda como agrupación de artículos no se reflejará ningún enlace a ningún pack (porque no existe básicamente), simplemente el order_item tendrá asociados más de un artículo y ya.
 
Un pedido (compra o venta) está compuesto siempre de order_items. Cada uno de ellos tendrá asociados asociados uno o más product items. 
* Si solo hay un product item (caso más normal) el order_item simplemente reflejará el nombre y desc de ese item junto con el precio final de venta (tras aplicarle impuestos y descuentos) y el impuesto que se le aplicó (para poder calcular fácilmente la cantidad de impuesto correspondiente a ese order_item. El order_item además de estar asociado al product item llevará también una asociación al descuento que se haya aplicado (--> esto implica que no podrán borrarse nunca los descuentos del sistema, lo cual implica a su vez que vamos a tener pronto miles de descuentos inactivos!!! --> habrá que poner un flag o algo de visible/invisible/borrado lógico en la UI)
* Si hay varios product items asociados al order_item entonces estamos en el caso de venta de una agrupación de productos (pack) y pueden pasar dos cosas: 
	* que existiera una oferta de pack en el sistema para vender ese grupo de artículos --> en ese caso recuperamos los datos del pack, calculamos el precio final del pack en base a su estrategia de precio y el order_item name y desc reflejarán el nombre y desc del pack del que se ha beneficiado el cliente y se enlazará el order_item con esa oferta concreta de pack. Si la oferta pack está a su vez beneficiada de un descuento entonces el order_item enlazará a su vez con el descuento.
	* si no existe una oferta pack en el sistema para ese grupo de artículos entonces la vendedora tiene la opción de introducirla a mano en el sistema (básicamente introducirá un nombre de pack y un precio final --> esto no dará lugar a la creación de un nuevo pack en el sistema) y el order_item reflejará esos datos y no se enlazará con ninguna oferta pack ( --> esto permite detectar fácilmente las ofertas de pack que "inventan" las empleadas simplemente buscando todos los order_items que tengan más de un product item asociado y que no tengan una oferta pack asociada)

La operativa de venta entonces quedará así: 
1. La vendedora abre una nueva venta
2. Si tiene artículos individuales a vender los escanea y automáticamente se le añaden al pedido, desde donde puede cambiar la cantidad. En el momento de añadirlo al pedido le saldrá un desplegable o algo con todos los descuentos que puedan estar activos para ese artículo en ese momento. Ella eligirá uno de ellos (el que le haya dicho la clienta) y completará la introducción del artículo en la venta (eso dará lugar a la creación del order_item correspondiente enlazado con el descuento)
3. Para vender un pack el comienzo es parecido: coge un artículo y lo escanea. Antes de añadirse a la venta, le sale la pantalla de los descuentos, que esta vez también le mostrará una lista de packs que se pueden formar con ese artículo y una opción de "hacer pack a medida" o algo así. Una vez seleccionado el pack al que se acoje nos iríamos a una pantalla especial de venta pack con los datos básicos del pack concreto, el primer artículo ya añadido y los huecos en blanco necesarios para completar el pack (o sea, sus pack_components). La vendedora escaneará el siguiente artículo que se asociará con alguno de los huecos faltantes (o se dará un mensaje de error si no correspondiera al pack). Una vez rellenos todos los huecos se le mostrarán, si hubiera, los descuentos aplicables (al pack) y una vez seleccionado uno, se crea el order_item correspondiente con todos los product_items asociados y linkado a su vez con la oferta pack utilizada y con el descuento aplicado. Si la vendedora hace un pack a medida entonces la pantalla de venta pack permitiría modificar el nombre de la oferta y el precio final y se permitiría la introduccion de cualesquiera artículos sin verificar nada. La pantalla de descuentos de pack en este caso no se mostraría nunca porque no sería aplicable (para eso puede la vendedora meter el precio que le dé la gana).  --> El problema de enlazar un order_item con el descuento que se le ha aplicado es que eso nos obligaría a que no se pudiera modificar el descuento nunca (o sea, una vez creado simplemente podríamos desactivarlo) porque sino cabe la posibilidad de que se modifiquen las fechas de validez del descuento (por ejemplo para alargarlo en el tiempo) y que luego tengamos ventas en las que se hizo un uso correcto del descuento pero cuya fecha de venta ya no esté incluida entre las de validez del descuento recién establecidas...)  --> otra duda es si es necesario enlazar cada item de un pack con el pack_component que lo define... 
4. Por último cuando todos los order_items están añadidos a la venta se gestiona el pago, se marca todo como vendido y se finaliza la venta

La operativa de item return quedaría así: 
1. En un momento dado viene la clienta a devolver algo 
2. La vendedora revisa el ticket y localiza el código de la venta. 
3. Hace click en "Devolver artículo", le sale una pantalla de seleccion de venta, ella introduce el código y se le muestra la venta (esto implica que todas las empleadas tienen acceso a ver todas las ventas... aunque en ppio solo si tienen el código!!?) con sus order_items y los items asociados
4. A continuacion elige el order_item que quiere devolver (si es un pack hay que devolverlo todos los artículos que lo conforman). En ese momento se crea un registro de order_item_return asociado al order_item en el que figurará la sesión para saber qué usuario lo hizo, la hora y el motivo de la devolución. Por último la vendedora selecciona "Pago" y crea la transaccion que corresponda ("Devolver dinero en efectivo" o "Generar coupon", etc) --> Esto hará que se le asocie un payment a la operacion (en este caso un pago de la empresa a la clienta). En ppio el sistema no obliga a un tipo de método de pago u otro, es la dependienta la que elige en función de las instrucciones que tenga (en nuestro caso, si tara -> devolver dinero, si no tara --> generar coupon). En caso de devolución de dinero se podrá el tipo de transaccion. 
5. Por último una vez efectuada la devolución del dinero o la generación del coupon se volverá a marcar el articulo como a la venta y se commitearan los registros relativos a la devolución (un order_item_return apuntando a un order_item y a un payment que agrupará las transacciones con las que se ha pagado a la clienta)

### Reservas
* vamos a tratar las reservas exactamente igual que si fueran ventas en un estado especial de "Reserva". El único dato específico es la fecha hasta la que está reservada la venta (reserved_until en la tabla de ventas). Lo que realmente identifica a una reserva respecto a una venta formal es que el pago no está complemente saldado (si alguien compra algo, lo paga totalmente y nos pide que se lo "reservemos", eso no es una reserva como tal para el sistema!)
* en una sesión, a nivel de UI, también tratamos igual una venta que una reserva. Permitimos al cliente seleccionar los artículos que quiera y cuando vaya a realizar el pago simplemente se verifica: 
	- si el importe está 100% satisfecho se muestran botones de "Imprimir ticket de compra" y "Generar factura"
	- si el importe no está 100% satisfecho se muestran botones de "Reservar" (al pinchar saldrá un popup donde se podrá introducir la fecha hasta la que dura la reserva, dar de alta o seleccionar al cliente e imprimir el justificante de la reserva para el cliente, que llevará el código de la venta, la palabra Reserva, la fecha límite de reserva y las condiciones si las hubiera)
* los items (o packs) que conforman la venta-reserva al estar asociados a un order_item deberían quedar bloqueados ya para otras ventas
* cuando la persona venga a concretar (redeem) se le pedirá el código de reserva impreso en el ticket (en realidad un código de venta), a través del cual se localizará la venta reservada con todos los datos asociados: los artículos de la venta (que se podrán incluir más), la clienta, el pago de la reserva con las transacciones asociadas y se ingresará una segunda (o más) transaccion que termine de saldar el importe. Al terminar de saldar la venta se sacará la reserva de su estado y se pasará a Pagado/Entregado o lo que corresponda. No existirá por lo tanto ninguna trazabilidad de qué transacción fue la que se asoció inicialmente a la reserva (más allá de que la fecha de la transaccion sea la misma que la del estado Reserva de la venta). Lo que sí existe es una trazabilidad de por qué estados ha ido pasando la venta en todo momento
* la reserva hará siempre uso de las promociones, descuentos y condiciones que puedan existir en el momento de creación de la venta --> es decir, se les congela todo hasta el momento del pago final
* para detectar las reservas pasadas de límite podemos hacer dos cosas:  o bien que ese día (y posteriores) le salga a las empleadas/resps de tienda un aviso indicando una reserva caducada y que sean ellas las que decidan lo que hacer o que sea cancelada automáticamente (igual esto se puede poner configurable por cliente...). Si la cancelación debe ser automática entonces implica tener un demonio corriendo todos los días para verificar. El otro caso sería simplemente una verificación simple cada vez que una empleada se loga en la tienda que tiene la reserva caducada
* si la cliente no llega a concretar la reserva antes de la fecha limite (o si no viene nunca) simplemente dejaremos la venta en un estado "Reserva Cancelada" o algo así con todos sus datos asociados --> eso sí, el artículo(s) volverá a ponerse a la venta y se desasociará de la reserva  (el problema entonces es que no guardamos la trazabilidad de qué artículo era el reservado caso de que venga la clienta a discutir... igual se puede poner en un campo de texto o algo)
* en todos los casos, y como para cualquier otra venta, a criterio de la vendedora (igual no todas las vendedoras sino solo las responsables de tienda o igual una vendedora solo puede cancelar las operaciones de su sesión...), se podrá cancelar una reserva efectuada. En ese caso hay que marcar la reserva como inactiva, el pago como inválido y asociar un registro de cancelación


### Item return
El modelo de datos no va a imponer que las devoluciones sean hechas con el mismo medio de pago que se ha usado para la compra: es decir, si el cliente paga con tarjeta o con paypal se le va a poder devolver en cash o un coupon, etc. Si se quiere implementar esa lógica mejor que lo hagan las propias empleadas pero no obligar desde la propia aplicación (o igual tambien se puede obligar desde la aplicación pero no a nivel de modelo de datos)

Como se gestionan las devoluciones? Esto es un ejemplo especifico para Balzaq
* para un caso normal de un artículo sin descuentos ni agrupado --> se genera un coupon salvo que sea una tara y entonces se devuelve
* para un artículo descontado con tara --> se devuelve el dinero 
* para un artículo agrupado con tara --> tendría que devolver todo el grupo y se devolvería el dinero (si los otros productos le interesan tendría que comprarlos a su precio normal)
* para artículos con descuento sin tara --> coupon por el importe de ese artículo
* para artículos agrupados sin tara --> tendría que devolver todo el grupo y se generaría coupon por el importe del grupo entero (si los otros productos le interesan tendría que comprarlos a su precio normal)
* para artículos agrupados pero que se quiere cambiar uno (por ejemplo por tema de talla) --> se deshace la compra de la agrupación toda entera, se genera un coupon por esa agrupación y se introduce en el sistema una nueva compra de la nueva agrupación pagándola con el coupon

[ ] En caso de que un item sea devuelto y se le haga un refund (refund=1 en el item_return) --> cómo guardamos la info del pago que se ha deshecho? No se puede simplemente marcar el pago que se hizo inicialmente como refunded porque puede ser que el pago corresponda a varios artículos y la devolución sólo sea de uno...   pago negativo?

## Transactions
### Cash
### Credit card
### Bank transfer
### Cheque
[ ] Ver como implementar también el pago por cheque, qué info hay que guardar, etc  --> ver en prestashop...?

### Coupon
A nivel interno de funcionamiento está claro que los coupons son iguales que dinero (interno) pero el tema es que a nivel de impuestos y demás no. Entonces hay que considerar por ejemplo que el payment de una venta en la que hayan pagado una parte con coupon no se puede considerar al 100% como ingresos (porque no siempre los coupons van a corresponder con devoluciones, también puede que se hagan como parte de ofertas y en ese caso estamos indicando que estamos ingresando un dinero que realmente no estamos ingresando...) --> la solución podría venir de no considerar el pago con coupon como un tipo más de transacción sino como un ente al mismo nivel que los payment --> es decir, que una venta se podría pagar con un coupon solo o con un coupon + payment --> se puede dar el caso de que un articulo incluso sea de regalo totalmente porque no haya payment --> en ese caso de todas formas deberíamos tener asociado un payment de 0eur. Lo ideal es que los payments representen movimientos reales de dinero para que simplemente sumándolos todos (y restando los que sean en el otro sentido) tengamos la contabilidad de la tienda --> entonces lo que sucede es que la suma del total de ventas no va a coincidir con la suma de los payments...  en realidad conceptualmente el coupon no es tanto un medio de pago, sino más bien un descuento a nivel de marca, utilizable en cualquier venta (se puede restringir que un coupon no se pueda utilizar para este u otro tipo de producto o en esta u otra tienda?) que se produzca en cualquier tienda, igual lo podemos implementar así y hala  --> tambien podemos dejarlo como está y simplemente para sacar la contabilidad sumar y restar las transacciones que no sean de coupones o de la suma de todsa las ventas restar la suma de coupones utilizados...   


## Workflows (TODO)
### Intro
Una venta puede tener distintos estados? para el pos parecería que no es necesario (aunque tampoco estorba) pero para las ventas online sí parece necesario para seguir si la venta está en seleccion de productos, pdte de pago, pagada, enviada, recibida, etc. Lo suyo sería que todos los objetos importantes del sistema tengan su propio workflow con sus reglas de negocio y tal referenciadas a este motor. A nivel de workflow hay que tener en cuenta que una cosa son las tablas que permiten definir un workflow (qué estados y transiciones son posible y qué acciones hay que lanzar en cada caso) y otra cosa muy distinta es saber exactamente qué recorrido ha tenido un objeto concreto (por ejemplo un pedido, por qué estados ha ido pasando, en qué fechas, qué usuario ha generado tal o cual evento, etc) ==> la definición del workflow se aplicará a una tabla (por ejemplo la tabla de producto, asociada a un business_object), mientras que el recorrido por el workflow se aplicará a un registro de esa tabla!

Hay que tener en cuenta que un workflow puede ser modificado (aunque en ppio solo por el superuser y los admins porque sino puede ser superdelicado) y que un recorrido del workflow que era válido en una fecha pudiera dejar de ser considerado válido en otra (aunque al final ya que ese fue el recorrido que sufrió el business_object eso es lo que vamos a grabar en la tabla de historico de ese business_object). Dado que estas modificaciones pueden implicar que en el histórico existan transiciones o estados que puede que ya no existan en el workflow no podemos registrar este histórico mediante relaciones a las tablas de estados, eventos y transiciones... en su lugar grabamos los nombres que tenía cada cosa en el momento de producirse la transición (atención que podría darse el caso de que un estado que antes se llamaba X ahora se llame Y o que lo que antes considerabamos que era Y ahora sea X). 


### Características de un workflow
Para que sea válido debe cumplir lo siguiente: 
- tener un estado de inicio claramente determinado
- la forma de llegar de un estado a otro es siempre a través de un evento
- tiene que ser coherente: dado un estado de partida y un evento siempre tenemos que llegar al mismo estado final (o quedarnos en el propio estado de partida si no se verifican las constraints)
- las transiciones pueden tener acciones asociadas. Estas acciones deben ser siempre métodos del controller del modelo que está controlado por el workflow (es decir, si una venta tiene un workflow asociado, las transiciones de ese workflow solo pueden invocar métodos del controller sale). Los métodos del controller aptos para ser utilizados en las acciones deben tener algunas características: 
- las acciones asociadas a una transición se podrán ejecutar antes (order <0) o después (order >0) de la transición . Si se ejecutan antes y alguno de los métodos lanza una excepción o retorna false entonces la transición no se realizará (el estado final seguirá siendo el mismo que el inicial)

[x] dado un estado de partida y un mismo evento, podemos llegar a distintos estados finales en función del resultado de una constraint? NO, en ese caso habría que desdoblar el evento en 2 (ó más) eventos, cada uno con su constraint e ir lanzando primero uno, luego otro, etc

### Funcionamiento de los workflows
Por un lado tenemos un conjunto de tablas que nos van a servir para determinar la definición del workflow. Por otro lado tenemos una tabla que representa el histórico de transiciones que cada objeto con workflow ha ido sufriendo. 

Todos los objetos (tablas) del sistema pueden si se quiere utilizar un workflow sin necesidad de nada más que darlo de alta. Es decir, para que un business_object esté controlado por workflow, simplemente creamos un registro en la tabla de workflows asociado a la tabla (business_object) que querramos y con las transacción que necesitemos. El estado actual de cada objeto es simplemente el último de su histórico (atención que esto puede ser un bottleneck a nivel de rendimiento). Eso sí, aunque una tabla tenga uno (o varios) workflows asociados eso no implica que todos los registros de la tabla estén asociados a workflow: es decir, puede darse el caso de que alguno o varios de los registros funcionen libremente. 

Para que un registro de una tabla tenga un "estado actual" y se encuentre sometido a workflow no hace falta nada más que el tener un histórico asociado. Esta asociación no es que el registro tenga un histórico asociado sino más bien que exista un  histórico de workflow asociado a ese registro. 

[x] qué pasa si es necesario hacer un datafixing para cambiar el estado de X objetos? En ese caso el datafixing tiene que consisitir en introducir una nueva transición en el registro de histórico desde su último estado al estado de destino (aunque no sea legal) e indicando un evento "datafixing". Aunque esa transición no sea legal no pasa nada porque el histórico solo guarda nombres de estados y eventos a modo de registro, nadie garantiza por tanto que la info sea coherente (de hecho si ha habido modificaciones de nombres de estados o eventos o si se han modificado/eliminado ciertas transacciones, lo más normal es que el registro histórico sea incoherente). Lo único que sí tiene que ser coherente en el registro histórico es el último estado (porque es el "estado actual") que debe figurar realmente en las tablas de estados y transiciones (si no existiera una transición para ese estado actual el business_object no podría seguir avanzando en su ciclo de vida!). Eso implica que en el momento de modificar el nombre de un estado por ejemplo habría que ver:
1. en qué workflows se usa
2. qué business_objects están usando ese workflow
3. qué instancias de esos business_objects tienen como estado actual ese estado
4. modificar los estados actuales (o sea el último registro del histórico) de esas instancias para reflejar la modificación del nombre. A tener en cuenta que no es necesario cambiar nada a nivel de la definición del workflow porque como todo va referenciado ahí no hay problemas. 
Para el borrado de un estado habría que añadir un paso adicional entre el 3. y el 4.: solicitar al usuario via UI que está realizando el borrado en qué estado hay que dejar los estados actuales que antes eran el que se está borrando. 
Para la modificación de un evento en ppio no hay nada concreto que hacer.
Para el borrado de un evento idem. 

La idea es que cada vez que se cree un nuevo objeto de negocio en el sistema (por ejemplo una nueva venta) recuperamos sus posibles workflows y le asociamos uno de ellos. Esta asociación la puede hacer el sistema por si mismo en ciertos casos: por ejemplo si solo hay un único workflow definido para una tabla entonces está claro que ese es el que hay que usar. También puede ser que haya varios pero uno de ellos tenga el flag de default a 1, etc. En el resto de casos simplemente se le puede dar a elegir al usuario mediante la UI. Para el caso de las ventas en lugar de definir un workflow para las ventas pos y otro para las ventas online lo que hacemos es usar un único workflow que contenga todos los posibles estados. Luego las aplicaciónes pos o tienda online darán al usuario la posibilidad de generar unos eventos u otros y hacer que la venta haga un recorrido u otro según el caso.

- Pueden 2 registros de una misma tabla seguir workflows diferentes!!?? --> por ejemplo se me ocurre que una venta podría seguir un workflow diferente en el caso de que sea online (que hay que hacerle el shipping) o que sea en pos. En ese caso podríamos simplemente asociar cada registro tanto con el workflow a aplicar como con el histórico correspondiente. Aún así sigue sin estar claro cual es el workflow por defecto para cada tabla  --> en ppio sí sería interesante poder tener workflows diferentes para cada registro, lo único que igual habría que diferenciar los nombres de los estados y de los eventos de cada workflow para evitar que en el histórico se confundan (aunque teniendo en cuenta que ya figura el nombre del workflow que generó la transición igual no es necesario...)
[x] Tambien puede darse el caso que un registro en concreto no tenga un workflow asociado. En ese caso el campo status no se usa ni tiene ningún sentido
- Como podemos evitar que se modifiquen ciertos estados clave en los workflows? Por ejemplo, en una venta si quitamos el estado "pagado" o no hay una transición para llegar a él estamos un poco jodidos...  --> igual podemos hardcodear los workflows en los models de alguna manera (en el fondo es un poco lo que hace el simpleWorkflow pero mediante un fich de config para que sea un poco modificable)  -->  otra posibilidad es darle la responsabilidad al superadmin para que defina workflows adecuados y si no lo hace simplemente que no funcione el tema... (es un poco cutre y peligroso, la verdad)
- Como indicar para cada transición de un workflow qué acciones hay que llamar, con qué argumentos y qué condiciones se deben cumplir para que se lancen o no esas u otras acciones? --> igual es cuestión de asociar siempre métodos genéricos que se llamarán siempre y que luego quede a criterio del desarrollo si se rellenan o no... (el problema es que entonces no podemos cambiar el comportamiento de la aplicación a golpe de ratón que es lo que nos gustaría, sino que habría que liarse a programar)
  --> en ppio tanto para los constraints como para las acciones a ejecutar durante una transición haremos referencia únicamente a: el propio modelo (this), sus objetos asociados a través de rules(), o a cosas genéricas de la aplicación (Yii->app()->loquesea). Es decir, la transición de un objeto de un estado a otro no va a implicar nunca condiciones sobre objetos que no tengan nada en absoluto que ver, salvo que sean objetos globales a la aplicación (por ejemplo el usuario logado, la current date)
- Como asegurarnos de que la definición de un workflow sea coherente? por ejemplo que no haya estados a los que no se pueda llegar nunca, o que partiendo de un mismo estado y mediante un mismo evento lleguemos a estados diferentes, o que se utilicen todos los status y eventos asociados con un determinado tipo de business_object (aunque si hay varios workflows para un objeto puede que no todos los workflows usen todos los estados y eventos) etc? --> esto deberían ser reglas de validación del workflow (pero a tener en cuenta que el workflow lo implementamos como ApplicationComponent, no como model normal y corriente)
- tanto los nombres de los estados como los nombres de los eventos deberían ir prefijados para saber mejor de qué estamos hablando. Por ejmplo, para una venta en lugar de tener una transición como    prodSelect --(payment)--> payed   debería ser mejor  sale.prodSelect --(sale.payment)--> sale.payed???  --> no está claro, depende un poco de si usamos el mecanismo de tablas o hardcodeamos los workflows en plan simpleWorkflow
- la implementación de los workflows debería ser a través de un ApplicationComponent (workflowManager), que se configurará en el array 'components' de la app y que se accederá mediante \Yii::$app->workflowManager y que proveerá métodos para gestionar las tablas que controlan la definición de los workflows: addWorkflow, addTransition, addNewStatus, getWorkflowList(business_object_name), getNextStatusList(workflow_id,current_status), getTransitionActions(transition_id) etc, etc --> en definitiva, un gestor de workflows
- En qué momento se ejecutan las acciones asociadas a una transición, antes o después de cambiar el status? igual lo suyo es indicar en la propia acción si lo queremos hacer antes o después... también puede ser que queramos o no cambiar el estado en función del resultado de ejecutar esas acciones...  --> a priori las acciones anteriores y que pueden hacer depender la transición serían las constraints!!
- En qué contexto se ejecutan las acciones asociadas a una transición? es decir, $this a qué hace referencia? al modelo sujeto a los workflows? --> esto es necesario para introducir en las acciones los argumentos correspondientes

[ ] como asegurar que los estados clave para las operaciones existan siempre y que tenga un nombre reconocible (es decir, evitar que alguien renombre el estado "Cancelado" como "En curso" por ejemplo)? Tal vez se puedan codificar de alguna manera en el modelos de datos o algo...   --> como podemos codificar lógica de negocio que depende de un estado u otro o de un evento u otro si no sabemos a priori su id ni su name? La teoría dice que eso es lo que deberíamos de codificar en las acciones asociadas a cada transacción... pero parece un poco complejo: en lugar de hacer tal cosa si estamos en el estado cancelado y tal otra si estamos en el estado activo lo suyo es que a la transacción que nos lleve a cancelado le asociemos las acciones pertinentes que queramos realizar con esa transición y lo mismo para la transición que nos lleva al estado activo

[x] puede ser interesante guardar de alguna manera en el evento qué objeto/user lo lanzó? y si sí, habría que ver cómo codificar los distintos objetos del sistema (hay una tabla ya por ahi que relaciona business_object con su tabla en el sistema). en ppio los eventos siempre los va a lanzar un user (aunque sea un user genérico para los clientes online o para los procesos batch) y tanto esta información como el objeto sobre el que se lanzan van a quedar reflejados en el histórico de workflow asociado a ese objeto. 

[x] es interesante prefijar los nombres de eventos/statuses/acciones con el tipo de business_object a los que aplican??  a priori parece que sí porque para 2 tipos de business_objects pueden existir por ejemplo statuses con el mismo nombre pero que a posteriori evolucionen diferente (por ejemplo que uno de ellos lo queramos renombrar para reflejar algún matiz que en el otro no venga a cuento o que lo queramos borrar) --> mejor que prefijar les vamos a asociar el business_object para el que tengan sentido. De alguna manera es una forma de registrar un conjunto de estados, eventos y acciones con un determinado business_object. Una acción debe estar asociada a un business_object aunque luego finalmente puede resultar una acción sobre otro objeto? Por ejemplo en un cambio de estado de una venta que implique enviar un correo a alguien, es realmente necesario tener que asociar esa acción de envio de correo al objeto venta? Parece que no, ya que en ppio teniendo los datos de controller/acción/argumentos debería ser suficiente



Es importante diferenciar entre el concepto de evento Yii, evento a nivel de la UI y evento de workflow: por ejemplo, un eventoUI puede generar a su vez X eventosWF (por ejemplo en una operacion masiva de cancelacion de ventas). El flujo en este caso es: 
1. El usuario de la aplicacion genera un eventoUI (click en el botón de cancelación masivo de ventas)
2. Eso llama al controlador/acción sale/massiveCancellation y se le pasarán como argumento un conjunto de ventas a cancelar masivamente o una condición que nos permita identificar las que hay que cancelar
3. El método sale/massiveCancellation lo que hace es un bucle para todas las ventas que le han pasado como argumento y para cada venta solicita al componente \Yii::app()->workflow un cambio de estado desde el estado actual de la venta y mediante un eventoWF de sale.cancel que viene generado por el método del controller
4. El componente \Yii::app()->workflow mira entonces cual es el business_object con el que está tratando, determina qué workflow concreto controla a la instancia concreta sobre la que se solicita el cambio de estado y en función del status de partida y del evento sale.cancel determina qué transición(es) hay que aplicar
5. Sabiendo la transición que toca para cada venta localizamos las accionesWF asociadas y segregamos las que hay que ejecutar antes o después del cambio de status. Las de antes las lanzamos (ver en qué orden) y verificamos si bloquean o no la transición. Si no bloquean la transición hacemos el cambio de status y lanzamos el resto de acciones. En el caso que nos ocupa vamos a suponer que después de realizar el cambio de estado queremos enviar un email al cliente de la venta. Para ello la acción asociada será algo así como mailManager/sendEmail y como argumento directamente habría que pasar ya el email del customer. Como quien lanza las acciones es el componente \Yii::app()->workflow desde uno de sus métodos (nextStatus o algo así que básicamente recibirá como parámetros una instancia de business_object, un status de partida y un eventoWF). Esto implica que el argumento de la accionWF tiene que ser una expresion que permita recuperar el parámetro del email de destino desde esa instancia de business_object. 
  * Otra opción es que la accionWF en lugar de hacer una llamada a un controller extraño simplemente consista en una acción del controller del business_object en cuestión: Por ejemplo, en el caso que nos ocupa el controller de Sale tendría una acción que fuera notifyCustomerOnCancel(), sin argumentos y simplemente en la accionWF declarariamos que este es el método a llamar. --> para evitar métodos específicos que hardcodeen el comportamiento en cada transición lo suyo sería que cada controlador ofreciera una serie de "servicios básicos" que se pudieran invocar desde las accionesWF: por ejemplo, en lugar de notifyCustomerOnCancel() reconvertirlo en notifyStatus($toCustomer=1) o algo así. En ese caso al definir las accionesWF simplemente se mostraría una lista de todos los métodos (o solo los designados como adecuados) del controlador del business_object y se permitiría al usuario elegir. Estos servicios básicos en lugar de recibir argumentos al uso lo que recibirían básicamente son opciones de configuración o flags (datos que podría introducir el usuario en función de sus preferencias para modificar el comportamiento de manera general, sin hacer nunca referencia a datos concretos de ninguna instancia). Otro ejemplo: si en el evento cancelación de una venta quisiéramos vaciarla de order_items y anular las transacciones asociadas simplemente crearíamos 2 nuevas acciones "before" que llamarían a sale/empty_order_items() y a sale/cancel_transations() --> en este segundo caso por ejemplo lo que se haría a su vez es invocar al componente \Yii::app()->workflow para cada una de las transacciones y provocar a su vez transiciones a Cancel en las transacciones (que a su vez llamarían a sus acciones correspondientes). Si alguna de estas transiciones a Cancel fallara entonces a su vez fallaría esta constraint y se bloquearía el cambio de status --> este encadenamiento de acciones y transiciones en otros objetos que a su vez pueden provocar más transiciones en cascada no puede dar lugar a problemas de referencias cíclicas???
  * Otra opción es que cada business_object controller implemente un método por cada transición que sea llamado siempre. Ese método contendrá por un lado la lógica a ejecutar antes de la transición, el control de si se bloquea o no la transición, la transición por sí misma, y la lógica posterior. El problema un poco es que entonces es muy difícil realizar cambios en los workflows porque eso implica tocar el código para añadir nuevos métodos por cada nueva transición añadida. --> mala solución salvo que no nos importe hardcodear unos workflows prefijados que van a controlar cada business_object (que igual no es tan malo en el caso que nos ocupa teniendo en cuenta la cagada que puede ser una modificación poco cuidadosa de un workflow importante)

[ ] como reflejar en el histórico del workflow los casos en los que se produce un evento pero que falla su constraint y no se produce el cambio de status? igual indicando en el registro que el status de inicio y el de llegada es el mismo y en el comentario algo así como "Constraint verificarCondición() falló"

### Definición de workflows concretos
--------------------------Workflows-------------------------------
Sale
<?php
return array(
    'initial' => 'init',
    'node'    => array(
        array(
            'id'=>'init',
            'transition' => array('productsselected' => 'this->selectProduct()')
        ),
        array(
            'id'=>'productsselected',
            'constraint' => 'this->notEmpty()',
            'transition' => array('productsselected' => 'this->selectProduct()')
            'transition' => array('payed' => 'this->pay()')
        ),
        array(
            'id'=>'payed',
            'constraint' => 'Yii::app()->user->checkAccess('validateCorrection')',
            'transition' => array('prepared' => 'this->prepare()', 
								  'handedover' => 'this->handover()')
        ),
        array(
            'id'=>'prepared',
            'constraint'=>'Yii::app()->user->checkAccess('validateCorrection')',
            'transition'   =>'shipped'
        ),
        array(
            'id'=>'shipped',
            'constraint'=>'Yii::app()->user->checkAccess('validateCorrection')',
            'transition'   =>'delivered'
        ),
        array(
            'id'=>'delivered',
            'constraint'=>'Yii::app()->user->checkAccess('validateCorrection')',
            'transition'   =>''
        )
    )
)
?>

## Generacion de presupuestos PYMEs
## Generacion de facturas PYMEs
## Formularios y Encuestas


## Gestion de reglas de negocio (BPM)
### Funcionamiento previsto
Todos los BPs serán un simple proceso secuencial de tareas. Las tareas estarán tipificadas:
* rellenar formulario: la persona que tiene atribuida la tarea tiene que rellenar un formulario predefinido
* validación: la persona que tiene atribuida la tarea tiene que validar los datos de un formulario
* subir fichero: la persona que tiene atribuida la tarea tiene que subir un fichero (que puede ser el resultado de una consulta, gestión, etc)
* custom: esta es una tarea que no tiene ningún soporte a nivel de sistema (por ejemplo, alguien que en un taller tiene que pintar un coche: simplemente actualiza el % de avance y fecha estimada de fin y cuando termina avanza el workflow)

Si lo queremos complicar un poco más adelante podemos crear BPs de tareas en paralelo y BPs que estén compuestos a su vez de otros básicos

### Características deseables a futuro
Para esto básicamente utilizar el generador de formularios para crear los objetos que serán sometidos al workflow. Básicamente debe soportar: 
- usuarios con perfiles
- un BP puede involucrar varios objetos de negocio con sus workflows asociados que además se entrelacen entre ellos
- soporte para que un BP esté a su vez formado por otros subBPs
- introducción de datos básicos en formulario diseñado a medida, con posibilidad de pre-rellenar los campos
- estados, eventos y transiciones
- tareas asignables y reasignables a personas con envíos de emails, que puedan también introducir el % de realización y la fecha estimada de fin (con duraciones predefinidas alterables por el usuario)
- introducción de textos de ayuda para cada task del workflow
- visualización de donde nos encontramos dentro de un flujo de negocio (por ejemplo de manera similar a como se hace en el 5-step process de la venta online)
- informes y estadísticas
- inclusion de documentos escaneados
- exportar de manera simple toda la info de cada elemento que sigue el proceso de negocio
- indicadores SLA?
- predefinir algunos BPs comunes a todas las pymes...?!

## Licencias de uso para otras pymes
### Comportamiento básico
En teoría esto puede funcionar de 2 maneras: o bien de manera compartida para todas las pymes o sino que se instalen la aplicación para ellos solos (eso sí, la aplicación debería ser igual en ambos casos porque sino nos morimos --> de todas formas igual no es buena idea vender la aplicacion a otros en standalone porque podrían replicar nuestro modelo de negocio!!!). Esto implica que hay que diseñar un modelo de licencias relativamente complejo para la web central y luego para el que se lo instale en standalone sea una licencia abretodo o algún mecanismo para configurar la no utilización de las licencias. 

El tema de licencias parece algo a implementar como ApplicationComponent y mediante la aplicación de behaviours a ciertos objetos de negocio (algo un poco similar a los workflows)

Las licencias se aplicarán sólo a ciertas tablas clave (las tablas que no estén afectadas por licencia se permitirá un uso ilimitado, dentro de los permisos de acceso que existan) y se concederán a un cliente (fisico o juridico) por un periodo de tiempo, tendrán unas fechas de inicio y fin de validez y básicamente limitarán el número de instancias que ese user puede crear en esas tablas del sistema. Las licencias se podrán renovar al mes y/o al año (o serán para siempre, unlimited). Este cliente puede ser o bien una persona física o bien una persona jurídica (company). Cada servicio (tabla) estará afectado por su propia licencia lo que implica que si un cliente quiere tener formularios y encuestas tendrá que pagarse una licencia de cada (y además una puede cogerla mensual porque use muchos formularios y otra anual porque use pocas encuestas)

### Modelo de datos
Básicamente tendremos una tabla que define los posibles tipos de licencias que podemos vender (básicamente habrá 3 licencias para tipo de tabla importante, una con renovación mensual, otra anual y otra para siempre multiplicadas por el número de incrementos que queramos definir en el número de instancias), con sus reglas de límites por tabla (si no existe un registro de límite entonces ilimitado!). 

Luego tendremos la tabla con las instancias concretas de licencias asociadas a cada cliente, que a su vez contendrán el número de instancias que faltan aún por utilizar para cada tabla de las que se han contratado. La idea es que cada vez que el cliente cree un nuevo formulario por ejemplo se le disminuirá en 1 unidad (hasta que llegando a 0 se le impida totalmente crear nuevos formularios) su límite de formularios no usados de su licencia de formularios. Cuando llegue la fecha de renovación de la licencia simplemente pasamos un batch que vaya actualizando para todos los clientes que han pagado la renovación que lo que hará es resetear el límite de formularios y actualizar la fecha de validez de la licencia. 

### Renovacion de licencia
Las licencias se concederán por un periodo de tiempo (año/mes/ilimitado) y por lo tanto tendrán unas fechas de inicio y fin de validez. Al finalizar el periodo de validez básicamente lo que hacemos es cargar un nuevo recibo en el banco del cliente y si no hay problema lo que se hace es incrementar (resetear!) de nuevo su límite de instancias en la tabla de límites. 

A ppio de mes tiene que correr un batch que haga lo siguiente: 
- crear un nuevo direct_debit_file que agrupará todos los cobros del periodo
- verificar si es ppio de año para realizar los cobros anuales
- revisar para cada cliente: 
  - qué licencias mensuales tenía contratadas el mes anterior y cuales de ellas tienen el flag de renew=1. Para cada licencia a renovar se le creará un nuevo registro de licencia válido para el siguiente mes 
  - si es ppio de año hay que verificar además si hay renovaciónes anuales a realizar
- a partir de aquí se tratará el asunto como una venta estándar en la que esas nuevas licencias serán los productos, así que se creará una nueva venta
- a continuación igualmente para cada cliente se identificarán qué licencias mensuales/anuales/parasiempre no están aún pagadas (no tendrán un order_item asociado) y se crearán order_items para cada una de esas licencias --> lo que haya sin pagar serán ventas realizadas durante el mes (de cualquier duración, mensual/anual/para siempre) y las renovaciones que se acaban de hacer 
- posteriormente se calculará el importe total de la sale y se procederá al payment de la sale generándose un registro en la tabla direct_debit por ese importe y asociándose al direct_debit_file 
- por último se generará la factura correspondiente en la tabla de invoice
- al final del proceso se generará el fichero de direct_debit

### Verificacion de licencia para un user
La verificación de si un user puede o no puede hacer tal o cual cosa sería así: 
1. Si la persona no tiene ninguna relación con nosotros en ppio no tendrá ningún usuario válido con el que logarse. Si se ha registrado en la página web (a priori gratuito para que puedan probar el producto) entonces ya tiene un user y se puede logar. Pueden pasar varias cosas: 
  * que lo haya mangado, se lo hayan prestado --> en ese caso simplemente lo podrá utilizar como si fuera el titular original
  * que lo tuviera asociado a una licencia gratuita o a una licencia no gratuita ya caducada --> en ese caso podrá hacer todo lo que pueda hacer una licencia gratuita y además, si fue cliente antes, ver todos los registros que creara como cliente. Eso sí, lo que no podrá es crear nuevos. 
  * que lo tenga asociado a una licencia activa para formularios por ejemplo. En ese caso cuando intente crear un nuevo formulario se verificará si aún le quedan alguno de los contratados sin usar y si es así le dejamos crear uno y le disminuimos en 1 el número de los que le quedan. 
2. Identificamos la persona asociada con el user: si no tiene una person asociada entonces qué pasa? no está claro porque puede ser que un user no represente a una persona sino a un proceso batch (aunque estos procesos a priori no deberían crear formularios por ejemplo... sino hacer simplemente algún datafixing aquí y allá...)
3. Si la persona tiene una licencia a su nombre pues perfecto, eso implica que es un autónomo y que tiene permiso para hacer ciertas cosas
4. Si la persona no tiene una licencia a su nombre entonces verificamos si figura como empleado de alguna company y si esta tiene alguna licencia a su nombre

### Como realizar la facturación a los clientes
El servicio se pagará por adelantado (más que nada porque en el plazo de un mes no es para tanto pero en el plazo anual que no lo acaben pagando jode un poco) y en fechas fijas: a comienzo de mes por ejemplo. Si un cliente se da de alta a mitad de mes/año se le cobra la parte proporcional del periodo en la siguiente fecha de facturación. 

Ejemplos concretos: vamos a suponer que facturamos normalmente los días 5 de cada mes lo de todo ese mes y el día 5 de enero lo de todo el año: 
- si un cliente contrata un servicio mensual a día 15 de agosto entonces podrá empezar a utilizar el servicio desde ya mismo pero el 5 de sept se le cargará el mes de sept más la parte proporcional del mes de agosto. 
- si un cliente contrata un servicio anual a día 15 de agosto entonces el 5 de sept se la pasa la cuenta de la parte proporcional de todo el año y el 5 de enero se le cobra el siguiente año. 

[x] qué pasa si el cliente rechaza una domiciliación? Si simplemente no se llega a cargar el recibo entonces no pasaría nada, se le mantendría activo el usuario para que pudiera consultar todo lo que haya hecho y se trataría el caso de la misma manera que si simplemente no hubiera renovado la contratación del servicio. En cambio si el servicio se le ha cargado, lo está usando como si tal cosa y luego lo cancela entonces directamente se desabilita su usuario para obligarle a ponerse en contacto con la empresa. 


## Extensiones Yii y librerías de interés 
### simpleWorkflow, extension Yii para gestión de workflows 
[simpleWorkflow!](http://s172418307.onlinehome.fr/project/sandbox/www/index.php?r=simpleWorkflow/page&view=home )
Está interesante, implementa el tema de workflow a través de behaviours en yii y simplemente requiere un campo status en los modelos que se les quiera añadir workflow y definir el workflow (la definición del workflow es muy sencilla). 

Los peros son que no está migrado a yii2 aún (ni parece que esté muy activo el tema), que no parece que soporte tampoco un pequeño histórico del recorrido del modelo por el workflow, y que no permite la modificación del workflow a través de la UI  

El código es igual un poco complejo para intentar hacer un fork y adaptarlo a mis necesidades pero lo que sí se ha hecho es tomarlo como inspiración para la implementación.

### TreeView Plugin con Bootstrap (interesante porque tenemos muchas estructuras tipo arbol (brand-regional_store_network-store-store-location   o   category-product-product_variant-item   o    form-form_block-form_field, etc, etc)
http://www.jqueryscript.net/layout/Nice-Tree-View-Plugin-with-jQuery-Bootstrap-3-Easy-Tree.html

## Lecturas de interés 
### Inspiración nuevas features
[Características deseables en un gestor de workflows!](http://kissflow.com/process_playbook/workflow-management-system-10-must-have-features/)

### Competidores servicios PYMEs
http://www.typeforms.com --> diseño web muy logrado aunque tal vez poco funcional
http://www.mandoocms.com/