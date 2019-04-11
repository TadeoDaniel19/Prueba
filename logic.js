var auxPreguntas = 0;
var auxCorrectas = 0;
 
var quiz = {
  //Array para las preguntas
  questions: [],

  //Añadir preguntas como objetos a la matriz
  addQuestion: function(question, correct, wrongOne, wrongTwo){
    this.questions.push({
      question: question,
      correct: correct,
      wrongOne: wrongOne,
      wrongTwo: wrongTwo
    });
    //Aumenta el número de preguntas cada vez que agregue una.
    view.displayNumberOfQuestions();
  },

  movingToNextQuestion: function(){
    //Encuentra todos los botones siguientes y agrega eventos más a ellos
    var nextButton = document.querySelectorAll(".nextButton");
    for(i = 0; i < nextButton.length; i++){
      nextButton[i].addEventListener("click", function(event){
        //encuentra el elemento que hizo click
        var elementClicked = event.target;
      // Si un botón era siguiente, elimina la clase is-active de su padre

        if(elementClicked.className === "nextButton"){
          elementClicked.parentNode.classList.remove("is-active");
     // Si no hay un próximo hermano, muestre las opciones para agregar preguntas y el div de información

          if(elementClicked.parentNode.nextElementSibling === null) {
            var showAdd = document.querySelector(".addQuestions");
            var showInfo = document.querySelector(".info");
            showAdd.style.display = "block";
            showInfo.style.display = "block";
          } else {
            // Si hay un próximo hermano, añádele la clase is-active.

            elementClicked.parentNode.nextElementSibling.classList.add("is-active");
          }
        }
      });
    };
  },
  VerRespuestas: function(){

    qLen = this.questions.length;
    for(let i in this.questions){
     
    
   var pre = "question";
   var res = "correct";
    alert("La Pregunta: "+" "+this.questions[i][pre]+"\n "+ "La respuesta es: "+this.questions[i][res]);
         
 
    }
  
      }
};

var handlers = {

// Esto se ejecuta cuando haces clic en el botón Agregar pregunta
  addQuestion: function(){
    // Obtener cada una de las entradas por ID
    var questionInput = document.getElementById("questionInput");
    var correctInput = document.getElementById("correctInput");
    var wrongOneInput = document.getElementById("wrongOneInput");
    var wrongTwoInput = document.getElementById("wrongTwoInput");

// pasa los valores de las entradas al método addQuestion en el objeto que los agregará a la matriz de preguntas
    quiz.addQuestion(questionInput.value, correctInput.value, wrongOneInput.value, wrongTwoInput.value);
    //limpia
    questionInput.value = "";
    correctInput.value = "";
    wrongOneInput.value = "";
    wrongTwoInput.value = "";
  }
}

var view = {
  //corre cuando haces click start quiz
  displayQuestions: function(){
    //oculta las opciones para add questions y la info
    var hideAdd = document.querySelector(".addQuestions");
    var hideInfo = document.querySelector(".info");
    hideAdd.style.display = "none";
    hideInfo.style.display = "none";
  
// Borrar la capa de preguntas
    var questionsWrapper = document.querySelector(".questionsWrapper");
    questionsWrapper.innerHTML = "";
  
   clock();
// para cada pregunta en la matriz crear elementos necesarios y dar clases
      quiz.questions.forEach(function(question, index){
      var questionDiv = document.createElement("div");
      questionDiv.setAttribute("class", "questionDiv");
      var nextButton = document.createElement("button");
      nextButton.setAttribute("class", "nextButton");
      var questionLi = document.createElement("li");
      var correctLi = document.createElement("li");
      correctLi.setAttribute("class", "correct");
      var wrongOneLi = document.createElement("li");
      wrongOneLi.setAttribute("class", "wrong");
      var wrongTwoLi = document.createElement("li");
      wrongTwoLi.setAttribute("class", "wrong");

      //agrega cada pregunta al div de preguntas
      questionsWrapper.appendChild(questionDiv);

      questionsWrapper.firstChild.classList.add("is-active");

   
// agrega el texto a las entradas, los valores en la matriz de preguntas
      questionLi.textContent = question.question;
      correctLi.textContent = question.correct;
      wrongOneLi.textContent = question.wrongOne;
      wrongTwoLi.textContent = question.wrongTwo;

    // Si es la última pregunta, el botón debería decir terminar si no, debería decir siguiente

      if (index === quiz.questions.length - 1){
          nextButton.setAttribute("onclick", "parar()");
        nextButton.textContent = "Finalizar";
       
    


      } else{
        nextButton.textContent = "Siguiente";
      }

      //Append elementos al div
      questionDiv.appendChild(questionLi);

3      //pone las respuestas en un orden aleatorio 
      var array = [correctLi, wrongOneLi, wrongTwoLi];
      array.sort(function(a, b){return 0.5 - Math.random()});
      array.forEach(function(item){
        questionDiv.appendChild(item);
      });

      questionDiv.appendChild(nextButton);

      this.displayAnswersCorrect();
      quiz.movingToNextQuestion();


    }, this);
  },


  displayAnswersCorrect: function(){
    var questionDiv = document.querySelectorAll(".questionDiv");
    var correctAnswers = 0;
    auxPreguntas = questionDiv.length;

    

    var answersCorrect = document.querySelector(".answersCorrect");
   // answersCorrect.textContent = "Preguntas Correctas: " + correctAnswers;
  
 // agregue un evento de clic a cada división de preguntas si el elemento al que se hizo clic tiene la clase correcta, luego agregue 1 a correctAnswers y cambie el color del elemento a verde.
    // De lo contrario, cambie el color del elemento a rojo y encuentre el elemento con la clase correcta y conviértalo en verde.
    for (var i = 0; i < questionDiv.length; i++) {
      questionDiv[i].onclick = function(event) {
        event = event || window.event;
        if(event.target.className === "correct"){
          correctAnswers++;
          auxCorrectas = correctAnswers;
               
        //answersCorrect.textContent = "Preguntas Correctas: " + correctAnswers;
          event.target.style.color = "#2ecc71";
        } else if(event.target.className === "wrong"){
          event.target.style.color = "#e74c3c";
          var itemChildren = event.target.parentNode.children;
          for(i = 0; i < itemChildren.length; i++){
            if(itemChildren[i].classList.contains("correct")){
              itemChildren[i].style.color = "#2ecc71";
            }
          }
        }
        //Remove correct and wrong classes so the same question the score cant go up and colors cant chaneg
        var itemChildren = event.target.parentNode.children;
        for(i = 0; i < itemChildren.length; i++){
          itemChildren[i].classList.remove("correct");
          itemChildren[i].classList.remove("wrong");
        }
      }
    }

  },

  //cuenta los objetos en el array para mostrar cuantas preguntasse han añadido
  displayNumberOfQuestions: function(){
    var numberLi = document.getElementById("NumberQuestionsInQuiz");
    if(quiz.questions.length === 1) {
      numberLi.textContent = "Actualmente tienes " + quiz.questions.length + " preguntas añadidas a tu quiz";
    } else {
      numberLi.textContent = "Actualmente tienes " + quiz.questions.length + " preguntas añadidas a tu quiz";
    }
  }



}
function TotalScore() {

  var AuxPre = auxPreguntas;
  var auxCorr = auxCorrectas;
  var Malas = AuxPre - auxCorr;
  document.getElementById("variablePre").value=auxPreguntas;
  document.getElementById("variableBue").value=auxCorrectas;
  document.getElementById("variableMalas").value=Malas;
  var horas=$("#Horas").text();
  var  minutos=$("#Minutos").text();
  var segundos=$("#Segundos").text(); 
  var   t = horas+minutos+segundos;
  
  document.getElementById("variableTiempo").value=t;
}



function clock(){
    
    $("#contenedor").append("<script type='text/javascript'> inicio();</script>");
    $("#contenedor").append("<div class='reloj'>Tiempo '&nbsp;</div>");
    $("#contenedor").append(" <div class='reloj' id='Horas'>00</div>");
    $("#contenedor").append(" <div class='reloj' id='Minutos'>:00</div>");
    $("#contenedor").append(" <div class='reloj' id='Segundos'>:00</div>");
    $("#contenedor").append(" <div class='reloj' id='Centesimas'>:00</div>");
    $("#contenedor").append("  <div class='reloj' >&nbsp;'</div>");
        $("#body").append(" <h1> Buena Suerte </h1>" );
}


