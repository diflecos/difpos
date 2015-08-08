Template.session_view.helpers({
	operations: function() {
		return [
			{
				op_date: "06/08/2015 10:22",
				op_type: "Order",
				op_details: "Camiseta calada azul cielo<br>Leggins animal print T52<br>Bandelettes lycra negra C",
				op_amount: "43,00€",
				op_payment_type: "Credit card",
			},
			{
				op_date: "06/08/2015 13:58",
				op_type: "Money Out",
				op_details: "Limpieza cristales",
				op_amount: "20,00€",
				op_payment_type: "Cash",
			},
			{
				op_date: "06/08/2015 10:45",
				op_type: "Order",
				op_details: "Pantalon vaquero Lili's T56",
				op_amount: "22,00€",
				op_payment_type: "Cash",
			},
			{
				op_date: "06/08/2015 11:28",
				op_type: "Money In",
				op_details: "cambio Antuan",
				op_amount: "60,00€",
				op_payment_type: "Cash",
			},
			{
				op_date: "06/08/2015 13:58",
				op_type: "Money Out",
				op_details: "Retirada efectivo",
				op_amount: "300,00€",
				op_payment_type: "Cash",
			}
		]
	}, 
	session_comments: function() {
		return [{
			date: "06/08/2015 14:03",
			author: "Ruth",
			text: "Tengo un descuadre y no tengo ni idea de porqué",
		},{
			date: "07/08/2015 11:25",
			author: "Jara",
			text: "Validamos el descuadre porque es poco en relacion al número de ventas",		
		}];
	}
});
