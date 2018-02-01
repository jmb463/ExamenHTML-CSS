// fichoro xml que está en el servidor rawgit
var url="https://cdn.rawgit.com/jmb463/ExamenHTML-CSS/5c45750a/Preguntas.XML";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  // función personalizada que gestiona la respuesta a la petición de fichero
  gestionarXml(this); 
 }
};
xhttp.open("GET", url, true); //url del fichero
xhttp.send();

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
  var xmlDoc = dadesXml.responseXML;

  for (var i = 0; i < 10; i++) {
    var title= xmlDoc.getElementsByTagName("title")[i].innerHTML;
    document.getElementsByTagName("h3")[i].innerHTML = title;
  }
}
