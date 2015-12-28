/**
 * Created by longNightKing on 12/14/15.
 */
window.onload = function(){
    httpGetAsync('/collections', function(res){
        var collections = $.parseJSON(res);
        var list = '';
        for(var i = 0; i < collections.length; i++){
            list += "<li><a href='/table?id=" + collections[i] + "'>" + collections[i] +"</a></li>";
        }
        document.getElementById("collectionList").innerHTML = list;
    });
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function addRow(){
    var colNum = document.getElementById("tableBody").rows[0].cells.length;
    var dammyRow = "<tr>";
    for(var i = 0; i < colNum; i++){
        dammyRow += "<td class='tableCell' rel='popover' data-toggle='popover' data-content='I am popover'>undefined</span></td>";
    }
    document.getElementById("tableContent").innerHTML += dammyRow + "</tr>";
}

$(document).ready(function(){
    $(".tableCell").ondblclick(function(){
        alert("sssbbb");
    });
});