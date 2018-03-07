// fichero xml que está en el servidor rawgit
var url="https://rawgit.com/jmb463/ExamenHTML-CSS/master/xml/Preguntas.XML";
var xhttp = new XMLHttpRequest();
var nota = 0;
var respuestaText = [];
var respuestaSelect = [];
var respuestaSelMultiple = [];
var respuestaCheckbox = [];
var respuestaRadio = [];
var formElement = null;

window.onload = function(){

  //Definicion de eventos
  document.getElementById("inicio").onclick = function(){inicio();}
  document.getElementById("inf").onclick = function(){inf();};

  formElement = document.getElementById("formulario");
  formElement.onsubmit = function(){
    inicioNota();
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

    // funciones

  function inicio(){
    document.getElementById("texto").style.display="inline-block";
    document.getElementById("informacion").style.display="none";
  }
  function inf(){
    document.getElementById("texto").style.display="none";
    document.getElementById("informacion").style.display="inline-block";
  }

  function refrescar(){
    location.reload();
  }

  function darNota(){
    if (nota > 4 ){
      alert("Nota: " + nota.toFixed(2) + "/10 Enhorabuena has aprobado este test")
    }
    if (nota < 5){
      alert("Nota: " + nota.toFixed(2) + "/10 Has suspendido este test, intentalo de nuevo")
    }
  }

  function iniciarNota(){
    nota = 0.0;
  }

  function gestionarXml(dadesXml){
    var xmlDoc = dadesXml.responseXML;

    //Enunciados
    for (var i = 0; i < 10; i++) {
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
      var select = document.getElementsByTagName("select")[i - 2];
      for (k = 0; k < opcionesSelect.length; k++) {
        var option = document.createElement("option");
        option.text = opcionesSelect[k];
        option.value = k + 1;
        select.options.add(option);
      }
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
      var select = document.getElementsByTagName("select")[i - 2];
      for (k = 0; k < opcionesSelect.length; k++) {
        var option = document.createElement("option");
        option.text = opcionesSelect[k];
        option.value = k + 1;
        select.options.add(option);
      }
      var res = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
      respuestaSelMultiple[i]=[];
      for (j = 0; j < res; j++){
        respuestaSelMultiple[i][j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[j].innerHTML;
      }
    }

    //bucle Checkbox
    for(i = 6; i < 8; i++){
      var opcionesCheck = [];
      var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
      for(j = 0; j < largo; j++){
        opcionesCheck[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
      }
      ponerDatosCheckbox(opcionesCheck, i);
      var res = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
      respuestaCheckbox[i]=[];
      for (j = 0; j < res; j++){
        respuestaCheckbox[i][j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[j].innerHTML;
      }

    }

  //LEER RADIO
    for(i = 8; i < 10; i++){
      var opcionesRadio = [];
      var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
      for(j = 0; j < largo; j++){
        opcionesRadio[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
      }
      ponerDatosRadio(opcionesRadio, i);
      respuestaRadio[i] = parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML);
    }
  }

  function ponerDatosCheckbox(optCheck, i){
    var check = document.getElementsByClassName("checkbox")[i-6];
    var forAttribute;
    if(i == 6){
      forAttribute = "check1";
    }
    else{
    forAttribute = "check2";
    }
    for(i = 0; i < optCheck.length; i++){
      var input = document.createElement("input");
      var label = document.createElement("label");
      var span = document.createElement("span");
      label.innerHTML = optCheck[i];
      //label.setAttribute("for", forAttribute);
      label.className = "container";
      span.className = "checkmark";
      input.type = "checkbox";
      //input.name = "opcion" + (i+1);
      //input.id = forAttribute;
      input.value = i + 1;
      check.appendChild(label);
      label.appendChild(input); 
      label.appendChild(span);
      check.appendChild(document.createElement("br"));
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

  //comprobar si las preguntas estan contestadas

  function comprueba(){
    var f = formElement;

    //Comprobación de las preguntas tipo text
    for(numPreg = 0; numPreg < 2; numPreg ++){
      if (f.elements[numPreg].value=="") {
      f.elements[numPreg].focus();
      alert("Responde la pregunta "+(numPreg+1));
      return false;
      }
    }

    //Comprobación de los selects de tipo normal
    for(numPreg = 2; numPreg < 4; numPreg ++){
      if (f.elements[numPreg].selectedIndex==0) {
        f.elements[numPreg].focus();
        alert("Selecciona una opción en la pregunta "+(numPreg+1));
        return false;
      }
    }

    //Comprobación de los selects de tipo mútliple
    for(numPreg = 4; numPreg < 6; numPreg ++){
      var multiplesRespondidas=false;
      for(i = 1; i < (f.elements[numPreg].length); i ++){
        var opt = f.elements[numPreg].options[i];

        if(opt.selected){
          multiplesRespondidas = true;
        }
      }

      if (!multiplesRespondidas) {
        f.elements[numPreg].focus();
        alert("Selecciona al menos una opción en la pregunta "+(numPreg+1));
        return false;
      }
    }

    //Comprobación de las preguntas de tipo checkbox
    for(numPreg = 6; numPreg < 8; numPreg ++){
      var checked=false;
      var nombre;
      if (numPreg==6){
        nombre=f.check1;
      } 
      else {
        nombre=f.check2;
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
        nombreRadio=f.Radio1;
      } 
      else {
        nombreRadio=f.Radio2;
      }
      if (nombreRadio.value=="") {
        nombreRadio[0].focus();
        alert("Responde la pregunta "+(numPreg+1));
        return false;
      }   
    }
    return true;
  }
  //corrección
  function corregirText() {
    for(n = 0; n < 2; n ++){
    var txt = formElement.elements[n].value;  
      if (txt==respuestaText[n]) {
        nota +=1;
      }
    }
  }

  //Corrección Select normal
  function corregirSelect() {
    for(n = 2; n < 4; n++){
    var sel = formElement.elements[n].value;  
      if (sel.selectedIndex==respuestaSelect[n]) {
        nota +=1;
      }     
    }    
  }

  //Corrección Select Múltiple
  function corregirSelMultiple(){
    for(n = 4; n < 6; n++){
    var sel = formElement.elements[n];
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
    var f=formElement;
    var correcta = [];
    for (n = 6; n < 8; n++){
      var nombre;
      if (n==6){
        nombre=f.check1;
      } 
      else {
        nombre=f.check2;
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
    var f=formElement;
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
}
