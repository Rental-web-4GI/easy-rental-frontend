export const fr = {
  nav: { 
    install: "Installer l'app", 
    backHome: "Accueil Global", 
    logout: "Déconnexion" 
  },
  auth: {
    title: "Console Manager",
    subtitle: "Pilotez votre réseau de location et analysez vos performances mondiales.",
    email: "Email Professionnel",
    password: "Mot de passe",
    orgName: "Nom de l'organisation",
    submitLogin: "Accéder au Hub",
    submitRegister: "Créer l'organisation",
    error: "Erreur d'authentification (organisation@gmail.com / organisation)",
    verifying: "Vérification de la session...",
    noAccount: "Pas encore de réseau ? Créez votre compte manager.",
    hasAccount: "Déjà manager ? Connectez-vous ici.",
    installNotice: "Utilisez Chrome ou Edge pour installer l'application."
  },
  sidebar: { 
    systemSubtitle: "Système de Gestion",
    hub: "Hub Principal",
    network: "Opérations Réseau",
    dashboard: "Tableau de Bord", 
    agencies: "Agences", 
    roles: "Postes & Rôles",
    staff: "Gestion Staff",
    stats: "Statistiques", 
    users: "Utilisateurs",
    subscription: "Abonnement",
    settings: "Configuration",
    status: "Réseau en Direct",
    logout: "Déconnexion",
    install: "Installer l'app"
  },
  views: {
    DASHBOARD: "Tableau de Bord",
    AGENCIES: "Agences du Réseau",
    ROLES: "Postes & Permissions",
    STAFF: "Gestion du Personnel",
    SUBSCRIPTION: "Abonnement & Billing"
  },
  subscription: {
    statusTitle: "Statut de votre Licence",
    activePlanBadge: "Plan Actif",
    activePlanRibbon: "Plan Actuellement Actif",
    expiresOn: "Expire le : ",
    unlimited: "ILLIMITE",
    loadingCatalog: "Chargement du catalogue...",
    perMonth: "/mois",
    subscribeBtn: "S'abonner",
    alreadyInUse: "Utilisé",
    catalogTitle: "Catalogue des Plans",
    catalogSubtitle: "Propulsez votre réseau au niveau supérieur",
    cancelTitle: "Annulation de l'abonnement",
    cancelWarning: "En annulant, vous repasserez immédiatement au plan FREE. Certaines de vos agences ou véhicules pourraient être désactivés si vous dépassez les nouveaux quotas.",
    cancelBtn: "Annuler et passer en FREE",
    confirmCancel: "Êtes-vous sûr de vouloir annuler votre abonnement actuel et repasser au plan gratuit ?",
    cancelSuccess: "Votre abonnement a été annulé. Vous êtes repassé au plan FREE.",
    upgradeSuccess: "Félicitations ! Vous êtes maintenant sur le plan ",
    errorChange: "Erreur lors du changement de plan",
    quotas: {
      agencies: "Agences",
      vehicles: "Véhicules",
      drivers: "Chauffeurs",
      geofencing: "Géofencing",
      chat: "Chat Support"
    }
  },
  roles: {
    title: "Postes & Roles",
    subtitle: "Gestion des accès et de la hiérarchie",
    createBtn: "Créer un Poste",
    systemBadge: "Système",
    privileges: "Privilèges",
    others: "autres",
    modal: {
      titleEdit: "Édition Poste",
      titleAdd: "Nouveau Poste",
      name: "Nom du poste",
      description: "Description",
      privilegesTitle: "Privilèges d'accès",
      deselect: "Désélectionner",
      selectAll: "Tout cocher",
      submitEdit: "Confirmer les modifications",
      submitAdd: "Enregistrer le poste"
    }
  },
  staff: {
    title: "Gestion du Personnel",
    stats: {
      total: "Total Personnel",
      agencies: "Agences Couvertes",
      activeRoles: "Postes Actifs"
    },
    searchPlaceholder: "Rechercher par nom ou email...",
    allAgencies: "Toutes les agences",
    addBtn: "Recruter un membre",
    noPoste: "Sans poste",
    viewProfile: "Voir profil",
    deleteConfirm: "Supprimer ce membre du personnel ? L'accès à la plateforme lui sera retiré.",
    modal: {
      titleAdd: "Recrutement Staff",
      titleEdit: "Mise à jour",
      emailLabel: "Email de l'utilisateur (déjà inscrit)",
      agencyLabel: "Affectation Agence",
      posteLabel: "Poste & Rôle",
      statusLabel: "Statut du contrat",
      statusActive: "Actif (Accès autorisé)",
      statusSuspended: "Suspendu (Accès bloqué)",
      cancel: "Annuler",
      submit: "Confirmer l'accès",
      selectPlaceholder: "Choisir..."
    },
    profile: {
      title: "Détails Staff",
      email: "Email",
      agency: "Agence",
      id: "ID Employé",
      privileges: "Privilèges système",
      noPrivileges: "Aucun privilège spécifique",
      editContract: "Modifier le contrat"
    }
  },
  header: { 
    title: "Console Organisation",
    admin: "Admin Principal", 
    search: "Rechercher agences, IDs...",
    installBtn: "App",
    adminRole: "Admin",
    avatarAlt: "Avatar"
  },
  kpi: { 
    agencies: "Agences Actives", 
    rentals: "Total Locations", 
    revenue: "Revenu Mensuel", 
    systemAlerts: "Alertes Système", 
    verificationRequired: "Vérif. Requise",
    action: "Action Req." 
  },
  agencies: {
    title: "Gestion du Réseau",
    addBtn: "Nouvelle Agence",
    searchPlaceholder: "Rechercher une agence...",
    stats: {
      total: "Agences",
      vehicles: "Véhicules",
      active: "En Circulation"
    },
    empty: {
      title: "Aucune agence",
      subtitle: "Votre réseau est vide. Créez votre première agence pour commencer à louer.",
      action: "Lancer la création"
    },
    card: {
      email: "Email",
      phone: "Contact",
      noEmail: "Pas d'email",
      noPhone: "Pas de numéro",
      deleteConfirm: "Supprimer définitivement cette agence ?"
    },
    modal: {
      titleAdd: "Nouveau Point",
      titleEdit: "Édition Agence",
      name: "Nom de l'agence",
      namePlaceholder: "ex: Agence Akwa Central",
      city: "Ville",
      cityPlaceholder: "ex: Douala",
      phone: "Téléphone",
      phonePlaceholder: "ex: 699...",
      address: "Adresse Postale / Rue",
      addressPlaceholder: "ex: Rue 1.254, Face Boulangerie",
      email: "Email de l'agence",
      emailPlaceholder: "agence@easy-rental.com",
      deposit: "Caution (%)",
      hours24: "Ouvert 24h/24",
      cancel: "Annuler",
      submit: "Confirmer l'agence"
    },
    alerts: {
      errorSubmit: "Le serveur a refusé la création. Vérifiez que tous les champs sont remplis.",
      errorConn: "Erreur de connexion au serveur."
    }
  },
  charts: { 
    title: "Tendances Performance", 
    sub: "Volume vs Revenu (Données Réelles)", 
    period: "30 Derniers Jours" 
  },
  system: { 
    title: "Statut Système", 
    sync: "Sync. Offline", 
    load: "Charge Serveur", 
    op: "Opérationnel", 
    loadSub: "Charge Modérée", 
    log: "Logs Système" 
  },
  table: { 
    title: "Aperçu des Agences", 
    sub: "Performance des points de location",
    add: "Ajouter Agence", 
    export: "Exporter", 
    colName: "Nom Agence", 
    colLoc: "Localisation", 
    colStatus: "Statut PWA", 
    colRentals: "Locations", 
    colRev: "Revenu" 
  },
  installNotice: "Essayez de changer de navigateur pour pouvoir l'installer en tant qu'application (Chrome ou Edge recommandé)."
};