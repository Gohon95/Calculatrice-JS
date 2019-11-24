// Création de variables pour les attribuer dans les fonctions
let jeu = function () {
  let $bouton = document.getElementsByClassName("bouton");
  let $jouer = document.getElementById("jouer");
  let $rejouer = document.getElementById("rejouer");
  let $compteur = document.getElementById("compteur");

  let pattern = [];
  let userPattern = [];

  // Variables pour les son
  let sound0 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  let sound1 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  let sound2 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  let sound3 = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );

  // Fonction qui affiche le compteur
  function displaycompteur() {
    $compteur.innerHTML = pattern.length;
  }

  function simulateClick(element) {
    var mousedown = new Event("mousedown");
    var mouseup = new Event("mouseup");
    mouseup.shiftKey = true;
    element.dispatchEvent(mousedown);
    window.setTimeout(function () {
      element.dispatchEvent(mouseup);
    }, 500);
  }

  function displayPattern(arr, index) {
    simulateClick($bouton[arr[index]]);
    window.setTimeout(function () {
      if (pattern.length !== 0 && arr[index + 1] != undefined) {
        displayPattern(arr, index + 1);
      }
    }, 1000);
  }

  // Fonction qui génère un nombre
  function generateNum() {
    return Math.floor(Math.random() * 4);
  }

  // Fonction qui emet une alerte "réessayer" si on se trompe de bouton
  function patternCheck() {
    for (var i = 0; i < userPattern.length; i++) {
      if (pattern[i] !== userPattern[i]) {
        alert("Try again");
        userPattern = [];
        window.setTimeout(function () {
          displayPattern(pattern, 0);
        }, 1000);
      }
    }
  }

  for (var i = 0; i < $bouton.length; i++) {
    var originalClasses = $bouton[i].className;
    $bouton[i].addEventListener("mousedown", function (e) {
      e.target.className += " lighten";
      if (e.target.id === "Rouge") {
        sound0.play();
      } else if (e.target.id === "Jaune") {
        sound1.play();
      } else if (e.target.id === "Vert") {
        sound2.play();
      } else if (e.target.id === "Bleu") {
        sound3.play();
      }
    });

    $bouton[i].addEventListener("mouseup", function (e) {
      e.target.className = originalClasses;
      if (!e.shiftKey) {
        if (e.target.id === "Rouge") {
          userPattern.push(0);
        } else if (e.target.id === "Jaune") {
          userPattern.push(1);
        } else if (e.target.id === "Vert") {
          userPattern.push(2);
        } else if (e.target.id === "Bleu") {
          userPattern.push(3);
        }
        patternCheck();
      }
    });
  }

  // Fonction / Bouton qui permet de jouer au jeu
  $jouer.addEventListener("click", function () {
    if (pattern.length === 0) {
      pattern.push(generateNum());
      displaycompteur();
      simulateClick($bouton[pattern[0]]);
    }
  });

  // Fonction / bouton qui permet de rejouer
  $rejouer.addEventListener("click", function () {
    pattern = [];
    userPattern = [];
    displaycompteur();
  });
}

jeu();

// Ajoute un évenement à chaque clique
document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
      if (target.hasAttribute('data-target')) {
          var m_ID = target.getAttribute('data-target');
          document.getElementById(m_ID).classList.add('open');
          e.preventDefault();
      }
  }

// Ferme la fenêtre modale lorsque l'utilisateur clique sur le fond
  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
      var modal = document.querySelector('[class="modal open"]');
      modal.classList.remove('open');
      e.preventDefault();
  }
}, false);