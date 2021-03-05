export const SharedContants = {
  role: {
    staffRole: "staff",
    adminRole: "Admin",
  },
  sideNav: {
    StaffSideNav: [
      {
        routerLink: "/checkIn",
        routerLinkText: "Check In",
        icon: "assignment_turned_in",
      },
      {
        routerLink: "/inFlight",
        routerLinkText: "In Flight",
        icon: "assignment",
      },
      { routerLink: "/about", routerLinkText: "About", icon: "info" },
      {
        routerLink: "/logout",
        routerLinkText: "Logout",
        icon: "logout",
      },
    ],
    AdminSideNav: [
      {
        routerLink: "/admin",
        routerLinkText: "Administrator",
        icon: "account_box",
      },
      { routerLink: "/about", routerLinkText: "About", icon: "info" },
      {
        routerLink: "/logout",
        routerLinkText: "Logout",
        icon: "logout",
      },
    ],
  },
  rowSeatName: ["A", "B", "C", "D", "E", "F"],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  text: {
    checkedIn: "checked-in",
    notCheckedIn: "not-checked-in",
    wheelChair: "wheel-chair",
    noWheelChair: "no-wheel-chair",
    infants: "infants",
    noInfants: "no-infants",
    mealNotRequired: "Not Required",
    normalVegMeal: "Veg Meal",
    normalNonVegMeal: "Non Veg Meal",
    specialVegMeal: "Special Veg Meal",
    specialNonVegMeal: "Special Non Veg Meal",
  },
};
