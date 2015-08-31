// Basic parameters
OPTIONS={};
VALUES={};
PARAMS={};

PARAMS.DEFAULT_LANG='es-ES';

PARAMS.DATE_FORMAT='DD/MM/YYYY';
PARAMS.DATETIME_FORMAT='DD/MM/YYYY HH:mm:ss';

/* qué tab queremos que se muestre por defecto en el itemlocator para seleccionar items. Valores posibles: 'category'|'qrcode'|'search'|'browse'|'manual'  Por defecto qrcode */
PARAMS.TEST_MODE=false;
PARAMS.ITEMLOCATOR_METHODS=['qrcode','manual','search','browse','category'];  // ['qrcode','manual','search','browse','category']
PARAMS.ITEMLOCATOR_DEFAULTMETHOD='category';  // Fusionar este con el anterior y añadir tambien el orden en que deben salir las pestañas!!!!
PARAMS.PAYMENT_DEFAULTMETHOD='cash';  // 'cash' o 'credit-card'
PARAMS.CURRENCY={
	name: 'Euro',
	shortname: 'EUR',
	symbol: '€',
	precision: 2
};

PARAMS.PHONE_DEFAULT_PREFIX='34';
PARAMS.PHONE_DEFAULT_NAME='Móvil personal';
PARAMS.PHONE_DEFAULT_TYPE='Mobile';

OPTIONS.PHONE_TYPE=[
	{label: 'Mobile', value: 'Mobile'},
	{label: 'Fixed', value: 'Fixed'},
]
VALUES.PHONE_TYPE=OPTIONS.PHONE_TYPE.map(function(item,i) { return item.value; });

OPTIONS.GENDER=[
	{label: 'Male', value: 'Male'},
	{label: 'Female', value: 'Female'},
];
VALUES.GENDER=OPTIONS.GENDER.map(function(item,i) { return item.value; });

OPTIONS.CIVIL_STATUS=[
	{label: 'Single', value: 'Single'},
	{label: 'Married', value: 'Married'},
	{label: 'Divorced', value: 'Divorced'},
	{label: 'Widow', value: 'Widow'},
];
VALUES.CIVIL_STATUS=OPTIONS.CIVIL_STATUS.map(function(item,i) { return item.value; });

OPTIONS.SOCIAL=[
	{label: 'Facebook', value: 'Facebook'},
	{label: 'Twitter', value: 'Twitter'},
	{label: 'Youtube', value: 'Youtube'},
	{label: 'Pinterest', value: 'Pinterest'},
	{label: 'Blog', value: 'Blog'},
	{label: 'Web', value: 'Web'},
	{label: 'LinkedIn', value: 'LinkedIn'},
	{label: 'Google+', value: 'Google+'},
	{label: 'Other', value: 'Other'},
];
VALUES.SOCIAL=OPTIONS.SOCIAL.map(function(item,i) { return item.value; });

OPTIONS.COUNTRY=[
	{label: 'Spain', value: 'Spain'},
	{label: 'Portugal', value: 'Portugal'},
	{label: 'France', value: 'France'},
	{label: 'Italy', value: 'Italy'},
	{label: 'Germany', value: 'Germany'},
];
VALUES.COUNTRY=OPTIONS.COUNTRY.map(function(item,i) { return item.value; });

OPTIONS.ADDRESS_TYPE=[
	{label: 'Home', value: 'Home'},
	{label: 'Work', value: 'Work'},
	{label: 'Other', value: 'Other'},
];
VALUES.ADDRESS_TYPE=OPTIONS.ADDRESS_TYPE.map(function(item,i) { return item.value; });

OPTIONS.EMAIL_TYPE=[
	{label: 'Personal', value: 'Personal'},
	{label: 'Work', value: 'Work'},
	{label: 'Other', value: 'Other'},
];
VALUES.EMAIL_TYPE=OPTIONS.EMAIL_TYPE.map(function(item,i) { return item.value; });

OPTIONS.SPECIAL_OFFER_TYPE=[  
	{label: 'Discount', value: 'Discount'},
	{label: 'Volume Reduction', value: 'Volume Reduction'},
	{label: 'Group', value: 'Group'},
	{label: 'Gift', value: 'Gift'},
];
VALUES.SPECIAL_OFFER_TYPE=OPTIONS.SPECIAL_OFFER_TYPE.map(function(item,i) { return item.value; });

OPTIONS.REDUCTION_TYPE=[  
	{label: '€', value: 'Amount'},
	{label: '%', value: 'Percentage'},
];
VALUES.REDUCTION_TYPE=OPTIONS.REDUCTION_TYPE.map(function(item,i) { return item.value; });

OPTIONS.CASHFLOW_IN_CONCEPTS=[
	{label: 'Puesta a disposición de cambio', value: 'Puesta a disposición de cambio'},
	{label: 'Pago por servicio', value: 'Pago por servicio'},
	{label: 'Otros', value: 'Otros'},
];

OPTIONS.CASHFLOW_OUT_CONCEPTS=[
	{label: 'Limpieza cristales', value: 'Limpieza cristales'},
	{label: 'Portes paquetería', value: 'Portes paquetería'},
	{label: 'Pago proveedor', value: 'Pago proveedor'},
	{label: 'Retirada de billetes grandes', value: 'Retirada de billetes grandes'},
	{label: 'Otros', value: 'Otros'},
];

Schemas={};