$(document).ready(function() {

    $.ajax({
        url:"product.json",
        dataType:"json",
        success: function(data) {
            let item =""
            $.each(data,function(key,value) {
                item += '<tr>'
                item += '<td>'+value.ID+'</td>'
                item += '<td>'+value.designation+'</td>'
                item += '<td>'+value.prix+'</td>'
                item += '<td>'+value.categorie+'</td>'
                item += '<td>'+value.disponible+'</td>'
                item += '<td>'+"RaisonSocial: "+value.fournisseur.Raison_Sociale+'<br>'+"Adresse: "+value.fournisseur.Adresse+'</td>'
                item += '</tr>' 
                console.log(value.disponible)
            });
            $("#table").append(item);
        }
    })  
});
$(".form-control").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
$('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(tri($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})


function tri(index) {
    return function(a, b) {
        var valA = celValue(a, index), valB = celValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function celValue(row, index){ return $(row).children('td').eq(index).text() }
