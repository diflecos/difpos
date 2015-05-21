// Basic parameters
OPTIONS={};
VALUES={};

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

OPTIONS.PHONE_TYPE=[
	{label: 'Home', value: 'Home'},
	{label: 'Work', value: 'Work'},
	{label: 'Other', value: 'Other'},
];
VALUES.PHONE_TYPE=OPTIONS.PHONE_TYPE.map(function(item,i) { return item.value; });

OPTIONS.EMAIL_TYPE=[
	{label: 'Personal', value: 'Personal'},
	{label: 'Work', value: 'Work'},
	{label: 'Other', value: 'Other'},
];
VALUES.EMAIL_TYPE=OPTIONS.EMAIL_TYPE.map(function(item,i) { return item.value; });

Schemas={};


