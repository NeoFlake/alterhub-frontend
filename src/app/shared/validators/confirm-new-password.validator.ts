import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmNewPasswordValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const newPassword = formGroup.get("newPassword")?.value;
    const confirmNewPassword = formGroup.get("confirmNewPassword")?.value;

    // Le nouveau mot de passe étant facultatif, ne pas retourner d'erreur dans ce cas
    if(!newPassword){
        return null;
    }

    // Si newPassword est saisit mais que sa confirmation non, alors on l'indique
    if(!confirmNewPassword){
        return {confirmRequired: true};
    }

    // Si la correspondance entre les deux n'est pas affirmé, alors on bloque également
    return newPassword !== confirmNewPassword
      ? { passwordMismatch: true }
      : null;
  };
}