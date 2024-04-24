'use strict';   // Mode strict du JavaScript

/***********************************************************************************/
/* ********************************* DONNEES CARROUSEL *****************************/
/***********************************************************************************/

// Codes des touches du clavier.
const TOUCHE_ESPACE = 32;
const TOUCHE_GAUCHE = 37;
const TOUCHE_DROITE = 39;


// La liste des slides du carrousel.
var slides =
[
    { image: 'images/1.jpg', legend: 'Street Art'          },
    { image: 'images/2.jpg', legend: 'Fast Lane'           },
    { image: 'images/3.jpg', legend: 'Colorful Building'   },
    { image: 'images/4.jpg', legend: 'Skyscrapers'         },
    { image: 'images/5.jpg', legend: 'City by night'       },
    { image: 'images/6.jpg', legend: 'Tour Eiffel la nuit' }
];

// Objet contenant l'état du carrousel.
var state;



/***********************************************************************************/
/* ******************************** FONCTIONS CARROUSEL ****************************/
/***********************************************************************************/

function onSliderGoToNext()
{
    // Passage à la slide suivante.
    state.index++;

    // Est-ce qu'on est arrivé à la fin de la liste des slides ?
    if(state.index == slides.length)
    {
        // Oui, on revient au début (le carrousel est circulaire).
        state.index = 0;
    }
    //Mise à jour de miniature
    // updateMiniature();

    // Mise à jour de l'affichage.
    refreshSlider();
}

function updateMiniature() {
    // Get all the <img> elements inside the <span>
    var images = document.querySelectorAll('span.thumbnails img');

    // Initialize a variable to store the index
    var selectedIndex = 0;

    // Loop through each <img> element
    for (var i = 0; i < images.length; i++) {
        // Check if the <img> element contains the class 'selected'
        if (images[i].classList.contains('selected')) {
            // If the class is found, store the index and exit the loop
            selectedIndex = i;
            images[i].classList.toggle('selected');
            // createImages();
            break;
        }
    }
    images[state.index].classList.toggle('selected');
    // Log the index of the selected element
    console.log("Index of the selected element:", state.index);
    


    // Function to create and append img elements
    // function createImages() {
    //     // for (var i = state.index; i <= 5; i++) {
            
    //     // Get the span element
    //     var span = document.getElementById('span');
    //     var img = document.createElement('img');
    //         img.className = 'min';
    //         img.src = slides[state.index].image;
    //         img.alt = 'Thumbnail ' + state.index;
    //         if (state.index> 4) {
                
    //             span.appendChild(img);
    //             span.removeChild(span.children[0])
    //         }
    //         if (state.index <0) {
    //             span.insertBefore( 
    //                 img, span.firstChild); 
    //             span.removeChild(span.lastChild);
    //         }
    //     // }
    // }

    // // Call the function to create the initial set of images
    // createImages();

    // Function to update the images
   
    // updateImages();
    
}
//  function updateImages() {
//         var images = document.querySelectorAll('span.thumbnails img');
//         images.forEach(function(img, index) {
//             img.src = slides[index+1].image; 
//         });
// }

function disable_button() {
    // currentIndex = (state.index + 1) % slides.length;
    // updateImages();

    // Disable next button if max is reached
    if (state.index === slides.length - 1) {
        document.getElementById('slider-next2').disabled = true;
    } else {
        document.getElementById('slider-next2').disabled = false;
    }
    if (state.index <= 0) {
        document.getElementById("slider-previous2").disabled = true;
    } else {
        document.getElementById("slider-previous2").disabled = false;
    }
    
    
}
function onSliderGoToPrevious()
{
    // Passage à la slide précédente.
    state.index--;

    // Est-ce qu'on est revenu au début de la liste des slides ?
    if(state.index < 0)
    {
        // Oui, on revient à la fin (le carrousel est circulaire).
        state.index = slides.length - 1;
    }

    //Mise à jour de miniature
    // updateMiniature();

    // Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderGoToRandom()
{
    var index;

    do
    {
        /*
         * Récupération d'un numéro de slide aléatoire différent
         * du numéro de slide actuel.
         */
        index = getRandomInteger(0, slides.length - 1);
    }
    while(index == state.index);

    // Passage à une slide aléatoire.
    state.index = index;

    // Mise à jour de l'affichage.
    refreshSlider();
}

/*
 * Quand on créé un gestionnaire d'évènements, le navigateur appelle la
 * fonction en fournissant un argument event représentant l'évènement lui-même.
 *
 * Si le gestionnaire d'évènements n'a pas besoin de cet argument,
 * inutile de le déclarer !
 *
 * Mais ici on va en avoir besoin...
 */
function onSliderKeyUp(event)
{
    /*
     * Les gestionnaires d'évènements d'appui sur une touche (évènements
     * keydown, keyup, keypress) contiennent une propriété keyCode dans l'objet
     * event représentant le code de la touche du clavier.
     *
     * Il existe de très nombreux codes, plus ou moins standards, voir la page :
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
     */

    switch(event.keyCode)
    {
        case TOUCHE_DROITE:
        // On passe à la slide suivante.
        onSliderGoToNext();
        break;

        case TOUCHE_ESPACE:
        // On démarre ou on arrête le carrousel.
        onSliderToggle();
        break;

        case TOUCHE_GAUCHE:
        // On passe à la slide précédente.
        onSliderGoToPrevious();
        break;
    }
}

function onSliderToggle()
{
    var icon;

    // Modification de l'icône du bouton pour démarrer ou arrêter le carrousel.
    icon = document.querySelector('#slider-toggle i');

    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');

    // Est-ce que le carousel est démarré ?
    if(state.timer == null)
    {
        // Non, démarrage du carousel, toutes les deux secondes.
        state.timer = window.setInterval(onSliderGoToNext, 2000);

        /*
         * Modification du libellé du bouton en mode "OFF".
         *
         * La variable spéciale this est automatiquement initialisée par le
         * navigateur avec l'objet DOM qui a déclenché l'évènement.
         *
         * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
         * l'évènement, donc la variable spéciale this vaut la même chose
         * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
         */
        this.title = 'Arrêter le carrousel';
    }
    else
    {
        // Oui, arrêt du carousel.
        window.clearInterval(state.timer);

        // Réinitialisation de la propriété pour le prochain clic sur le bouton.
        state.timer = null;

        /*
         * Modification du libellé du bouton en mode "ON".
         *
         * La variable spéciale this est automatiquement initialisée par le
         * navigateur avec l'objet DOM qui a déclenché l'évènement.
         *
         * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
         * l'évènement, donc la variable spéciale this vaut la même chose
         * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
         */
        this.title = 'Démarrer le carrousel';
    }
}

function onToolbarToggle()
{
    var icon;

    // Modification de l'icône du lien pour afficher ou cacher la barre d'outils.
    icon = document.querySelector('#toolbar-toggle i');

    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-right');

    
    // Affiche ou cache la barre d'outils.
    // document.querySelector('.toolbar ul').classList.toggle('hide');
    
    document.querySelectorAll('.toolbar ul').forEach(function(ul){
        ul.classList.toggle('hide')
    })
    
}

function refreshSlider()
{
    var sliderImage;
    // var sliderLegend;

    // Recherche des balises de contenu du carrousel.
    sliderImage  = document.querySelector('#slider img');
    // sliderLegend = document.querySelector('#slider figcaption');

    // Changement de la source de l'image et du texte de la légende du carrousel.
    sliderImage.src          = slides[state.index].image;
    // sliderLegend.textContent = slides[state.index].legend;

    
    //Mise à jour de miniature
    updateMiniature();

    // updateImages();

    disable_button();
}



/***********************************************************************************/
/* ******************************** CODE PRINCIPAL *********************************/
/***********************************************************************************/

/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 * Le gestionnaire d'évènement est une fonction anonyme que l'on donne en deuxième
 * argument directement à document.addEventListener().
 */
document.addEventListener('DOMContentLoaded', function()
{
    // Initialisation du carrousel.
    state       = {};
    state.index = 0;                   // On commence à la première slide
    state.timer = null;                // Le carrousel est arrêté au démarrage


    // Installation des gestionnaires d'évènement.
    installEventHandler('#slider-random', 'click', onSliderGoToRandom);
    installEventHandler('#slider-previous', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-next', 'click', onSliderGoToNext);
    installEventHandler('#slider-toggle', 'click', onSliderToggle);
    installEventHandler('#toolbar-toggle', 'click', onToolbarToggle);
    
    installEventHandler('#slider-previous2', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-next2', 'click', onSliderGoToNext);
    

    /*
     * L'évènement d'appui sur une touche doit être installé sur l'ensemble de la
     * page, on ne recherche pas une balise en particulier dans l'arbre DOM.
     *
     * L'ensemble de la page c'est la balise <html> et donc la variable document.
     */
    document.addEventListener('keyup', onSliderKeyUp);
    // Equivalent à installEventHandler('html', 'keyup', onSliderKeyUp);


    // Affichage initial.
    refreshSlider();
});