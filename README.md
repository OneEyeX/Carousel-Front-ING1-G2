# Carousel d'Images

Ce projet consiste en un carousel d'images interactif développé en HTML, CSS et JavaScript. Le carousel offre plusieurs fonctionnalités, y compris la sauvegarde de l'indice de la dernière image consultée dans le local storage, la navigation en cliquant sur la partie droite ou gauche de l'image, ainsi que les fonctionnalités standard d'un carousel telles que la navigation par les boutons suivant et précédent, la lecture automatique des images et le choix aléatoire d'une image.

## Fonctionnalités

- Navigation par les boutons suivant et précédent.
- Navigation par la touche espace et les fleches droite et gauche du clavier.
- Lecture automatique des images.
- Choix aléatoire d'une image.

### Les améliorations ajoutées

- Navigation vers l'image suivante en cliquant sur la partie droite de l'image.
- Navigation vers l'image précédente en cliquant sur la moitié gauche de l'image.
- Sauvegarde de l'indice de la dernière image consultée dans le local storage.

## Utilisation

1. Cloner le dépôt : `git clone https://github.com/OneEyeX/Carousel-Front-ING1-G2.git`
2. Ouvrir `index.html` dans un navigateur web.

## Tache demandée lors de la validation

 La fonction <b>getRandomInteger()</b> doit générer un nombre N > index courant, si l'index courant inférieur à la taille de tableau d'images Sinon elle commence de 0 à la taille du tableau <b>slides.length</b>

 Code réalisé: 

```js
/**
 * Gerer le choix aleatoire du l'image a affichée dans le carrousel
 */
function onSliderGoToRandom() {
    var index;

    do {

        // TASK a faire demandée dans la Validation 
        // (la fonction getRandomInteger() doit genérer un nombre > index courant 
        // si l'index courant inferieur a la taille de tableau d'images 
        // Sinon elle commence de 0 a la taille du tableau)
        // Code realisé: (supprimer les comments suivantes pour essayer)

        if (state.index === slides.length - 1) {
            index = getRandomInteger(0, slides.length - 1);
        }
        else {
            index = getRandomInteger(state.index + 1, slides.length - 1)
        }

        // Verion ORIGINALE
        // Récupération d'un numéro de slide aléatoire différent
        // du numéro de slide actuel.
        // index = getRandomInteger(0, slides.length - 1);
    }
    while (index == state.index);

    // Passage à une slide aléatoire.
    state.index = index;

    // Mise à jour de l'affichage.
    refreshSlider();
}
```

## Auteur

Chedly CHAHED

## Lien Version LIVE (Demo)

[https://oneeyex.github.io/Carousel-Front-ING1-G2/](https://oneeyex.github.io/Carousel-Front-ING1-G2/)
