import { createI18n } from "vue-i18n";

const messages = {
  en: {
    dashboard: "Dashboard",
    layoutBuilder: "Layout builder",
    craft: "Crafted",
    pages: "Pages",
    profile: "Profile",
    profileOverview: "Overview",
    projects: "Projects",
    campaigns: "Campaigns",
    documents: "Documents",
    connections: "Connections",
    wizards: "Wizards",
    horizontal: "Horizontal",
    vertical: "Vertical",
    account: "Account",
    accountOverview: "Overview",
    settings: "Settings",
    authentication: "Authentication",
    basicFlow: "Basic Flow",
    signIn: "Sign-in",
    signUp: "Sign-up",
    passwordReset: "Password Reset",
    error404: "Error 404",
    error500: "Error 500",
    apps: "Apps",
    chat: "Chat",
    privateChat: "Private Chat",
    groupChat: "Group Chat",
    drawerChat: "Drawer Chat",
    widgets: "Widgets",
    widgetsLists: "Lists",
    widgetsStatistics: "Statistics",
    widgetsCharts: "Charts",
    widgetsMixed: "Mixed",
    widgetsTables: "Tables",
    widgetsFeeds: "Feeds",
    changelog: "Changelog",
    docsAndComponents: "Docs & Components",
    megaMenu: "Mega Menu",
    exampleLink: "Example link",
    modals: "Modals",
    general: "General",
    inviteFriends: "Invite Friends",
    viewUsers: "View Users",
    upgradePlan: "Upgrade Plan",
    shareAndEarn: "Share & Earn",
    forms: "Forms",
    newTarget: "New Target",
    newCard: "New Card",
    newAddress: "New Address",
    createAPIKey: "Create API Key",
    twoFactorAuth: "Two Factor Auth",
    createApp: "Create App",
    createAccount: "Create Account",
    documentation: "Documentation",
    components: "Components",
    resources: "Resources",
    activity: "Activity",
    customers: "Customers",
    gettingStarted: "Getting Started",
    customersListing: "Customers Listing",
    customerDetails: "Customers Details",
    calendarApp: "Calendar",
    continue: "Continue",
    forgotPassword: "Forgot password?",
    email: "Email",
    password: "Password",
    pleaseWait: "Please wait...",
    changePassword: "Change password",
    signOut: "Sign out",
    operationProgramAdmin: "OP Administrator",
    usersAdmin: "Users Administrator",
    organizationsAdmin: "Organizations Administrator",
    changeOPRequests: "Change Operation Program Requests",
    changesNumber: "Processes number",
    creationDate: "Creation date",
    operationProgram: "Operation Program",
    title: "Title",
    status: "Status",
    creator: "Creator",
    counterpart: "Counterpart",
    filterByOp: "Filter by OP",
    reason: "Reason",
    addedAt: "Added",
    atTime: "at",
    by: "by",
    requestChangeStatus: "Request change status to",
    to: "to",
    changeOperationProgramTo: "Change Operation Program to",
    writeReply: "Write a reply...",
    send: "Send",
    attachFiles: "Attach files",
    attachFilesHelp: "Files with a size less than 10 MB.",
    message: "Message",
    tryAgain: "Try again",
    changeStatus: "Change status",
    messageSuccess: "Message posted successfully!",
    changeStatusSuccess: "Status changed successfully!",
    changeOP: "Change OP",
    mustSelectState: "Must select a state",
    mustSelectOP: "Must select a OP",
    changeOPSuccess: "Operation Program changed successfully!",
    update: "Update",
    notUpdate: "Don't update",
    wantToUpdateDeadlines: "Do you want to update change op request deadlines?",
    deadlinesUpdated: "Deadlines updated",
    deadlinesNotUpdated: "Deadlines not updated",
    contractType: "Contract type",
    endOf: "End of",
    finishedOn: "Finished on",
    cancel: "Cancel",
    changeStatusInfo: "Change status:",
    changeOPInfo: "Change OP:",
    changeOPRequestInfo: "Change OP at",
    deallocateOP: "Deallocate OP",
    withoutAssign: "Without assign",
    finishOn: "Finish on",
    createChangeOPRequest: "Create change op request",
    initialInformation: "Initial information",
    requestDetailInfo: "Write the request details",
    counterPartInfo: "Select the organization",
    operationProgramInfo: "Select the OperationProgram",
    confirmation: "Confirmation",
    confirmationInfo: "Confirm the data",
    changeOPRequestTitleLabel: "Request title",
    changeOPProcessTitleLabel: "Process title",
    titleRequired: "Title is required",
    counterpartRequired: "Counterpart is required",
    operationProgramRequired: "Operation program is required",
    reasonRequired: "Reason is required",
    changeOPRequestRequired: "It should have one or more change op requests",
    writeMessage: "Write a message...",
    withoutOP: "Without OP",
    selectOP: "Choose OP",
    confirmData: "Confirmar datos",
    back: "Back",
    create: "Create",
    createChangeOPRequestSuccess: "¡Solicitud creada exitosamente!",
    confirm: "Confirm",
    operationPrograms: "Operation Programs",
    operationProgramsNumber: "Programs number",
    operationProgramType: "Type",
    createOperationProgram: "Create Operation Program",
    operationProgramDate: "Operation Program Date",
    date: "Date",
    dateRequired: "Date required",
    createOperationProgramSuccess: "Operation Program successfully created!",
    updateOpSuccess: "Operation Program successfully updated!",
    editOP: "Edit Operation Program",
    changeOpDate: "Edit Date",
    changeOpType: "Edit Type",
    start_at: "Date",
    noDataEdited: "No data edited",
    secureToDeleteOp: "Are you sure to delete the OP?",
    cannotRevertOperation: "This operation cannot be reverted",
    delete: "Delete",
    deleteOpError: "Delete Operation Program Error",
    detail: "Detail",
    deleted: "Deleted",
    deleteOperationProgramSuccess: "Operation Program successfully deleted!",
    information: "Information",
    value: "Value",
    previousData: "Previous data",
    newData: "New data",
    dataChange: "Data change",
    opLog: "Operation Program Log",
    op_type: "Operation Program Type",
    op: "OP",
    files: "Files",
    selectChangeOPRequest: "Select Change OP Request",
    selectedChangeOPRequests: "Selected Change OP Requests",
    save: "Save",
    assignChangeOPRequests: "Assign change op requests",
    filter: "Filter",
    relatedRequests: "Related requests",
    relatedChangeOPRequests: "Related requests",
    requests: "Requests",
    changeRelatedRequestSuccess: "Change related requests successfully",
    changeRelatedRequestError: "Error changing related requests",
    changeOPProcesses: "Change OP Processes",
    changeRequestOPInfo: "OP change on ",
    changeStatusRequestInfo: "Change status on ",
    changeOPRequest: "Change OP Request",
    genericError: "Request error",
    changeReasonInfo: "Change Reason:",
    changeReasonRequestInfo: "Change Reason on",
    createChangeOPProcess: "Create change op process",
    addRequest: "Add request",
    changeOPRequestsInfo: "Add the requests",
    add: "Add",
    change_op_requests: "Change OP Requests",
    operation_program: "Operation program",
    relatedRoutes: "Related routes",
    confirmMessageInsert: "Are you sure? this action can not be undone.",
    actions: "Actions",
    implementationDate: "Implementation date",
    related_routes: "Related routes",
    selectPlaceholder: "Select",
    routeDefinitions: "Route Definitions",
    uploadedRouteFileSuccess: "File updated successfully. {created} records created and {updated} records updated.",
    creatorOrganization: "Creator organization",
  },
  es: {
    dashboard: "Tablero",
    layoutBuilder: "Constructor de maquetación",
    craft: "Elaborado",
    pages: "Paginas",
    profile: "Perfil",
    profileOverview: "Descripción general",
    projects: "Proyectos",
    campaigns: "Campañas",
    documents: "Documentos",
    connections: "Conexiones",
    wizards: "Magos",
    horizontal: "Horizontal",
    vertical: "Vertical",
    account: "Cuenta",
    accountOverview: "Descripción general",
    settings: "Ajustes",
    authentication: "Autenticación",
    basicFlow: "Flujo básico",
    signIn: "Registrarse",
    signUp: "Inscribirse",
    passwordReset: "Restablecimiento de contraseña",
    error404: "Error 404",
    error500: "Error 500",
    apps: "Aplicaciones",
    chat: "Chat",
    privateChat: "Chat privado",
    groupChat: "Grupo de chat",
    drawerChat: "Chat del cajón",
    widgets: "Widgets",
    widgetsLists: "Liza",
    widgetsStatistics: "Estadísticas",
    widgetsCharts: "Gráficos",
    widgetsMixed: "Mezclada",
    widgetsTables: "Mesas",
    widgetsFeeds: "Alimenta",
    changelog: "Registro de cambios",
    docsAndComponents: "Documentos & Componentes",
    megaMenu: "Mega menú",
    exampleLink: "Enlace de ejemplo",
    modals: "Modales",
    general: "General",
    inviteFriends: "Invitar A Amigos",
    viewUsers: "Ver Usuarios",
    upgradePlan: "Plan De Actualización",
    shareAndEarn: "Compartir Y Ganar",
    forms: "Formas",
    newTarget: "Nuevo Objetivo",
    newCard: "Nueva Tarjeta",
    newAddress: "Nueva Direccion",
    createAPIKey: "Crea Clave De Api",
    twoFactorAuth: "Dos Factores",
    createApp: "Crear Aplicacion",
    createAccount: "Crear Una Cuenta",
    activity: "Actividad",
    documentation: "Documentación",
    components: "Componentes",
    resources: "Recursos",
    customers: "Clientes",
    gettingStarted: "Empezando",
    customersListing: "Listado De Clientes",
    customerDetails: "Detalles De Los Clientes",
    calendarApp: "Calendario",
    continue: "Continuar",
    forgotPassword: "¿Olvidaste la contraseña",
    email: "Correo electrónico",
    password: "Contraseña",
    pleaseWait: "Por favor espere...",
    changePassword: "Cambiar contraseña",
    signOut: "Cerrar sesión",
    operationProgramAdmin: "Administrador de PO",
    usersAdmin: "Administrador de usuarios",
    organizationsAdmin: "Administrador de organizaciones",
    changeOPRequests: "Solicitudes de modificación PO",
    changesNumber: "Cantidad de procesos",
    creationDate: "Fecha de creación",
    operationProgram: "Programa de Operación",
    title: "Título",
    status: "Estado",
    creator: "Creador",
    counterpart: "Contraparte",
    filterByOp: "Filtrar por PO",
    reason: "Motivo",
    addedAt: "Añadido el",
    atTime: "a las",
    by: "por",
    requestChangeStatus: "Solicitud cambia a estado",
    to: "a",
    changeOperationProgramTo: "Se cambia PO a ",
    writeReply: "Escriba una respuesta...",
    send: "Enviar",
    attachFiles: "Adjuntar archivos",
    attachFilesHelp: "Los archivos deben tener un tamaño inferior a 10MB.",
    message: "Mensaje",
    tryAgain: "¡Intente nuevamente!",
    changeStatus: "Cambiar estado",
    messageSuccess: "¡Mensaje publicado exitosamente!",
    changeStatusSuccess: "¡Estado cambiado exitosamente!",
    changeOP: "Cambiar PO",
    mustSelectState: "Debe seleccionar un estado",
    mustSelectOP: "Debe seleccionar un Programa de Operación",
    changeOPSuccess: "¡Programa de Operación cambiado exitosamente!",
    update: "Actualizar",
    notUpdate: "No actualizar",
    wantToUpdateDeadlines: "¿Desea actualizar los plazos de las etapas de la solicitud?",
    deadlinesUpdated: "Plazos actualizados",
    deadlinesNotUpdated: "Plazos no actualizados",
    contractType: "Tipo de contrato",
    endOf: "Fin de",
    finishedOn: "Finalizada el",
    cancel: "Cancelar",
    changeStatusInfo: "Cambio de estado:",
    changeOPInfo: "Cambio de PO:",
    changeOPRequestInfo: "Cambio de PO en",
    deallocateOP: "Desasignar PO",
    withoutAssign: "Sin asignar",
    finishOn: "Finaliza el",
    createChangeOPRequest: "Crear solicitud de modificación de PO",
    initialInformation: "Información inicial",
    requestDetailInfo: "Escriba los detalles de la solicitud",
    counterPartInfo: "Seleccione la organización",
    operationProgramInfo: "Seleccione el Programa de Operación",
    confirmation: "Confirmación",
    confirmationInfo: "Confirme los datos",
    changeOPRequestTitleLabel: "Título de la solicitud",
    changeOPProcessTitleLabel: "Título del proceso",
    titleRequired: "Se requiere ingresar un título",
    counterpartRequired: "Se requiere una contraparte",
    operationProgramRequired: "Se requiere un programa de operación o indicar explícitamente que no",
    reasonRequired: "Se requiere seleccionar un motivo",
    changeOPRequestRequired: "Debe indicar al menos una solicitud de modificación",
    writeMessage: "Escriba un mensaje...",
    withoutOP: "Sin PO",
    selectOP: "Seleccione un PO",
    confirmData: "Confirmar datos:",
    back: "Atrás",
    create: "Crear",
    createChangeOPRequestSuccess: "¡Solicitud creada exitosamente!",
    confirm: "Confirmar",
    operationPrograms: "Programas de Operación",
    operationProgramsNumber: "Número de programas",
    operationProgramType: "Tipo",
    createOperationProgram: "Crear Programa de Operación",
    operationProgramDate: "Fecha de Programa de Operación",
    date: "Fecha",
    dateRequired: "Se require una fecha",
    createOperationProgramSuccess: "¡Programa de Operación creado exitosamente!",
    updateOpSuccess: "¡Programa de Operación actualizado exitosamente!",
    editOP: "Modificar Programa de Operación",
    changeOpDate: "Modificar fecha",
    changeOpType: "Modificar tipo",
    start_at: "Fecha",
    noDataEdited: "No hay datos a cambiar",
    secureToDeleteOp: "¿Confirma la eliminación del Programa de Operación?",
    cannotRevertOperation: "Esta operación no puede ser revertida",
    delete: "Eliminar",
    deleteOpError: "Error al eliminar el Programa de Operación",
    deleted: "¡Eliminado!",
    detail: "Detalle",
    deleteOperationProgramSuccess: "¡Programa de Operación eliminado exitosamente!",
    information: "Información",
    value: "Valor",
    previousData: "Datos anteriores",
    newData: "Datos nuevos",
    dataChange: "Actualización de datos",
    opLog: "Log de Programa de Operación",
    op_type: "Tipo de PO",
    op: "PO",
    files: "Archivos",
    selectChangeOPRequest: "Seleccione Solicitud de modificación de PO",
    selectedChangeOPRequests: "Solicitudes seleccionadas",
    save: "Guardar",
    assignChangeOPRequests: "Asignar solicitudes de modificación de PO",
    filter: "Filtrar",
    relatedRequests: "Solicitudes relacionadas",
    relatedChangeOPRequests: "Solicitudes relacionadas",
    requests: "Procesos de modificación",
    changeRelatedRequestSuccess: "¡Solicitudes relacionadas cambiadas exitosamente!",
    changeRelatedRequestError: "¡Error al modificar solicitudes!",
    changeOPProcesses: "Procesos de modificación de PO",
    changeRequestOPInfo: "Cambio de PO en ",
    changeStatusRequestInfo: "Cambio de estado en ",
    changeOPRequest: "Solicitud de modificación",
    genericError: "Error en la solicitud",
    changeReasonInfo: "Cambio de motivo:",
    changeReasonRequestInfo: "Cambio de motivo en",
    createChangeOPProcess: "Crear proceso de modificación de PO",
    addRequest: "Añadir solicitud",
    changeOPRequestsInfo: "Añada las solicitudes",
    add: "Añadir",
    change_op_requests: "N° de solicitudes de modificación",
    operation_program: "Programa de operación",
    relatedRoutes: "Servicios relacionados",
    confirmMessageInsert: "¿Está seguro que desea enviar el mensaje? esta acción no se puede deshacer.",
    actions: "Acciones",
    implementationDate: "Fecha de implementación",
    related_routes: "Servicios relacionados",
    selectPlaceholder: "Seleccionar",
    routeDefinitions: "Diccionario de servicios",
    uploadedRouteFileSuccess:
      "Archivo actualizado exitosamente. Se creación {created} registros y se actualizaron {updated} registros.",
    creatorOrganization: "Organización creadora",
  },
  de: {
    dashboard: "Instrumententafel",
    layoutBuilder: "Layout-Builder",
    craft: "Hergestellt",
    pages: "Seiten",
    profile: "Profil",
    profileOverview: "Überblick",
    projects: "Projekte",
    campaigns: "Kampagnen",
    documents: "Unterlagen",
    connections: "Anschlüsse",
    wizards: "Zauberer",
    horizontal: "Horizontal",
    vertical: "Vertikal",
    account: "Konto",
    accountOverview: "Überblick",
    settings: "Die Einstellungen",
    authentication: "Authentifizierung",
    basicFlow: "Grundfluss",
    signIn: "Einloggen",
    signUp: "Anmelden",
    passwordReset: "Passwort zurücksetzen",
    error404: "Fehler 404",
    error500: "Fehler 500",
    apps: "Apps",
    chat: "Plaudern",
    privateChat: "Private Chat",
    groupChat: "Privater Chat",
    drawerChat: "Gruppenchat Schubladen-Chat",
    widgets: "Widgets",
    widgetsLists: "Listen",
    widgetsStatistics: "Statistiken",
    widgetsCharts: "Diagramme",
    widgetsMixed: "Gemischt",
    widgetsTables: "Tabellen",
    widgetsFeeds: "Einspeisungen",
    changelog: "Änderungsprotokoll",
    docsAndComponents: "Dokumente & Komponenten",
    megaMenu: "Mega-Menü",
    exampleLink: "Beispiellink",
    modals: "Modale",
    general: "Allgemeines",
    inviteFriends: "Freunde Einladen",
    viewUsers: "Benutzer Anzeigen.",
    upgradePlan: "Upgrade-Plan",
    shareAndEarn: "Teilen & Verdienen",
    forms: "Formen",
    newTarget: "Neues Ziel",
    newCard: "Neue Karte",
    newAddress: "Neue Adresse",
    createAPIKey: "Api-Key Erstellen",
    twoFactorAuth: "Zwei Faktor Auth.",
    createApp: "App Erstellen",
    createAccount: "Benutzerkonto Erstellen",
    activity: "Aktivität",
    documentation: "Dokumentation",
    components: "Bauteile",
    resources: "Ressourcen",
    customers: "Kunden",
    gettingStarted: "Einstieg",
    customersListing: "Kundenauflistung",
    customerDetails: "Kundenangaben",
    calendarApp: "Kalender",
  },
  ja: {
    dashboard: "ダッシュボード",
    layoutBuilder: "レイアウトビルダー",
    craft: "作成された",
    pages: "ページ",
    profile: "プロフィール",
    profileOverview: "概要",
    projects: "プロジェクト",
    campaigns: "キャンペーン",
    documents: "書類",
    connections: "接続",
    wizards: "ウィザード",
    horizontal: "横",
    vertical: "垂直",
    account: "アカウント",
    accountOverview: "概要",
    settings: "設定",
    authentication: "認証",
    basicFlow: "基本的な流れ",
    signIn: "サインイン",
    signUp: "サインアップ",
    passwordReset: "パスワードのリセット",
    error404: "エラー404",
    error500: "エラー 500",
    apps: "アプリ",
    chat: "チャット",
    privateChat: "プライベートチャット",
    groupChat: "グループチャット",
    drawerChat: "ドロワーチャット",
    widgets: "ウィジェット",
    widgetsLists: "リスト",
    widgetsStatistics: "統計",
    widgetsCharts: "チャート",
    widgetsMixed: "混合",
    widgetsTables: "テーブル",
    widgetsFeeds: "フィード",
    changelog: "変更ログ",
    docsAndComponents: "ドキュメントとコンポーネント",
    megaMenu: "メガメニュー",
    exampleLink: "リンク例",
    modals: "モーダルズ",
    general: "一般",
    inviteFriends: "友達を招待",
    viewUsers: "ユーザーを表示します",
    upgradePlan: "アップグレードプラン",
    shareAndEarn: "シェア＆稼働",
    forms: "フォーム",
    newTarget: "新しいターゲット",
    newCard: "新しいカード",
    newAddress: "新しいアドレス",
    createAPIKey: "Apiキーを作成します",
    twoFactorAuth: "2つの要因Auth",
    createApp: "アプリを作成します",
    createAccount: "アカウントを作成する",
    activity: "アクティビティ",
    documentation: "ドキュメンテーション",
    components: "コンポーネント",
    resources: "資力",
    customers: "お客様のお客様",
    gettingStarted: "入門",
    customersListing: "顧客のリスト",
    customerDetails: "お客様の詳細",
    calendarApp: "カレンダー",
  },
  fr: {
    dashboard: "Générateur de mise",
    layoutBuilder: "En page",
    craft: "Fabriqué",
    pages: "Pages",
    profile: "Profil",
    profileOverview: "Aperçu",
    projects: "Projets",
    campaigns: "Campagnes",
    documents: "Documents",
    connections: "Connexions",
    wizards: "Sorciers",
    horizontal: "Horizontal",
    vertical: "Verticale",
    account: "Compte",
    accountOverview: "Aperçu",
    settings: "Paramètres",
    authentication: "Authentification",
    basicFlow: "Flux de base",
    signIn: "SS'identifier",
    signUp: "Inscrivez-vous",
    passwordReset: "Réinitialisation du mot de passe",
    error404: "Erreur 404",
    error500: "Erreur 500",
    apps: "Applications",
    chat: "Discuter",
    privateChat: "Discussion privée",
    groupChat: "Discussion de groupe",
    drawerChat: "Chat de tiroir",
    widgets: "Widgets",
    widgetsLists: "Listes",
    widgetsStatistics: "Statistiques",
    widgetsCharts: "Graphiques",
    widgetsMixed: "Mixte",
    widgetsTables: "Les tables",
    widgetsFeeds: "Flux",
    changelog: "Journal des modifications",
    docsAndComponents: "Documents & composants",
    megaMenu: "Méga Menu",
    exampleLink: "Exemple de lien",
    modals: "Modals",
    general: "Général",
    inviteFriends: "Inviter Des Amis",
    viewUsers: "Voir Les Utilisateurs",
    upgradePlan: "Plan De Mise À Niveau",
    shareAndEarn: "Partager Et Gagner",
    forms: "Formes",
    newTarget: "Nouvelle Cible",
    newCard: "Nouvelle Carte",
    newAddress: "Nouvelle Adresse",
    createAPIKey: "Créer Une Touche Api",
    twoFactorAuth: "Deux Facteurs D'Authentification",
    createApp: "Créer Une Application",
    createAccount: "Créer Un Compte",
    activity: "Activité",
    documentation: "Documentation",
    components: "Composants",
    resources: "Ressources",
    customers: "Les Clients",
    gettingStarted: "Commencer",
    customersListing: "Liste Des Clients",
    customerDetails: "Détails Des Clients",
    calendarApp: "Calendrier",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  globalInjection: true,
  messages,
});

export default i18n;
