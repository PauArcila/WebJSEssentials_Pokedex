function validaCaja(key){
	let pat=/^[0-9]{1,3}$/;
	$("#errorMsj").hide();
	
	if ( key==" " || key=="") {
		//$('#logo').append(`<h3 class="text-warning text-center visible" id="errorMsj">Ingrese un número válido</h3>`);
		$("#errorMsj").text("Digite un número").show();				
		return false;
	}

	else if ( key < 1 || key > 807 ) {
		//$('#logo').append(`<h3 class="text-warning text-center visible" id="errorMsj">Ingrese un número válido</h3>`);
		$("#errorMsj").text("Solo números entre 1 y 807").show();				
		return false;
	}

	else if ( !pat.test(key)  )   {
		$("#errorMsj").text("Ingrese solo números").show();		
		return false;
	}
	else		
		return true;
}


$(document).ready( function() {
	$('#buscar').click( function(){
		var link="https://pokeapi.co/api/v2/pokemon/";
			var key = $('#pokemon').val(); //numero ingresado debe ser del 1 al 807

			if(validaCaja(key)){
				$.ajax({
					type:"GET",
					url: link+key,
					success: function(data){
						console.log($('#card1').length);
						console.log(data.sprites.front_default);
						console.log("nombre: "+data.name);
						console.log("peso: "+data.weight);
						console.log("altura: "+data.height);

						if($('#card1').length < 1){
							$('#contenedor').append(`<div id="card-deck" class="card-deck mb-4 p-1 py-5 mt-4 " ></div>`);
							$('#card-deck').append(`<div id="card1" class="col-sm-12 col-md-4 col-lg-4 p-0 mb-4" ></div>`);
							$('#card1').append(`<div id="subcard" class="card"></div>`);
							$('#subcard').append(`<img id="foto" class="img-responsive" src=${data.sprites.front_default} alt="pokemon"></img>`);
							$('#subcard').append(`<div id="card-body" class="card-body tarjeta p-1"></div>`);
							$('#card-body').append(`<h4 id="nombre" class="card-title text-info text-center display-4 text-capitalize">${data.name}</h4>`);
							$('#card-body').append(`<dl id="lista" class="row mx-1"></dl>`);
  							
  							$('#lista').append(`<dt id="tipo" class="col-sm-5 border-top ">Tipo</dt>`);
  							$('#lista').append(`<dd id="dtipo" class="col-sm-6 border-top"></dd>`);
  								for(i=0 ; i<data.types.length ; i++){
									$('#dtipo').append(`<li id="cadatipo">${data.types[i].type.name}</li>`);
								};
							$('#lista').append(`<dt id="habilidades" class="col-sm-5 border-top">Habilidades</dt>`);
							$('#lista').append(`<dd id="dhabi" class="col-sm-6 border-top"></dd>`);
							for(i=0 ; i<data.abilities.length ; i++){
								$('#dhabi').append(`<li id="cadahabi">${data.abilities[i].ability.name}</li>`);
							};
							$('#lista').append(`<dt id="peso" class="col-sm-5  border-top pt-1 ">Peso</dt>`);
							var pesoKilo = data.weight/10;
							$('#lista').append(`<dd id="dpeso" class="col-sm-6 border-top pt-1">${pesoKilo} kg</dd>`);/*dividir peso en 100 y mostrarlo en kilos*/
							var alturaMetro = data.height/10;
							$('#lista').append(`<dt id="altura" class="col-sm-5  border-top pt-1">Altura</dt>`);
							$('#lista').append(`<dd id="daltu" class="col-sm-6 border-top pt-1">${alturaMetro} m<dd>`);/*dividir en 100 y mostrarlo en metros*/
							
							$('#card-deck').append(`<div id="card2" class="card col-sm-12 col-md-8 col-lg-8 p-1 rounded" style="height: 470px;" ></div>`);
							$('#card2').append(`<div id="subcard2" class="card-body tarjeta p-1"></div>`);
							$('#subcard2').append(`<div id="chartContainer" ></div>`);						
							
						} /*cierre if inicial*/

						else{

							$('#foto').attr("src", data.sprites.front_default);
							$('#nombre').text(data.name);							
							$('#lista').remove();

							$('#card-body').append(`<dl id="lista" class="row mx-1"></dl>`);  							
  							$('#lista').append(`<dt id="tipo" class="col-sm-5 border-top">Tipo</dt>`);
  							$('#lista').append(`<dd id="dtipo" class="col-sm-6 border-top"></dd>`);
  								for(i=0 ; i<data.types.length ; i++){
									$('#dtipo').append(`<li id="cadatipo">${data.types[i].type.name}</li>`);
								};
							$('#lista').append(`<dt id="habilidades" class="col-sm-5 border-top">Habilidades</dt>`);
							$('#lista').append(`<dd id="dhabi" class="col-sm-6 border-top"></dd>`);
							for(i=0 ; i<data.abilities.length ; i++){
								$('#dhabi').append(`<li id="cadahabi">${data.abilities[i].ability.name}</li>`);
							};
							$('#lista').append(`<dt id="peso" class="col-sm-5 border-top pt-1">Peso</dt>`);
							var pesoKilo = data.weight/10;
							$('#lista').append(`<dd id="dpeso" class="col-sm-6 border-top pt-1">${pesoKilo} kg</dd>`);/*dividir peso en 100 y mostrarlo en kilos*/
							var alturaMetro = data.height/10;
							$('#lista').append(`<dt id="altura" class="col-sm-5 border-top pt-1">Altura</dt>`);
							$('#lista').append(`<dd id="daltu" class="col-sm-6 border-top pt-1">${alturaMetro} m<dd>`);/*dividir en 100 y mostrarlo en metros*/
							}// de aqui hacia arriba estamos poblando la tarjeta de descripción

							var grafico=new Array();
							for(i=0 ; i<data.stats.length; i++){
								grafico.push({ label: data.stats[i].stat.name, y : data.stats[i].base_stat })

								var options = {
									title: {
										animationEnabled: true,
										fontFamily: "Paytone One",
										text: "Estadísticas",
										fontColor: "#17A2B8",										
										padding: 2
									},
										data: [{
											type: "bar",
											yValueFormatString: "#,###",
				        							indexLabel: "{y}",// color: "#546BC1",
				        							dataPoints: grafico,
				        						}]
				             	};//cierre var options
				             	$("#chartContainer").CanvasJSChart(options);
				             	//console.log($('#card-deck').length);
			          		}// cierre for

		         	}, // cierre success
		         	dataType:'json',
		       });// cierre ajax
			}
		});// cierre buscar se agrego un parentesis

	});// cierre document ready
