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
  document.getElementById("p1").innerHTML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  document.getElementById("t1").innerHTML = xmlDoc.getElementsByTagName("type")[0].innerHTML;
  document.getElementById("r1").innerHTML = xmlDoc.getElementsByTagName("answer")[0].innerHTML;

  document.getElementById("p2").innerHTML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  document.getElementById("t2").innerHTML = xmlDoc.getElementsByTagName("type")[1].innerHTML;
  document.getElementById("r2").innerHTML = xmlDoc.getElementsByTagName("answer")[1].innerHTML;

  document.getElementById("p3").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  document.getElementById("t3").innerHTML = xmlDoc.getElementsByTagName("type")[2].innerHTML;
  document.getElementById("r3").innerHTML = xmlDoc.getElementsByTagName("answer")[2].innerHTML;

  document.getElementById("p4").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  document.getElementById("t4").innerHTML = xmlDoc.getElementsByTagName("type")[3].innerHTML;
  document.getElementById("r4").innerHTML = xmlDoc.getElementsByTagName("answer")[3].innerHTML;

  document.getElementById("p5").innerHTML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  document.getElementById("t5").innerHTML = xmlDoc.getElementsByTagName("type")[4].innerHTML;
  document.getElementById("r5").innerHTML = xmlDoc.getElementsByTagName("answer")[4].innerHTML;

  document.getElementById("p6").innerHTML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  document.getElementById("t6").innerHTML = xmlDoc.getElementsByTagName("type")[5].innerHTML;
  document.getElementById("r6").innerHTML = xmlDoc.getElementsByTagName("answer")[5].innerHTML;

  document.getElementById("p7").innerHTML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  document.getElementById("t7").innerHTML = xmlDoc.getElementsByTagName("type")[6].innerHTML;
  document.getElementById("r7").innerHTML = xmlDoc.getElementsByTagName("answer")[6].innerHTML;


  document.getElementById("p8").innerHTML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  document.getElementById("t8").innerHTML = xmlDoc.getElementsByTagName("type")[7].innerHTML;
  document.getElementById("r8").innerHTML = xmlDoc.getElementsByTagName("answer")[7].innerHTML;


  document.getElementById("p9").innerHTML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  document.getElementById("t9").innerHTML = xmlDoc.getElementsByTagName("type")[8].innerHTML;
  document.getElementById("r9").innerHTML = xmlDoc.getElementsByTagName("answer")[8].innerHTML;

  document.getElementById("p10").innerHTML = xmlDoc.getElementsByTagName("title")[9].innerHTML;
  document.getElementById("t10").innerHTML = xmlDoc.getElementsByTagName("type")[9].innerHTML;
  document.getElementById("r10").innerHTML = xmlDoc.getElementsByTagName("answer")[9].innerHTML;
  
}
