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
      group_id: 1,
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
      group_id: 2,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: London,
      maxUpload: 2,
      req: false,
      group_id: 2,
    },
    {
      name: "Voters Card",
      description: "front and back",
      type: "file",
      is_selected: false,
      icon: ID,
      maxUpload: 2,
      req: false,
      group_id: 2,
    },
  ],
  inputPlaceholder: [
    { placeholder: "Residential Address", group_id: 3 },
    {
      placeholder: "BVN / SSN",
      group_id: 3,
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
      group_id: 1,
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
      group_id: 2,
      icon: Passport,
      maxUpload: 2,
      req: false,
    },
    {
      name: "Driver License",
      description: "front and back",
      type: "file",
      is_selected: false,
      group_id: 2,
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
      group_id: 2,
      req: false,
    },
  ],
  inputPlaceholder: [
    {
      placeholder: "Residential Address",
      group_id: 3,
    },
    {
      placeholder: "BVN",
      group_id: 3,
    },
    {
      placeholder: "NIN (National Identity Number)",
      group_id: 3,
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

export const groups = [
  {
    id: 1,
    title: "Passport Information",
    set_req: 1,
    req_msg: "Passport photograph upload is compulsory",
  },
  {
    id: 2,
    title: "Government Issued Identity Information",
    set_req: 1,
    req_msg: "You must select ONLY ONE from this Section",
  },
  {
    id: 3,
    title: "Personal Information",
    set_req: 2,
    req_msg: "All fields are required in this Section",
  },
];
