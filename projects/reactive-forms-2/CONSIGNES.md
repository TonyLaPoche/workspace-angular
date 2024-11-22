# CONSIGNES.md

## **Exercice Angular : Création d'un écran de recherche d'utilisateurs**

### **Objectif :**
Créer une interface utilisateur permettant de rechercher et filtrer une liste d’utilisateurs. Les critères de recherche et d’affichage doivent être persistants grâce à une gestion des paramètres dans l’URL.

---

### **1. Écran de recherche d’utilisateurs**

#### **1.1 Champ de recherche utilisateur**
- **Nom du champ :** Recherche
- **Type de champ :** Champ de texte (input type="text").
- **Description :** Permet de rechercher un utilisateur en entrant un nom complet ou une partie du nom.
- **Longueur maximale :** 100 caractères.
- **Caractères autorisés :** Lettres (A-Z, a-z), espaces, et caractères spéciaux courants (ex : accents, apostrophes).
- **Obligatoire :** Non, ce champ est facultatif.
- **Persistant dans l’URL :** Oui, le paramètre `search` doit apparaître dans l’URL (exemple : `?search=jean`).

#### **1.2 Bouton de recherche**
- **Nom du bouton :** Rechercher
- **Action :** Met à jour les résultats en fonction des critères définis et met à jour l’URL avec les paramètres correspondants.
- **Visibilité :** Toujours visible.

#### **1.3 Filtres disponibles**

**1.3.1 Filtre par âge :**
- **Nom du champ :** Âge
- **Type de champ :** Sélecteur de plage (slider).
- **Description :** Permet de définir une plage d’âge minimum et maximum pour filtrer les résultats.
- **Valeurs minimales et maximales :** 18 à 100 ans.
- **Valeur par défaut :** Pas de restriction (18 à 100 ans).
- **Obligatoire :** Non, ce champ est facultatif.
- **Persistant dans l’URL :** Oui, les plages doivent apparaître sous les paramètres `ageMin` et `ageMax` (exemple : `?ageMin=25&ageMax=50`).

**1.3.2 Filtre par ville :**
- **Nom du champ :** Ville
- **Type de champ :** Liste déroulante (dropdown) avec sélection multiple.
- **Description :** Permet de sélectionner une ou plusieurs villes parmi une liste prédéfinie.
- **Options possibles :** Les villes disponibles sont définies dans une liste statique (exemple : Paris, Lyon, Marseille, Bordeaux, Lille).
- **Obligatoire :** Non, ce champ est facultatif.
- **Persistant dans l’URL :** Oui, les villes sélectionnées doivent apparaître sous le paramètre `cities` (exemple : `?cities=Paris,Lyon`).

---

### **2. Tableau des résultats de recherche**

Le titre du tableau sera au format : n utilisateurs.  
- Si n = 0 > Aucun utilisateur
- Si n = 1 > Un utilisateur
- Si n > 1 > n utilisateurs

#### **2.1 Contenu des colonnes du tableau**
Le tableau affichera les utilisateurs correspondant aux critères de recherche et contiendra les colonnes suivantes :

| **Nom de la colonne**   | **Données affichées**                  | **Longueur maximale** | **Caractères autorisés**      |  
|--------------------------|----------------------------------------|------------------------|--------------------------------|  
| Nom complet             | Nom et prénom concaténés              | 50 caractères         | Lettres, espaces, apostrophes |  
| Âge                     | Nombre entier                         | N/A                   | 18 à 100                     |  
| Ville                   | Nom de la ville                       | 30 caractères         | Lettres, espaces             |  
| Email                   | Adresse email valide                  | 100 caractères        | Format email standard         |  
| Date d’inscription      | Date au format `DD/MM/YYYY`           | N/A                   | N/A                          |  

#### **2.2 Fonctionnalités du tableau**
- **Tri des colonnes :**
    - Toutes les colonnes doivent être triables individuellement (par ordre croissant ou décroissant).
    - Le tri sélectionné doit être reflété dans l’URL avec les paramètres `sortColumn` et `sortOrder` (exemple : `?sortColumn=age&sortOrder=desc`).

- **Filtrage dynamique côté client :**
    - Les données affichées doivent être automatiquement mises à jour lorsque les critères de recherche ou les filtres sont modifiés.
    - Les résultats affichés doivent correspondre aux utilisateurs qui respectent **tous** les critères actifs (recherche + filtres).

#### **2.3 Pagination :**
- Maximum de 20 lignes affichées par page.
- Si plus de 20 résultats, ajouter une pagination. Le numéro de page sélectionné doit être reflété dans l’URL avec le paramètre `page` (exemple : `?page=2`).

#### **2.4 Message en cas d’absence de résultats :**
- Si aucun résultat ne correspond aux critères : afficher le message :
    - _"Aucun utilisateur ne correspond à vos critères de recherche."_

---

### **3. Gestion des paramètres via l’URL**

**3.1 Mise à jour de l’URL :**
- À chaque modification des critères de recherche, des filtres ou du tri, les paramètres correspondants doivent être ajoutés à l’URL.
- Exemple d’URL avec plusieurs critères actifs :
  ```
  /search?search=jean&ageMin=25&ageMax=40&cities=Paris,Lyon&sortColumn=age&sortOrder=asc&page=2
  ```

**3.2 Récupération des paramètres à l’initiation de la page :**
- Lors du chargement ou d’un rafraîchissement de la page, l’état des filtres et du tableau doit être restauré à partir des paramètres présents dans l’URL.

---

### **4. Données simulées**
Pour les tests, utilisez un échantillon de 30 utilisateurs fictifs avec des valeurs cohérentes. Voici un exemple :

| Nom complet       | Âge | Ville      | Email                    | Date d’inscription |  
|--------------------|-----|------------|--------------------------|--------------------|  
| Jean Dupont       | 28  | Paris      | jean.dupont@example.com  | 12/01/2022         |  
| Marie Curie       | 35  | Lyon       | marie.curie@example.com  | 03/03/2021         |  
