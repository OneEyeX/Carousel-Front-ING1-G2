
/*******************************************************************************************/
/* *************************************** TOOLS *******************************************/
/*******************************************************************************************/

/**
 * generer un nombre aleatoire dans un intervale bien precis
 * 
 * @param {*} min borne INF de l'intervale
 * @param {*} max borne SUP de l'intervale
 * @returns le numero généré
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {*} selector nom/id/class dans le document HTML
 * @param {*} type type d'event a ajouter (click...)
 * @param {*} eventHandler la fonction qui va etre executée si l'event est declenché
 * @returns l'objet HTML apres l'affectation de l'ecouteur
 */
function installEventHandler(selector, type, eventHandler) {

    // Recuperation du premier objet DOM correspondant au selecteur.
    var domObject = document.querySelector(selector);

    // Installation d'un gestionnaire d'évènement sur cet objet DOM.
    domObject.addEventListener(type, eventHandler);
    return domObject;
}