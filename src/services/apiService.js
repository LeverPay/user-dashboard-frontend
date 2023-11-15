import { toast } from "react-toastify";
import axios from "axios";
// import ResetPassword from "../components/ResetPasswordComponent/ResetPassword";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_LEVERPAY_API_URL,
    timeout: 1000,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem("_jwt")}
});


export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const signInURL = "https://leverpay-api.azurewebsites.net/api/v1/login";
    httpClient.post("/login", userData)
    .then(response => {
      if (response.data.success) {
        toast.success(`${response.message}`);
        // console.log(userData);
        setJwt(`${response.data.token}`);
        localStorage.setItem("_jwt", response.data.token)
        //transition to homepage
        setTimeout(() => {
          window.location.href = "/";
          }, 2000);
      } else {
        toast.error(`${response.message}`);
      }
    })
    .catch(err => {
      toast.error(err);
    })
  }
};

export const signUp = async ({ signupData }) => {
  httpClient.post("/v1/user/signup", signupData)
  .then(response => {
    if (response.data.status === 200) {
      toast.success(`${response.data.message}`);
      localStorage.setItem("userEmail", signupData.email);
      setTimeout(() => {
        window.location.href = "/leverpay-signup/signup-OTP";
        }, 2000);
    } else {
      toast.error(`${response.data.message}`);
    }
  })
  .catch(error => {
    console.log("Error", error, "Sign Up");
  })
};

export const verifyEmail = async (verifyData) => {
  httpClient.post("/v1/verify-email")
  .then(response => {
    if (messages.status === 200) {
      toast.success(`${messages.message}`);
      //transition to signin page
      setTimeout(() => {
        window.location.href = "/signin";
        }, 2000);
    } else {
      toast.error(`${messages.message}`);
    }
  })
  .catch((error) => {
    //TODO Handle exception
    return;
  });
};

//----------------------------------------- getUserProfile --------------------------------------------------//

export const getUserProfile = async (jwt, setJwt, setUser) => {
  httpClient.get("/v1/user/get-user-profile")
  .then((response) => {
    setUser(response.data.data);
    localStorage.setItem('user', JSON.stringify(response.data.data))
    console.log("user found successfully");
  })
  .catch((err) => {
    console.log(`${err}`);
  });
};

export const updateUserProfile = async (jwt, userDataUpdate) => {
  httpClient.post("/v1/user/update-user-profile", userDataUpdate)
  .then(response => {
    toast.success(response.data.message);
    //transition to homepage
    setTimeout(() => {
      window.location.href = "/";
      }, 2000);
  })
  .catch((err) => {
    console.log(`${err.message}`);
  });
};

export const userResetPassword = async (passwordReset, setJwt) => {
  httpClient.post("/v1/reset-password", passwordReset)
  .then(response => {
    if (response.data.success !== false) {
      toast.success(response.data);
      setTimeout(() => {
        window.location.href = "/signin";
        setJwt("");
        }, 5000);
    }
    if (response.data.message === "Error") {
      toast.error(`${response.data.data.new_password}`);
    } else {
      toast.error(response.data.message);
    }
  })
  .catch((err) => {
    toast.error(`${err}`);
  });
};

export const logoutUser = async (jwt) => {
  httpClient.get("/v1/user/logout")
  .then((response) => {
    toast.success(response.data.message);
    localStorage.removeItem('user')
  })
  .catch((err) => {
    console.log(`${err.message}`);
  });
};

export const getCountry = ({ setCountry }) => {
  httpClient
    .get("/v1/get-countries")
    .then((response) => {
      setCountry(response.data.data.map((countries) => countries));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getState = ({ countryID, setState }) => {
  httpClient
    .post("https://leverpay-api.azurewebsites.net/api/v1/get-states", {
      country_id: countryID,
    })
    .then((getStates) => {
      setState(getStates.data.data.map((states) => states));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getCities = ({ stateID, setCity }) => {
  httpClient
    .post("https://leverpay-api.azurewebsites.net/api/v1/get-cities", {
      state_id: stateID,
    })
    .then((getCities) => {
      setCity(getCities.data.data.map((cities) => cities));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};