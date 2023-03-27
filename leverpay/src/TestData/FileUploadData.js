import Passport from "../assets/images/Passport.png";
import London from "../assets/images/London-Cab.png";
import ID from "../assets/images/id.png";

export const gold = {
  title: "Gold Account",
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
      placeholder: "Residential Address",
    },
  ],
};

///diamond upgrade form

export const diamond = {
  title: "Diamond Account",
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
