$(document).ready(function(){

$.ajax(
  {
    "url":"http://157.230.17.132:3012/todos",
    "method": "GET",
    "success": function (data) {
      renderToDo(data);
    },
    "error": function () {
      alert("Errore");
    }
  }
);

});


function renderToDo(data) {
  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "data": data
  }

  var html = template(context);
  $("#to-do").append(html);
}
