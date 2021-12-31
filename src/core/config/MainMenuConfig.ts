const DocMenuConfig = [
  {
    pages: [
      {
        access: "all",
        heading: "requests",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        access: "ops",
        heading: "operationProgramAdmin",
        route: "/operation-programs",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        access: "users",
        heading: "usersAdmin",
        route: "/users",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        access: "organizations",
        heading: "organizationsAdmin",
        route: "/organizations",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
    ],
  },
];

export default DocMenuConfig;
