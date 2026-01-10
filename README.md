#Installation de l'application sur son ordinateur:

Pour pouvoir utiliser l'application sur son ordinateur il est nécessaire d'installer plusieurs autres outils permettant de le faire fonctionner au mieux.
Nous devrons installer et configurer pour se faire:

##1/ NodeJs version 24
##2/ Npm version 11
##3/ Angular version 20
##4/ Visual Studio Code
##5/ Git
##6/ Le projet frontend lui-même

Puis terminer en section 7/ par une configuration de notre application

##1/ NodeJs version 24

 - Aller sur le site https://nodejs.org/en/download
 - Cliquer sur le bouton Windows installer
 - Installer l'application à partir du launcher téléchargé auparavant
 - Vérifier la bonne installation de celui-ci en effectuant dans un terminal la commande suivante: node --version
 - Si la réponse qui remonte ici est la version de votre nodeJs; alors c'est que l'installation c'est bien passée

 ##2/ Npm version 11

 - Npm s'installe en même temps que NodeJs, rien de particulier à manipuler ici mis à part la vérification de sa bonne installation 
 - Pour ce faire, effectuer la commande npm --version dans un terminal
 - Si la réponse qui remonte ici est la version de votre Npm (lié à celle de NodeJs); alors c'est que l'installation c'est bien passée

 ##3/ Angular 20

 - Toujours dans un terminal, effectuer la commande npm i -g @angular/cli@20
 - Dans cette commande i représente install, -g est une option permettant de globaliser l'installation sur l'ensemble de l'ordinateur
 - @angular représente le package à télécharger et @20 la version dans laquelle on souhaite la récupérer

 ##4/ Visual Studio Code

 - Aller sur le site https://code.visualstudio.com/download
 - Télécharger la version Windows 10/11
 - Installer le en utilisant le launcher téléchargé précédemment

 ##5/ Git

 - Se diriger vers le site https://git-scm.com/install/windows pour télécharger le launcher de Git
 - Se servir du launcher pour installer Git
 - Pour vérifier que l'installation c'est bien déroulé et que Git fonctionne sur votre machine effectué dans le terminal la commande git --version
 - Si la version de Git remonte en réponse à cette instruction alors l'installation est réussit

 ##6/ Le projet frontend

 - Maintenant que nous avons toutes les pièces nécessaire à son bon fonctionnement nous pouvons nous diriger sur Github pour télécharger notre paquet source
 - Se diriger vers le site https://github.com/NeoFlake/alterhub-frontend 
 - Cliquer sur le bouton vert "< code >" et copier le lien https qui se trouve dedans
 - Se positionner dans le dossier qui contiendra nos deux projets (crucial) et ouvrir Visual Studio Code à cet endroit
 - Ouvrir un terminal gitbash dans Visual Studio Code et lancer cette instruction: git clone "le lien que j'ai copié sur le side github pour cloner l'application source"
 - Après le transfert de donnée effectué, il est obligatoire de renommer ce dossier frontend (obligatoire pour le bon fonctionnement de l'application)

 ##7/ Configuration de l'application

 - Après avoir effectués toutes les actions précedente, il ne reste plus qu'à écrire une dernière instruction dans un terminal pour cette installation
 - Dans le terminal ouvert dans Visual Studio Code, effectueer la commande npm install, ce qui aura pour action de télécharger et d'installer l'ensemble des dépendances
 - nécessaire au bon fonctionnement de l'application frondend