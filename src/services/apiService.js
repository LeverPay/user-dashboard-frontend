import { toast } from "react-toastify";
import axios from "axios";
// import ResetPassword from "../components/ResetPasswordComponent/ResetPassword";

export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const signInURL = "https://leverpay-api.azurewebsites.net/api/v1/login";
    const response = await fetch(signInURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success(`${res.message}`);
          // console.log(userData);
          setJwt(`${res.data.token}`);
          console.log(res.data.token);
          //transition to homepage
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          toast.error(`${res.message}`);
          // console.log(res);
        }
      })
      .catch((err) => {
        toast.error(err);
      });

    return await response;
  }
};

export const signUp = async ({ signupData }) => {
  const response = await fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/user/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
      body: JSON.stringify(signupData),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((registered) => {
      if (registered.success) {
        localStorage.setItem("userEmail", signupData.email);
        setTimeout(() => {
          window.location.href = "/leverpay-signup/signup-OTP";
        }, 2000);
      } else {
        if (registered.errors.email) {
          toast.error(registered.errors.email[0]);
        } else if (registered.errors.phone) {
          toast.error(registered.errors.phone[0]);
        } else {
          toast.error("Could not register user");
        }
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
  return await response;
};

export const verifyEmail = async (verifyData) => {
  const SignUp = await fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/verify-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(verifyData),
    }
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((verified) => {
      if (verified.success === true) {
        toast.success(verified.message);
        //clear userEmail in localStorage
        localStorage.removeItem("userEmail");
        //transition to signin page
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        // toast.error(`${verified.message}`);
        console.log(verified.message);
        localStorage.removeItem("userEmail");
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("userEmail");
    });

  return await SignUp;
};

//----------------------------------------- getUserProfile --------------------------------------------------//

export const getUserProfile = async (jwt, setJwt, setUser) => {
  const getData =
    "https://leverpay-api.azurewebsites.net/api/v1/user/get-user-profile";
  const userProfile = await fetch(getData, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      } else {
        if (jwt) {
          setJwt("");
        }
        console.log(res);
      }
    })
    .then((resData) => {
      setUser(resData.data);
      localStorage.setItem("user", JSON.stringify(resData.data));
      console.log("user found successfully");
    })
    .catch((err) => {
      console.log(`${err}`);
    });

  return await userProfile;
};

export const updateUserProfile = async (jwt, userDataUpdate) => {
  const updateRes = await fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/user/update-user-profile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(userDataUpdate),
    }
  )
    .then((res) => {
      if (res.status === 200) {
        console.log(userDataUpdate.passport);
        return res.json();
      } else {
        toast.error("Something went wrong");
      }
    })
    .then((resUser) => {
      toast.success(resUser.message);
      //transition to homepage
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });
  return await updateRes;
};

export const userResetPassword = async (passwordReset, setJwt) => {
  const resetPass = await fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/reset-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(passwordReset),
    }
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.success !== false) {
        toast.success(res);
        setTimeout(() => {
          window.location.href = "/signin";
          setJwt("");
        }, 5000);
      }
      if (res.message === "Error") {
        toast.error(`${res.data.new_password}`);
      } else {
        toast.error(res.message);
      }
    })
    .catch((err) => {
      toast.error(`${err}`);
    });

  return resetPass;
};

export const logoutUser = async (jwt) => {
  const logOut = await fetch(
    "https://leverpay-api.azurewebsites.net/api/v1/user/logout",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
    .then((logoutResponse) => {
      if (logoutResponse.status === 200) return logoutResponse.json();
    })
    .then((logoutData) => {
      toast.success(logoutData.message);
      localStorage.removeItem("user");
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });

  return await logOut;
};

export const getCountry = ({ setCountry }) => {
  axios
    .get("https://leverpay-api.azurewebsites.net/api/v1/get-countries")
    .then((response) => {
      setCountry(response.data.data.map((countries) => countries));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getState = ({ countryID, setState }) => {
  axios
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
  axios
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
