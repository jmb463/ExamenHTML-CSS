// fichero xml que está en el servidor rawgit
var url="https://rawgit.com/jmb463/ExamenHTML-CSS/master/xml/Preguntas.XML";
var xhttp = new XMLHttpRequest();
var nota = 0;
var respuestaText = [];
var respuestaSelect = [];
var respuestaSelMultiple = [];
var respuestaCheckbox = [];
var respuestaRadio = [];
var formulario = null;

window.onload = function(){

  //Definicion de eventos
  document.getElementById("inicio").onclick = function(){inicio();}
  document.getElementById("inf").onclick = function(){inf();};
  document.getElementById("form").onclick = function(){form();};

  formulario = document.getElementById("formulario");
  formulario.onsubmit=function(){
    iniciarNota();
    if (comprueba()){
      corregirText();
      corregirSelect();
      corregirSelMultiple();
      corregirCheckbox();
      corregirRadio();
      darNota();
      refrescar();
    }
    return false;
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // función personalizada que gestiona la respuesta a la petición de fichero
      gestionarXml(this); 
    }
  };
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();
}

// funciones

function inicio(){
  document.getElementById("texto").style.display="inline-block";
  document.getElementById("informacion").style.display="none";
  document.getElementById("formulario").style.display="none";
}

function inf(){
  document.getElementById("texto").style.display="none";
  document.getElementById("informacion").style.display="inline-block";
  document.getElementById("formulario").style.display="none";
}
function form(){
  document.getElementById("texto").style.display="none";
  document.getElementById("informacion").style.display="none";
  document.getElementById("formulario").style.display="inline-block";
}

//comprobar si las preguntas estan contestadas

function comprueba(){

  //Comprobación de las preguntas tipo text
  for(numPreg = 0; numPreg < 2; numPreg ++){
    if (formulario.elements[numPreg].value=="") {
      formulario.elements[numPreg].focus();
      alert("Responde la pregunta "+(numPreg+1));
      return false;
    }
  }

  //Comprobación de los selects de tipo normal
  for(numPreg = 2; numPreg < 4; numPreg ++){
    if (formulario.elements[numPreg].selectedIndex==0) {
      formulario.elements[numPreg].focus();
      alert("Selecciona una opción en la pregunta "+(numPreg+1));
      return false;
    }
  }

  //Comprobación de los selects de tipo mútliple
  for(numPreg = 4; numPreg < 6; numPreg ++){
    var multiplesRespondidas=false;
    for(i = 1; i < (formulario.elements[numPreg].length); i ++){
      var opt = formulario.elements[numPreg].options[i];
      if(opt.selected){
        multiplesRespondidas = true;
      }
    }
    if (!multiplesRespondidas) {
      formulario.elements[numPreg].focus();
      alert("Selecciona al menos una opción en la pregunta "+(numPreg+1));
      return false;
    }
  }

  //Comprobación de las preguntas de tipo checkbox
  for(numPreg = 6; numPreg < 8; numPreg ++){
    var checked=false;
    var nombre;
    if (numPreg==6){
      nombre=formulario.checkbox1;
    } 
    else {
      nombre=formulario.checkbox2;
    }
    for (i = 0; i < nombre.length; i++) {  
      if (nombre[i].checked) {
        checked=true;
      }
    }
    if (!checked) {
      nombre[0].focus();
      alert("Selecciona al menos una opcion en la pregunta "+(numPreg+1));
      return false;
    }
  }

  //Comprobación de las preguntas de tipo radio
  for(numPreg = 8; numPreg < 10; numPreg ++){
    var nombreRadio;
    if (numPreg==8){
      nombreRadio=formulario.Radio1;
    } 
    else {
      nombreRadio=formulario.Radio2;
    }
    if (nombreRadio.value=="") {
      nombreRadio[0].focus();
      alert("Responde la pregunta "+(numPreg+1));
      return false;
    }   
  }
  return true;
}

function gestionarXml(dadesXml){
  var xmlDoc = dadesXml.responseXML;

  //Enunciados
  for (i = 0; i < 10; i++) {
    var title= xmlDoc.getElementsByTagName("title")[i].innerHTML;
    document.getElementsByTagName("h3")[i].innerHTML = title;
  }

  //Bucle textArea
  for (i = 0; i < 2; i++){
    respuestaText[i] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML;
  }

  //bucle Select
  for(i = 2; i < 4; i++){
    var opcionesSelect = [];
    var tamaño = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for (j = 0; j < tamaño; j++) { 
      opcionesSelect[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosSelect(opcionesSelect, i);
    respuestaSelect[i] = parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML);
  }

  //bucle SelectMultiple
  for(i = 4; i < 6; i++){
    var opcionesSelect = [];
    var tamaño = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for (j = 0; j < tamaño; j++) { 
      opcionesSelect[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    //Introducción de datos
    ponerDatosSelect(opcionesSelect, i);
    var res = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
    respuestaSelMultiple[i]=[];
    for (j = 0; j < res; j++){
      respuestaSelMultiple[i][j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[j].innerHTML;
    }
  }

  //bucle Checkbox
  for(i = 6; i < 8; i++){
    var opcionesCheckbox = [];
    var tamaño = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < tamaño; j++){
      opcionesCheckbox[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosCheckbox(opcionesCheckbox, i);
    var res = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
    respuestaCheckbox[i]=[];
    for (j = 0; j < res; j++){
      respuestaCheckbox[i][j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[j].innerHTML;
    }
  }

  //bucle radio
  for(i = 8; i < 10; i++){
    var opcionesRadio = [];
    var tamaño = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < tamaño; j++){
      opcionesRadio[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    }
    ponerDatosRadio(opcionesRadio, i);
    respuestaRadio[i] = parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML);
  }
}

function ponerDatosSelect(optSelect, i){
  var select = document.getElementsByTagName("select")[i - 2];
  for (i = 0; i < optSelect.length; i++){
    var option = document.createElement("option");
    option.text = optSelect[i];
    option.value = i + 1;
    select.options.add(option);
  }
}

function ponerDatosCheckbox(optCheckbox, i){
  var checkbox = document.getElementsByClassName("checkbox")[i-6];
  var forAttribute;
  if(i == 6){
    forAttribute = "checkbox1";
  }
  else{
    forAttribute = "checkbox2";
  }
  for(i = 0; i < optCheckbox.length; i++){
    var input = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    label.innerHTML = optCheckbox[i];
    //label.setAttribute("for", forAttribute);
    label.className = "container";
    span.className = "checkmark";
    input.type = "checkbox";
    //input.name = "opcion" + (i+1);
    input.id = forAttribute;
    input.value = i + 1;
    checkbox.appendChild(label);
    label.appendChild(input); 
    label.appendChild(span);
    checkbox.appendChild(document.createElement("br"));
  }
}

function ponerDatosRadio(optRadio, i){
  var radio = document.getElementsByClassName("radio")[i-8];
  var nameRadio;
  if(i == 8){
    nameRadio = "Radio1";
  }
  else{
    nameRadio = "Radio2";
  }
  for(i = 0; i < optRadio.length; i++){
    var input = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    label.innerHTML = optRadio[i];
    label.className = "containerRadio";
    span.className = "checkmarkRadio";
    input.type = "radio";
    input.name = nameRadio;
    input.value = i + 1;
    radio.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);
    radio.appendChild(document.createElement("br"));
  }
}



//corrección text
function corregirText() {
  for(i = 0; i < 2; i ++){
    var txt = formulario.elements[i].value;  
    if (txt==respuestaText[i]) {
      nota +=1;
    }
  }
}

//Corrección Select 
function corregirSelect() {
  for(i = 2; i < 4; i++){
    var sel = formulario.elements[i].value;  
    if (sel.selectedIndex==respuestaSelect[i]) {
      nota +=1;
    }     
  }    
}

//Corrección Select Múltiple
function corregirSelMultiple(){
  for(n = 4; n < 6; n++){
    var sel = formulario.elements[n];
    var correcta=[];
    for(i = 1; i < (sel.length); i++){
      var opt=sel.options[i];
      if(opt.selected){
        correcta[i]=false; 
        for (j = 0; j < respuestaSelMultiple[n].length; j++) {
          if ((i-1)==respuestaSelMultiple[n][j]) correcta[i]=true;
        }
        if (correcta[i]) {
          nota +=1.0/respuestaSelMultiple[n].length;      
        }
      }
    }       
  }
}

//Corrección preguntas tipo checkbox
function corregirCheckbox(){
  var f=formulario;
  var correcta = [];
  for (n = 6; n < 8; n++){
    var nombre;
    if (n==6){
      nombre=f.checkbox1;
    } 
    else {
      nombre=f.checkbox2;
    }
    for (i = 0; i < nombre.length; i++) {  
      if (nombre[i].checked) {
        correcta[i]=false;     
        for (j = 0; j < respuestaCheckbox[n].length; j++) {
          if (i==respuestaCheckbox[n][j]) correcta[i]=true;
        }
        if (correcta[i]) {
          nota +=1.0/respuestaCheckbox[n].length;      
        }   
      } 
    }
  }
}

//Corrección preguntas tipo radio
function corregirRadio(){
  var f=formulario;
  for(n=8;n<10;n++){
    var nombreRadio;
    if (n==8){
      nombreRadio=f.Radio1;
    } 
    else {
      nombreRadio=f.Radio2;
    }
    if (nombreRadio.value==respuestaRadio[n]) {
      nota +=1;
    }
  }        
}

function iniciarNota(){
  nota = 0.0;
}

function darNota(){
  if (nota > 4 ){
    alert("Nota: " + nota.toFixed(2) + "/10 Enhorabuena has aprobado este test")
  }
  else{
    alert("Nota: " + nota.toFixed(2) + "/10 Has suspendido este test, intentalo de nuevo")
  }
}

function refrescar(){
  location.reload();
}
