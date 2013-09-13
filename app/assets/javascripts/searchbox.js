$(document).ready(function() {
	var deals = [];
	var division = $("#division_select").val();
	var client_id = "ee7ef79a62fc7685ac2ef382c7a9ef885a3035d0";
	setAutocompleteValues(division,client_id,deals);

	$("#division_select").change(function(){
		setAutocompleteValues($("#division_select").val(), client_id, deals);
	});

	$("#searchButton").click(function(){
		var url = "http://www.groupon.com/browse/" + $("#division_select").val() + "?query=" + $("#searchBox").val();
		window.open(url);
	});
})

function setAutocompleteValues (division, client_id, deals) {
	deals.length = 0;
	$.getJSON("http://api.groupon.com/v2/deals.json?client_id="+client_id+"&division_id="+division+"&callback=?",
					function(data) {

						$.each(data["deals"], function(i,deal) {
							deals.push(deal["merchant"]["name"]);
						});
					}
				);
	$("#searchBox").autocomplete({
		source: function ( request, response ) {
			var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i");
			response( $.grep( deals, function ( item ){
				return matcher.test( item );
			}));
		}
	});
}