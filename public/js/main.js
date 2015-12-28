/**
 * Created by longNightKing on 12/14/15.
 */
/*$(document).ready(function(){
    httpGetAsync('/collections', function(res){
        var collections = $.parseJSON(res);
        var list = '';
        for(var i = 0; i < collections.length; i++){
            list += "<li><a href='/table?id=" + collections[i] + "'>" + collections[i] +"</a></li>";
        }
        $("#collectionList").html(list);
    });
});

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

}

/*function addRow(){
    var colNum = document.getElementById("tableBody").rows[0].cells.length;
    var dammyRow = "<tr>";
    for(var i = 0; i < colNum; i++){
        dammyRow += "<td class='tableCell' contenteditable='true'>undefined</span></td>";
    }
    $("#tableContent").html( $("#tableContent").html() + dammyRow + "</tr>");
    $("td").dblclick(onTableCelldbClick);
}

function onTableCelldbClick(){
    e.stopPropagation();
    var currentElement = $(this);
    var value = $(this).html();
    //inflateCell(currentElement, value);
}*/
angular.module('quokkaDBMS', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'collectionsController',
            templateUrl: '../html/index.html'
        }).
        when('/table/:name', {
            controller: 'tableController',
            templateUrl: '../html/table.html'
        });
        //otherwise({ redirectTo: '/' });

    }])

    .service('dbmsService', ['$http', function ($http) {

        var urlBase = '';
        this.getCollections = function () {
            return $http.get(urlBase + '/collections');
        };

        this.getTableById = function (id) {
            return $http.get(urlBase + '/table/' + id);
        };

        this.saveDocument = function (name, data){
            return $http.post(urlBase + '/table/' + name, data);
        }

        this.dropDocument = function(name, data){
            return $http.delete(urlBase + '/table/' + name, {params:{_id: data}});
        }
    }])

    .controller('collectionsController', function($scope, $location, dbmsService) {
        var collections = this;
        dbmsService.getCollections()
            .success(function(data) {
                collections.list = data;
            });
    })

    .controller('tableController', function($scope, $location, $routeParams, dbmsService) {
        var table = this;
        var id = $routeParams.name;
        refreshPage();

        table.addPendingRow = function(){

            var newData = cloneAndAddID(table.currentSchema);
            //table.currentTableData.push(newData);
            table.editingElem = newData;
        };

        table.edit = function(editingElem){
            table.editingElem = editingElem;
        }

        table.save = function(){
            dbmsService.saveDocument(table.currentTableName, removeEmptyDataProperty(table.editingElem)).success(function(data){
                callBackAfterEdit(data, '#editModal');
            });
        }

        table.add = function(){
            dbmsService.saveDocument(table.currentTableName, removeEmptyDataProperty(table.editingElem)).success(function(data){
                callBackAfterEdit(data, '#addRowModal');
            });
        }

        table.delete = function(){
            dbmsService.dropDocument(table.currentTableName, table.editingElem._id).success(function(data){
                callBackAfterEdit(data, '#editModal');
            });


        }

        function removeEmptyDataProperty(data){
            for (var attr in data) {
                if (data.hasOwnProperty(attr) && !data[attr]){
                    delete data[attr];
                }
            }
            return data;
        }

        function refreshPage(){
            dbmsService.getTableById(id).success(function(data){
                table.currentTableName = data.tableName;
                table.currentSchema = data.tableSchema;
                table.currentTableData = data.tableData;
            });
        }

        function callBackAfterEdit(data, modalId){
            hideModal(modalId);
            $location.path('/table/' + table.currentTableName);
            refreshPage();
        }

        function hideModal(modalId){
            angular.element($(modalId)).modal('hide');
        }

        function cloneAndAddID(obj) {
            var copy;
            if (null == obj || "object" != typeof obj) return obj;
            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }
            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }
            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                copy._id = '';
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            }
            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    });