// fichero xml que está en el servidor rawgit
var url="xml/Preguntas.XML";

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

  for (i = 2; i < 6; i++) {
    var opcionesSelect = [];
    var nopt = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for (j = 0; j < nopt; j++) {
        opcionesSelect[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }

	var select = document.getElementsByTagName("select")[i - 2];
	for (k = 0; k < opcionesSelect.length; k++) {
    	var option = document.createElement("option");
    	option.text = opcionesSelect[k];
    	option.value = k + 1;
    	select.options.add(option);
    }
  }
}
