/***********************************************************************************/
/* *********************************** Variables ***********************************/
/***********************************************************************************/

// Codes des touches du clavier.
const TOUCHE_GAUCHE = 37;
const TOUCHE_DROITE = 39;
const TOUCHE_ESPACE = 32;
const TOUCHE_S = 83; //pour activer /desactiver auto save

// Objet contenant l'état du carrousel.
var state;
// variable de test pour le sauvegarde local
var save_enabled;

// La liste des slides du carrousel.
var slides =
    [
        { image: 'images/1.jpg', Id: '1' },
        { image: 'images/2.jpg', Id: '2' },
        { image: 'images/3.jpg', Id: '3' },
        { image: 'images/4.jpg', Id: '4' },
        { image: 'images/5.jpg', Id: '5' },
        { image: 'images/6.jpg', Id: '6' },
        { image: 'images/7.jpg', Id: '7' },
        { image: 'images/8.jpg', Id: '8' },
        { image: 'images/9.jpg', Id: '9' },
        { image: 'images/10.jpg', Id: '10' }
    ];



/***********************************************************************************/
/* ************************************ FUNCTIONS **********************************/
/***********************************************************************************/


/**
 * aller au Slide/image suivante
 */
function onSliderGoToNext() {
    // Passage à la slide suivante.
    state.index++;

    // Tester si on est arrivé à la fin de la liste des slides ?
    if (state.index == slides.length) {
        // Oui, on revient au début (le carrousel est circulaire).
        state.index = 0;
    }

    // Mise à jour de l'affichage.
    refreshSlider();
}


/**
 * aller au Slide/image precedente
 */
function onSliderGoToPrevious() {
    // Passage à la slide précédente.
    state.index--;

    // Tester si on est revenu au début de la liste des slides ?
    if (state.index < 0) {
        // Oui, on revient à la fin (le carrousel est circulaire).
        state.index = slides.length - 1;
    }

    // Mise à jour de l'affichage.
    refreshSlider();
}


/**
 * Gerer le choix aleatoire du l'image a affichée dans le carrousel
 */
function onSliderGoToRandom() {
    var index;

    do {
        // Récupération d'un numéro de slide aléatoire différent
        // du numéro de slide actuel.
        index = getRandomInteger(0, slides.length - 1);
    }
    while (index == state.index);

    // Passage à une slide aléatoire.
    state.index = index;

    // Mise à jour de l'affichage.
    refreshSlider();
}


/**
 * Gerer les events/clicks du clavier et agir en fonction du click
 * 
 * @param {*} event evenemnt du clavier (pour recuperer le bouton clicked)
 */
function onSliderKeyUp(event) {
    switch (event.keyCode) {
        case TOUCHE_DROITE:
            // Slide suivante.
            onSliderGoToNext();
            break;

        case TOUCHE_GAUCHE:
            // Slide précédente.
            onSliderGoToPrevious();
            break;

        case TOUCHE_ESPACE:
            // Démarre (ou Arrête) la lecture automatique le carrousel.
            onSliderToggle();
            break;

        case TOUCHE_S:
            // Activer/ desactiver auto save.
            onSliderSaveToggle();
            break;

    }
}


/**
 * Gerer les infos concernant la lecture automatique du carrousel
 */
function onSliderToggle() {

    // Modification de l'icône du bouton pour démarrer ou arrêter le carrousel.
    var icon = document.querySelector('#slider-toggle i');
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');

    // tester si le carousel est démarré
    if (state.timer == null) {
        // Non, démarrage du carousel, toutes les deux secondes.
        state.timer = setInterval(onSliderGoToNext, 2000);
        // bouton title
        this.title = 'Arrêter le carrousel';
    }
    else {
        // Oui, arrêt du carousel.
        clearInterval(state.timer);
        state.timer = null;
        // bouton title
        this.title = 'Démarrer le carrousel';
    }
}

/**
 * Gerer le bouton Toolbar(Barre d'outils)
 */
function onToolbarToggle() {

    // Modification de l'icône du lien pour afficher ou cacher la barre d'outils.
    var icon = document.querySelector('#toolbar-toggle i');
    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-right');


    // Affiche ou cache la barre d'outils et la zone des miniatures.
    document.querySelectorAll('.toolbar ul').forEach(function (ul) {
        ul.classList.toggle('hide')
    })

}


/**
 * Gerer l'affichage de l'image au Slider:
 * refresh, animate w save fel local Storage
 */
function refreshSlider() {

    // Recherche des balises de contenu du carrousel.
    var sliderImage = document.querySelector('#slider img');

    // Ajoutez la classe "animate" pour déclencher l'animation
    sliderImage.classList.add('animate');

    setTimeout(() => {
        sliderImage.classList.remove('animate');
    }, 2000);


    // Changement de la source de l'image et du texte de la légende du carrousel.
    sliderImage.src = slides[state.index].image;

    if (save_enabled) {
        localStorage.setItem('lastImageId', state.index);
    }

    //Mise à jour de miniature
    afficheNpictures();
}


/**
 * creer les n miniatures dans le doc 
 * en commancant de compter de l'index courant (State.index) 
 * 
 * jusqu'a (State.index + n)
 * 
 * @param {*} n nombre de miniatures a afficher (par defaut n=5) 
 */
function afficheNpictures(n = 5) {
    n = n * 1;
    var parentElement = document.getElementById("span");
    // Remove all child nodes from parentElement
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    var txt = "";

    for (let index = state.index; index < state.index + n; index++) {
        // Ensure the index is within the bounds of the slides array
        var slideIndex = index % slides.length;

        txt += `<img id="${slideIndex}" class="min ${index === state.index ? 'selected' : ''}" 
                src="${slides[slideIndex].image}" alt="Thumbnail  ${slides[slideIndex].Id}" 
                onclick="getSelectedMininiature(${slideIndex});">`;
    }

    parentElement.innerHTML = txt;
}


/**
 * Affiche la miniature danjs le Slide et refresh 
 * 
 * @param {*} selectedMiniatureIndex indice de miniature a affiché dans le Slide
 */
function getSelectedMininiature(selectedMiniatureIndex) {
    // Passage à une slide aléatoire.
    state.index = selectedMiniatureIndex;

    // Mise à jour de l'affichage.
    refreshSlider();
}


/**
 * Activer/Desactiver le sauvegarde locale de ID de la derniere image selectionnée dans local Storage
 */
function onSliderSaveToggle() {

    var autoSaveBtn = document.getElementById('slider-reset');
    var icon = document.getElementById('icona');
    icon.classList.toggle('fa-archive');
    icon.classList.toggle('fa-undo');

    if (localStorage.getItem('save')) {
        localStorage.clear();
        // state.index =0;
        autoSaveBtn.title = "Sauvegarder la dernière image en Local Storage";

    } else {
        localStorage.setItem('save', true);
        localStorage.setItem('lastImageId', state.index);
        save_enabled = true;
        autoSaveBtn.title = "Annuler Sauvegarder la dernière image";

    }
}


/**
 * gerer les informations du bouton d autosave (titre et icon)
 */
function updateAutoSaveBTN() {
    // get the button object mel HTML
    var autoSaveBtn = document.getElementById('slider-reset');
    if (autoSaveBtn) {
        // Update the button's info based on the 'save' key in local storage
        if (!localStorage.getItem('save')) {
            autoSaveBtn.title = "Sauvegarder la dernière image en Local Storage";
            autoSaveBtn.innerHTML = '<i id="icona" class="fa fa-archive"></i>';
        } else {
            autoSaveBtn.title = "Annuler Sauvegarder la dernière image";
            autoSaveBtn.innerHTML = '<i id="icona"  class="fa fa-undo"></i>';
        }
    }
}



/***********************************************************************************/
/* *********************************** MAIN PROG ***********************************/
/***********************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du carrousel.
    state = {};
    state.timer = null;                // Le carrousel est arrêté au démarrage

    // recupere la valeur pour tester si le save local est activé
    save_enabled = localStorage.getItem('save') || false;
    if (save_enabled) {
        // Si activé recupere l'indice du local Storage
        state.index = localStorage.getItem('lastImageId') * 1 || 0;
    }
    else {
        // Sinon (pas activé), initialise l'index avec 0 et netoyyer le localStroage
        state.index = 0;
        localStorage.clear();
    }

    // Installation des gestionnaires d'évènement:
    // sur le doc : pour gerer les touches du clavier 
    document.addEventListener('keyup', onSliderKeyUp); // Equivalent a installEventHandler('html', 'keyup', onSliderKeyUp);

    // Toolbars
    installEventHandler('#toolbar-toggle', 'click', onToolbarToggle);

    // menu 
    installEventHandler('#slider-random', 'click', onSliderGoToRandom);
    installEventHandler('#slider-previous', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-next', 'click', onSliderGoToNext);
    installEventHandler('#slider-toggle', 'click', onSliderToggle);
    installEventHandler('#slider-reset', 'click', onSliderSaveToggle);

    // miniatures
    installEventHandler('#slider-previous2', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-next2', 'click', onSliderGoToNext);

    // button click sur image pour aller au slide suivant(revenir au slide precedent)
    installEventHandler('#displayed', 'mouseup', function (event) {
        // recupere les informations sur la taille (width, height) 
        // et la position (x,y) du image relative au viewport.
        const click_space = this.getBoundingClientRect();
        // calcul du moitié de l'image
        const middle = click_space.left + (click_space.width / 2);

        if (event.clientX < middle) {
            onSliderGoToPrevious();
        } else {
            onSliderGoToNext();
        }
    });

    // update AutoSave Btn infos (icon and title)
    updateAutoSaveBTN();

    // Affichage initial.
    refreshSlider();

});
