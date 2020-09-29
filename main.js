$(document).ready(function(){


  // Chiamata di lettura
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


  // Evento click sul pulsante per cancellare le voci della lista.
  // Mi devo ricordare che, essendo un elemento aggiunto dopo con la chiamata ajax e non presente dall'inizio nel documento, devo usare il metodo .on("evento", "selettore", funzione());

  $("#to-do").on("click", ".delete", function(){
    // Mi salvo in una variabile il valore dell'attributo id ignettato nel Template
    var elment = $(this).parents("li");
    var id = elment.attr("id");

    // Chiamata di delete
    $.ajax(
      {
        "url":"http://157.230.17.132:3012/todos/" + id,
        "method": "DELETE",
        "success": function (data) {
          // Cancello visivamente la voce
          elment.remove();
        },
        "error": function () {
          alert("Errore");
        }
      }
    );

  });

  // Evento di creazione e post
  $(".add").click(function() {

    // Mi salvo il testo dell'input in una variabile
    var newDo = $("#new-element").val();

    if (newDo != ""){

      // Chiamata di POST
      $.ajax(
        {
          "url":"http://157.230.17.132:3012/todos/",
          "method": "POST",
          "data": {
            "text": newDo
          },
          "success": function(data) {
            // Stampo il campo input nella lista
            newDoCreated(data);

            // Svuoto il campo input
            newDo = $("#new-element").val("");
          },
          "error": function () {
            alert("Errore");
          }
        }
      );
    };
  });



});

// Template della lista

function renderToDo(data) {
  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  // Ricordarsi che il template vuole sempre un oggetto da stampare!

  for (var i = 0; i< data.length; i++){
    var context = {
      "id": data[i].id,
      "text": data[i].text
    }

    var html = template(context);
    $("#to-do").append(html);
  }
}


// Funzione di creazione di un nuovo elemento

function newDoCreated(data){

  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  // Ricordarsi che il template vuole sempre un oggetto da stampare!

  var context = {
    "id": data.id,
    "text": data.text
  }

  var html = template(context);
  $("#to-do").append(html);

}
