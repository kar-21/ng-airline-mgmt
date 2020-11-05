export const SharedContants = {
  role: {
    staffRole: "staff",
    adminRole: "Admin",
  },
  sideNav: {
    StaffSideNav: [
      {
        routerLink: "/",
        routerLinkText: "Check In",
        icon: "assignment_turned_in",
      },
      {
        routerLink: "/inFlight",
        routerLinkText: "In Flight",
        icon: "assignment",
      },
      { routerLink: "/about", routerLinkText: "About", icon: "info" },
    ],
    AdminSideNav: [
      {
        routerLink: "/admin",
        routerLinkText: "Administrator",
        icon: "account_box",
      },
      { routerLink: "/about", routerLinkText: "About", icon: "info" },
    ],
  },
};
