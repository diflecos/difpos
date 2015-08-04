CashFlow=function CashFlow(flow_type,amount,concept,comment) {
	this.cashFlowId;
	this.flow_type=flow_type; 
	this.amount=amount;
	this.concept=concept;
	this.comment=comment;
	this.op_date=undefined;	
}

CashFlow=Astro.Class({
	name: 'CashFlow',
	collection: CashFlows,
	fields: {
		flow_type: {  // "In" --> money inputs in the POS, "Out" --> money outputs the POS
			type: 'string',		
		},
		amount: {
			type: 'number',	
		},
		currencyId: {
			type: 'string'
		},
		concept: {
			type: 'string',	
		},
		comment: {
			type: 'string',	
		},
		op_date: {
			type: 'date',	
		},
		createdAt: {
			type: 'date',	
		},
		udpatedAt: {
			type: 'date',		
		},
		createdBy: {
			type: 'string',
		},
		updatedBy: {
			type: 'string',	
		},		
	},
	relations: {
		currency: {
			type: 'one',
			class: 'Currency',
			local: 'currencyId',
			foreign: '_id'			
		},	
	},		
	methods: {

	},
	validators: {
		flow_type: [
			Validators.required(),
			Validators.string(),		
		],
		amount: [
			Validators.required(),
			Validators.number(),		
		],
		currencyId: [
			Validators.required(),
			Validators.string(),
		],
		concept: [
			Validators.required(),
			Validators.string(),
		],
		comment: [
			Validators.string(),		
		],
		op_date: [
			Validators.required(),
			Validators.date(),		
		],
		createdAt: [
			Validators.required(),
			Validators.date(),
		],
		updatedAt: [
			Validators.required(),
			Validators.date(),
		],
		createdBy: [
			Validators.required(),
			Validators.date(),
		],
		updatedBy: [
			Validators.required(),
			Validators.date(),
		],
	}
});

