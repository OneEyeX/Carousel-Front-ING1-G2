
/*******************************************************************************************/
/* *************************************** TOOLS *******************************************/
/*******************************************************************************************/

/**
 * generer un nombre aleatoire dans un intervale bien precis
 * 
 * @param {*} min borne INFERIEUR de l'intervale
 * @param {*} max borne SUPERIEUR de l'intervale
 * @returns retourne le numero généré
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * installer un ecouteur d'event precis a un objet du document
 * 
 * @param {*} selector nom/id/class de l'Objet li bech thotlou ecouteur dans le document HTML
 * @param {*} type type d'event a ajouter (click...)
 * @param {*} eventHandler la fonction qui va etre executée si l'event est declenché
 * @returns retourne l'objet HTML apres l'affectation de l'ecouteur
 */
function installEventHandler(selector, type, eventHandler) {

    // Recuperation du premier objet DOM correspondant au selecteur
    var domObject = document.querySelector(selector);

    // Installation d'un gestionnaire d'event sur cet objet DOM
    domObject.addEventListener(type, eventHandler);
    return domObject;
}