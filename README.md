## Traproulette 2.0

La Traproulette est réécrite dans les languages du web.

La Traproulette utilise 2 frameworks pour fonctionner :
* du **React** pour la partie frontend, en 16+ pour l'utilisation des *React Portals*, tournant dans un serveur Express. Elle utilise Google oAuth pour récupérer et écrire sur la Google Sheets de la base de données de questions.
* du **NodeJS** en back avec une simple librairie forkée du nom de [json-server](https://github.com/lionelpnt/json-server).

Ce projet a été démarré avec : [Create React App](https://github.com/facebook/create-react-app).

## Configuration initiale

La seule configuration initiale nécessaire, est de copier le fichier de configuration d'exemple ainsi :

```
cp react/src/config.example.js react/src/config.js
```

Remplissez les champs de l'objet JSON de configuration avec vos propres paramètres.
Vous pouvez créer une application et générer un CLient-ID du côté du Google sur le lien suivant : [console.developers.google.com/apis](https://console.developers.google.com/apis/).<br>
De nombreux tutos sont dispos pour vous aiguiller là-dessus.

## Scripts disponibles pour lancer la Traproulette

Il y a deux arborescences dans le projet : 

### A la racine

A la racine le package.json gère la compilation des deux serveurs Node. Une fois les sources React compilées, on peut y venir y faire un :

    yarn pkg

pour lancer la compilation des exécutables.

A la racine on peut également y voir le dossier **api** comprenant un fichier db.json. C'est la base de données de questionsqui est lue et actualisée par la Traproulette.

### A l'intérieur du dossier React

### `yarn install`

Lance l'installation nécessaire pour faire fonctionner la Traproulette, donc récupère tout ce qui est nécessaire sur la 

### `yarn start`

Cette commence lance l'application en mode de développement. Elle démarre donc un **json-server** ainsi que le front.<br>
Allez sur [http://localhost:3000](http://localhost:3000) pour accéder la Traproulette.

Si vous faites des changements sur le code, la page rechargera automatiquement. <br>
Les erreurs lint sont également disponibles dans la console.

### `yarn test`

Lance le runner de test dans un mode interactif.<br>
Pour plus de détails, rendez vous [sur la documentation](https://facebook.github.io/create-react-app/docs/running-tests).

### `yarn build`

Créé un build statique de l'application React pour la production, dans un dossier `build`.<br>
Passer cette commande est nécessaire pour pouvoir créer une version compilée de production de la Traproulette.

### db.json

```json
{
  "posts": [
    {
      "id": 1,
      "title": "this is the first element on the collection",
      "authorId": 1
    },
    {
      "id": 2,
      "title": "And now time for a second one...",
      "authorId": 2
    },
    {
      "id": 3,
      "title": "... and the last one.",
      "authorId": 1
    }
  ],
  "authors": [
    {
      "id": 1,
      "name": "Santiago Camelo",
      "email": "trikanna@gmail.com"
    },
    {
      "id": 2,
      "name": "Pepe Trueno",
      "email": "pepetrueno@gmail.com"
    }
  ]
}
```

### api call

```http://localhost:4000/api/authors?_embed=post```