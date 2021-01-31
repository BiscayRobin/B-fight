# B-fight
Une application contenant des mini-jeux pour entrainer son cerveau.
Un mode multijoueur est disponible. Celui-ci fonctionne depuis l'internet grâce à des WebSocket.

## Installation et démarrage du client
L'application est prise en charge par expo, ce qui permet de faciliter grandement les tests et la gestion des dépendances.
Pour installer les dépendances, il suffit de se rendre dans le répertoire du projet sur un terminal et d'entrer la commande "npm install". Pour lancer le projet avec expo, il faut utiliser la commande "expo start". Expo proposera ensuite plusieures options (navigateur, émulateur android, scan de QR code pour lancer l'application sur un appareil présent sur le même réseau local).

## Installation et démarrage du serveur
Le serveur est écrit en NodeJs. L'installation des dépendances se fait avec la commande "npm install" dans le répertoire server.
Pour le lancer, il faut utiliser la commande "node index.js".

## Connection au serveur
Afin de se connecter au serveur pour tester les fonctionnalités en ligne, il est nécessaire de modifier la ligne "const IP = '127.0.0.1'" par l'adresse de la machine hébergeant le serveur. Il est possible qu'une redirection de port doive être effectué si les deux appareils ne sont pas présents sur le même réseau. Le port à rediriger est le port 8000. Si l'acceptation de requêtes CORS est nécessaires celles-ci peuvent être acceptées par le serveur en modifiant l'adresse des lignes suivantes dans le fichier server/index.js:
cors:{
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    credentials:false
}