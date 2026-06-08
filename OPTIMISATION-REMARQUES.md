# Easy Rental — Remarques d'optimisation UX / produit

Document vivant : chaque remarque terrain est ajoutée ici, puis traitée par priorité.  
**Dernière mise à jour :** 2026-06-03

---

## Comment utiliser ce fichier

1. Décrire le problème (MFE, page, comportement attendu vs observé).
2. Ajouter une entrée dans la section **Backlog** avec un identifiant `UX-XXX`.
3. Cocher / mettre à jour le statut : `À faire` → `En cours` → `Corrigé` → `Validé`.
4. L'agent Cursor doit consulter ce fichier avant toute session d'optimisation frontend (voir règle `.cursor/rules/easy-rental-optimisation-ux.mdc`).

### Priorités

| Priorité | Signification |
|----------|----------------|
| **P0** | Bloquant — fonctionnalité inutilisable |
| **P1** | Important — UX dégradée ou données incorrectes |
| **P2** | Confort — polish, cohérence visuelle |
| **P3** | Futur — hors scope immédiat (ex. paiement complet) |

### Statuts

`À faire` · `En cours` · `Corrigé` · `Validé` · `Reporté`

---

## Synthèse par MFE

| MFE | Port | Remarques ouvertes |
|-----|------|-------------------|
| **mfe-client** | 3001 | 4 |
| **mfe-agency** | 3002 | 2 |
| **mfe-organisation** | 3003 | 2 |
| **Transversal** | — | 2 |

---

## Backlog

### mfe-client (`/client`)

#### UX-001 — Modification de profil ne fonctionne pas
- **Priorité :** P0
- **Statut :** À faire
- **Page :** `ProfileView` (`apps/mfe-client/src/views/ProfileView.tsx`)
- **Remarque :** La sauvegarde du profil ne donne pas de retour ; le formulaire semble ne pas persister les changements.
- **Piste technique :** `updateProfile` n'inspecte pas `res.ok` ; pas de feedback utilisateur ; vérifier endpoint `PUT /api/users/profile` et proxy `/client/api-rental`.

#### UX-002 — Photo de profil non modifiable (client)
- **Priorité :** P0
- **Statut :** À faire
- **Page :** `ProfileView`
- **Remarque :** Impossible de changer la photo de profil ; affichage initiales uniquement (pas d'upload).
- **Piste technique :** Brancher upload média (`MediaUseCase` / API existante) + affichage `avatarUrl` sur `UserEntity`.

#### UX-003 — Validation téléphone trop permissive
- **Priorité :** P1
- **Statut :** À faire
- **Page :** Profil / formulaires avec numéro (client)
- **Remarque :** Le champ numéro accepte trop de caractères ; un numéro de téléphone devrait imposer un format fixe (ex. **9 chiffres** Cameroun `6XXXXXXXX` ou **10** avec indicatif).
- **Piste technique :** Validation Zod côté frontend + `@Pattern` / validation backend ; masque saisie `maxLength`, `inputMode="numeric"`.

#### UX-004 — Revue globale de certaines pages client
- **Priorité :** P1
- **Statut :** À faire
- **Remarque :** Plusieurs pages mfe-client nécessitent une repasse UX/UI (layout, états vides, erreurs API, cohérence).
- **Pages à inventorier :** catalogue, détails véhicule, réservations, notifications, profil.

---

### Transversal (client + organisation + agence)

#### UX-005 — Icône afficher / masquer mot de passe
- **Priorité :** P1
- **Statut :** À faire
- **Scope :** Tous les champs `type="password"` — Auth, profil, changement MDP.
- **Remarque :** Ajouter un bouton œil (show/hide) sur les mots de passe partout : **mfe-client**, **mfe-organisation**, **mfe-agency**.
- **Piste technique :** Composant partagé `PasswordInput` dans `@pwa-easy-rental/shared-ui` ; remplacer les `<input type="password">` existants.

#### UX-006 — API de paiement non intégrée
- **Priorité :** P3
- **Statut :** Reporté
- **Remarque :** Le flux paiement (acompte 60 %, solde, etc.) n'est pas branché sur un prestataire réel (Mobile Money / carte).
- **Piste technique :** Backend `RentalPaymentUseCase` + webhook ; frontend boutons paiement + retour statut ; hors scope polish immédiat.

---

### mfe-agency (`/agency`)

#### UX-007 — Profil + photo de profil non fonctionnels
- **Priorité :** P0
- **Statut :** À faire
- **Remarque :** Modification du profil et de la photo ne fonctionnent pas (même famille de bugs que client).
- **Piste technique :** Auditer vue profil agence, appels API, upload avatar staff.

---

### mfe-organisation (`/organisation`)

#### UX-008 — Profil + photo de profil non fonctionnels
- **Priorité :** P0
- **Statut :** À faire
- **Remarque :** Idem organisation — profil et photo non modifiables.
- **Piste technique :** `OrganizationUseCase.updateOrganizationWithMedia`, formulaire org, proxy `/organisation/api-rental`.

---

### mfe-organisation / flotte

#### UX-009 — Photo véhicule disparaît après ajout
- **Priorité :** P0
- **Statut :** À faire
- **Page :** Ajout / édition véhicule (organisation)
- **Remarque :** Après upload de la photo d'un véhicule, l'image n'apparaît plus (liste ou fiche).
- **Piste technique :** Vérifier persistance URL image (`MediaUseCase`, `VehicleEntity.images`), refresh liste après save, URL absolue vs chemin relatif `/uploads/...`, proxy images Next.js.

---

## Ordre de traitement suggéré (phase 1 — utilisabilité)

1. UX-001, UX-007, UX-008 — profils qui ne sauvegardent pas
2. UX-002 — photo profil client (puis agency/org)
3. UX-009 — photo véhicule
4. UX-003 — validation téléphone
5. UX-005 — toggle mot de passe (quick win transversal)
6. UX-004 — revue pages client
7. UX-006 — paiement (phase produit séparée)

---

## Journal des ajouts

| Date | Auteur | Action |
|------|--------|--------|
| 2026-06-03 | Denny | Création du document + remarques initiales (profil, photo, téléphone, MDP, paiement, véhicule) |
