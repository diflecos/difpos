// ATENCION: todas los metodos de Order, Discount, etc funcionan con los precios multiplicados por 100!! Solo se convierte a euros cuando vayamos a mostrarlo en pantalla o algo!



/* 
Cada OrderItem dentro de un Order irá identificada por un index. Este index se inicializa en el momento de añadir el OrderItem al Order (a partir de la variable next_index del Order) y ya no cambia nunca más. Es decir, si borramos un OrderItem no vamos a re-indexar los que quedan ni nada. 
*/

OrderItem=Astro.Class({
	name: 'OrderItem',
	fields: {
		name: {
			type: 'string',	
		},
		unit_price_bt: {    
			type: 'string',	
		},
		unit_discount: {
			type: 'object',	
		},
		quantity: {   
			type: 'number',	
		},
		tax: {
			type: 'object',
		}
	},
	relations: {

	},		
	methods: {
		/* 
		Updates OrderItem prices based on unit_price and relevant discounts that may exist
		To be taken into account: method  getDiscountedPrice() will be called no matter what type of discount we are dealing with (AmountDiscount or PercentageDiscount), so all of them must implement this method in order to avoid errors 

		This method may be called whenever a discount is added to/removed from the OrderItem. Thus it must exist on its own (if this were not the case this piece of code would just make part of the constructor)
		*/


		/* Increments by 1 the quantity of the OrderItem and updates prices accordingly */
		add1: function() {
			this.quantity++;	
		},

		/* Este método no hace nada cuando la cantidad es 1, para que se produzca el decremento la cantidad inicial tiene que ser de 2 o más */
		del1: function() {
			if(this.quantity>1) {
				this.quantity--;		
			}
		}, 
		price_at: function() {
			if(unit_discount.apply=='BeforeTax') {
				var discounted_unit_price_bt=unit_discount.discountedPrice(unit_price_bt);
				var tax_amount=this.tax.calc(discounted_unit_price_bt);
				return (discounted_unit_price_bt+tax_amount)*this.quantity;
			} else {
				var tax_amount=this.tax.calc(unit_price_bt);
				return (unit_price_bt+tax_amount)*this.quantity;
			}
		}
	},
	validators: {
	}
});

