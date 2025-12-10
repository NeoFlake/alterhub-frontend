export const TITLE_PAGE = {
    LOGIN: "Connexion",
    CREATE_ACCOUNT: "Créer un nouveau compte"
};

export const AUTHENTIFICATION_LIBELLE = {
    INPUT: {
        FIRSTNAME: "Prénom",
        LASTNAME: "Nom",
        PLAYERNAME: "Nom de Joueur",
        EMAIL: "Email",
        PASSWORD: "Mot de passe",
        NEW_PASSWORD: "Nouveau mot de passe (facultatif)",
        CONFIRM_PASSWORD: "Confirmer votre mot de passe",
        CONFIRM_NEW_PASSWORD: "Confirmer votre nouveau mot de passe",
        LOGIN_BUTTON: "Connexion",
        CREATE_ACCOUNT_BUTTON: "Créer compte",
        UPDATE_ACCOUNT: "Modifier informations"
    },
    LOGIN: "Cliquez ici pour vous inscrire",
    CREATE_ACCOUNT: "Cliquez ici pour vous connecter",
    PASSWORD_HELPER: "Minimum douze caractères, une majuscule, un chiffre, un caractère spécial",
    CONFIRM_PASSWORD_HELPER: "Doit correspondre parfaitement au mot de passe sélectionné",
    PASSWORD_MISSMATCH: "Les mots de passe doivent correspondre",
    EYE_OPEN_PATH: "images/eye.png",
    EYE_CLOSED_PATH: "images/eye-closed.png",
    EYE_ALT: "image d'oeil"
};

export const AUTHENTIFICATION_STATUT = {
    ERROR: "error",
    SUCCESS: "success"
};

export const FEEDBACK_PANEL_MESSAGES = {
    CREATE_ACCOUNT_SUCCESS: "Votre compte a été bien créé, vous allez être redirigé vers la page de connexion dans quelques secondes",
    LOGIN_SUCCESS: "Connexion réussit, redirection vers l'accueil en cours...",
    UPDATE_SUCCESS: "Votre profil a bien été mis à jour, rechargement en cours...",
    USER_REQUEST_ERROR: "Une erreur a été détecté dans votre formulaire; veuillez recommencer",
    DATA_ERROR: "Votre nom de joueur ou e-mail est incorrect, veuillez en changer",
    BACK_ERROR: "Le serveur a rencontré un problème, veuillez rééssayer ",
    EXCEPTION_ERROR: "Un problème imprévu c'est produit lors de la procédure, veuillez recommencer"
};

export const KEY_ACCESS = 'app_access_token';

export const VALIDATOR_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const VALIDATOR_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;