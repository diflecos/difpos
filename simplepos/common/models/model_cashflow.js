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
		flow_type: {  // 'In' --> money inputs in the POS, 'Out' --> money outputs the POS
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
	},
	behaviors: ['audit_trail'],	
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
	}
});

