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
      name: "Passport Photograph",

      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
      req: true,
    },
    {
      name: "International Passport",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Voters Card",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
      req: false,
    },
  ],
  inputPlaceholder: [
    { placeholder: "Residential Address" },
    {
      placeholder: "BVN",
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
      name: "Passport Photograph",

      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
      req: true,
    },
    {
      name: "International Passport",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Voters Card",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
      req: false,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "Residential Address",
    },
    {
      placeholder: "BVN",
    },
    {
      placeholder: "NIN (National Identity Number)",
    },
    {
      placeholder: "Utility Bill",
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
      name: "Passport Photograph",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
      req: true,
    },
    {
      name: "International Passport",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Voters Card",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Utility Bill",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 1,
      req: false,
    },
    {
      name: " Business CAC certificate",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 1,
      req: true,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "Residential Address",
    },
    {
      placeholder: "BVN",
    },
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
  ],
};
export const pinkLady = {
  title: "Pink-Lady Account",
  card: "PINK-LADY",
  color: "#FFA8A7",
  limit: 90000,
  data: [
    {
      name: "Passport Photograph",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "International Passport",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: Passport,
      maxUpload: 1,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
    },
    {
      name: "Voters Card",
      description: "front and back",
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
      placeholder: "Residential Address",
    },
    {
      placeholder: "BVN",
    },
    {
      placeholder: "NIN (National Identity Number)",
    },
  ],
};
