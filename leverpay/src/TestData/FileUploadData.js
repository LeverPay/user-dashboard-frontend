import Passport from "../assets/images/Passport.png";
import London from "../assets/images/London-Cab.png";
import ID from "../assets/images/id.png";

export const gold = {
  title: "Gold Account",
  card: "GOLD",
  color: "#84632E",
  limit: 50000,
  data: [
    {
      name: "Passport",
      fileDetail: "Front and Back",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 2,
    },
    {
      name: "International Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "Driver License",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
    },
    {
      name: "Voters Card",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "Residential Address",
    },
  ],
};

///diamond upgrade form

export const diamond = {
  title: "Diamond Account",
  card: "DIAMOND",
  color: "#082E88",
  limit: 70000,
  data: [
    {
      name: "Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 2,
    },
    {
      name: "International Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "Driver License",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
    },
    {
      name: "Voters Card",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "NIN (National Identity Number)",
    },
    {
      placeholder: "Utility Bill",
    },
    {
      placeholder: "Residential Address",
    },
  ],
};
export const enterprise = {
  title: "Enterprise Account",
  card: "ENTERPRISE",
  color: "#567444",
  limit: 100000,
  data: [
    {
      name: "Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "International Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "Driver License",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
    },
    {
      name: "Voters Card",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
    },
    {
      name: "Utility Bill",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 1,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "Business Name",
    },
    {
      placeholder: "Business Address",
    },
    {
      placeholder: "CAC RC. No:",
    },
    {
      placeholder: "NIN (National Identity Number)",
    },
    {
      placeholder: "Residential Address",
    },
  ],
};
export const pinkLady = {
  title: "Pink-Lady Account",
  card: "PINK-LADY",
  color: "#FFA8A7",
  limit: 90000,
  data: [
    {
      name: "Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "International Passport",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "Driver License",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
    },
    {
      name: "Voters Card",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
    },
    {
      name: "Utility Bill",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 1,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "NIN (National Identity Number)",
    },
    {
      placeholder: "BVN",
    },
    {
      placeholder: "Residential Address",
    },
  ],
};
