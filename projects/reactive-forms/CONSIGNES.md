# CONSIGNES

## 1. Initialisation du formulaire
Crée un formulaire réactif nommé `formulaireUtilisateur`. Ce formulaire doit inclure les **15 champs suivants** :

### Champs du formulaire principal :
1. **nom** (type : texte)  
   - Validateurs : `Validators.required`, `Validators.minLength(2)`, `Validators.maxLength(50)`  
   - Message d’erreur : *"Le nom est requis, doit contenir au moins 2 caractères et au maximum 50 caractères."*

2. **prenom** (type : texte)  
   - Validateurs : `Validators.required`, `Validators.minLength(2)`, `Validators.maxLength(50)`  
   - Message d’erreur : *"Le prénom est requis, doit contenir au moins 2 caractères et au maximum 50 caractères."*

3. **email** (type : email)  
   - Validateurs : `Validators.required`, `Validators.email`  
   - Message d’erreur : *"Un email valide est requis."*

4. **age** (type : number)  
   - Validateurs : `Validators.required`, `Validators.min(18)`, `Validators.max(100)`  
   - Message d’erreur : *"L’âge est requis et doit être compris entre 18 et 100 ans."*

5. **telephone** (type : texte)  
   - Validateurs : `Validators.required`, `Validators.pattern('^[0-9]{10}$')`  
   - Message d’erreur : *"Le numéro de téléphone est requis et doit comporter exactement 10 chiffres."*

6. **motDePasse** (type : password)  
   - Validateurs : `Validators.required`, `Validators.minLength(8)`  
   - Message d’erreur : *"Un mot de passe de 8 caractères minimum est requis."*

7. **confirmationMotDePasse** (type : password)  
   - Validateurs : Comparaison avec le champ `motDePasse` via un **custom validator au niveau du FormGroup**.  
   - Message d’erreur : *"Les mots de passe doivent correspondre."*

### Champs liés à l’adresse (Sous-FormGroup) :
8. **adresse** (Sous-FormGroup contenant les champs suivants) :
   - **rue** (type : texte)  
     - Validateurs : `Validators.required`  
     - Message d’erreur : *"Le champ rue est requis."*
   - **ville** (type : texte)  
     - Validateurs : `Validators.required`  
     - Message d’erreur : *"La ville est requise."*
   - **codePostal** (type : texte)  
     - Validateurs : `Validators.required`, `Validators.pattern('^[0-9]{5}$')`  
     - Message d’erreur : *"Un code postal valide de 5 chiffres est requis."*

### Champs liés aux préférences :
9. **abonnementNewsletter** (type : checkbox)  
   - Pas de validateur requis. Ce champ sera utilisé pour **afficher conditionnellement** un autre champ.  
   - Fonctionnalité : Si coché, afficher le champ `frequenceNewsletter`.

10. **frequenceNewsletter** (type : select)  
    - Valeurs possibles : `quotidien`, `hebdomadaire`, `mensuel`  
    - Validateur : `Validators.required`  
    - Affichage conditionnel : Ce champ est visible uniquement si `abonnementNewsletter` est coché.  
    - Message d’erreur : *"La fréquence de réception est requise si vous vous abonnez à la newsletter."*

### Champs avec des données dynamiques (FormArray) :
11. **hobbies** (FormArray permettant de saisir plusieurs loisirs)  
    - Chaque élément est un champ texte avec :  
      - Validateurs : `Validators.required`, `Validators.minLength(3)`  
      - Message d’erreur : *"Chaque loisir doit comporter au moins 3 caractères."*

### Autres champs :
12. **siteWeb** (type : url)  
    - Validateurs : `Validators.pattern('https?://.+')`  
    - Message d’erreur : *"L’URL doit commencer par http:// ou https://."*

13. **dateNaissance** (type : date)  
    - Validateurs : `Validators.required`  
    - **Validateur asynchrone** : Vérifier que la date n’est pas future en effectuant une vérification simulée via un service.  
    - Message d’erreur : *"Une date de naissance valide est requise."*

14. **sexe** (type : radio avec valeurs `Homme`, `Femme`, `Autre`)  
    - Validateurs : `Validators.required`  
    - Message d’erreur : *"Le choix du sexe est requis."*

15. **commentaires** (type : textarea)  
    - Pas de validateur obligatoire, champ facultatif.

---

## 2. Gestion des erreurs
- Sous chaque champ, affiche un message d’erreur conditionné à l’état du champ : `invalid` et `touched` ou après une tentative de soumission.  
- Les champs invalides doivent être visuellement mis en évidence avec une bordure rouge et une icône d’erreur à gauche du champ (si applicable).

---

## 3. Soumission du formulaire
- **Bouton "Soumettre"** :  
  - Toujours visible et cliquable.  
  - Lors du clic :  
    - Si le formulaire est valide : afficher les données saisies dans la console.  
    - Si le formulaire est invalide :  
      - Marquer tous les champs invalides avec leur état d’erreur.  
      - Déclencher les messages d’erreur associés.

---

### Résumé technique :
- Utilisation des **validators natifs d’Angular** pour la validation de base.  
- Implémentation de **custom validators** pour la correspondance des mots de passe et la validation au niveau du FormGroup.  
- Ajout d’un **validateur asynchrone** sur la date de naissance.  
- Utilisation de **FormGroups** et de **FormArray** pour structurer le formulaire.  
- Gestion conditionnelle d’un champ avec la checkbox `abonnementNewsletter`.  
- Affichage visuel et textuel des erreurs pour chaque champ.  
- Gestion stricte des règles de soumission du formulaire.
