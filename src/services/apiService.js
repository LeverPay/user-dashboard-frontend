// src/services/apiService.js

import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "https://leverpay-api.azurewebsites.net/api";

const httpClient = axios.create({
  baseURL,
  timeout: 5000,
});

const setAuthHeader = (token) => {
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

<<<<<<< HEAD
export const signIn = async (credentials, setJwt) => {
    try {
        const response = await httpClient.post("/v1/user/signin", credentials);
        if (response.data.success) {
            const token = response.data.data.token;
            if (token) {
                toast.success(response.data.message);
                setJwt(token);
                localStorage.setItem("jwt", token);
                setAuthHeader(token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                toast.error("Token is missing in the response.");
            }
        } else {
            toast.error(response.data.message);
        }
    } catch (err) {
        toast.error(err.message);
        console.error("API call error:", err);
=======
export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const signInURL = `${baseURL}/v1/login`;
    console.log("Making API request to:", signInURL);
    console.log("User data:", userData);

    try {
      const response = await httpClient.post(signInURL, userData);
      if (response.data.success) {
        const token = response.data.data.token;

        // console.log("Token received:", token);

        if (token) {
          toast.success(response.data.message);
          setJwt(token);
          localStorage.setItem("jwt", token);
          setAuthHeader(token);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          toast.error("Token is missing in the response.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error("API call error:", err);
>>>>>>> eaa0404ddf21515fe2c5a104a92e039c8cfae1a6
    }
  }
};

<<<<<<< HEAD
export const signUp = async (signupData) => {
    try {
        const response = await httpClient.post("/v1/user/signup", signupData);
        if (response.data.status === 200) {
            toast.success(response.data.message);
            localStorage.setItem("userEmail", signupData.email);
            setTimeout(() => {
                window.location.href = "/leverpay-signup/signup-OTP";
            }, 2000);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Sign Up Error:", error);
        toast.error(error.message);
=======
export const signUp = async ({ signupData }) => {
  // httpClient
  //     .post("/v1/user/signup", signupData)
  //     .then((response) => {
  //         if (response.data.status === 200) {
  //             toast.success(`${response.data.message}`);
  //             localStorage.setItem("userEmail", signupData.email);
  //             setTimeout(() => {
  //                 window.location.href = "/leverpay-signup/signup-OTP";
  //             }, 2000);
  //         } else {
  //             // toast.error(`${response.data.message}`);
  //             return response
  //         }
  //     })
  //     .catch((error) => {
  //         console.log("Error", error, "Sign Up");
  //         return error;
  //     });

  try {
    const response = await httpClient.post("/v1/user/signup", signupData);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return the error response data
    } else {
      return { success: false, message: "An unknown error occurred." }; // Return a generic error message
>>>>>>> eaa0404ddf21515fe2c5a104a92e039c8cfae1a6
    }
  }
};

export const verifyEmail = async (verifyData) => {
  //   httpClient
  //     .post("/v1/verify-email", verifyData)
  //     .then((response) => {
  //       console.log("sent");
  //       return response;
  //     })
  //     .catch((error) => {
  //       //TODO Handle exception
  //       console.log("error", error);
  //       return error;
  //     });

  try {
    const response = await httpClient.post("/v1/verify-email", verifyData);
    return response.data;
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.data) {
      return error.response.data; // Return the error response data
    } else {
      return { success: false, message: "An unknown error occurred." }; // Return a generic error message
    }
  }
};

export const resendVerifyToken = async (email) => {
  httpClient
    .post("/v1/resend-verification-email", email)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return;
    });
};

export const getUserProfile = async (jwt, setJwt, setUser) => {
  setAuthHeader(jwt);
  try {
    const response = await httpClient.get("/v1/user/get-user-profile");
    setUser(response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    console.log("User profile retrieved successfully");
  } catch (err) {
    console.error("Get User Profile Error:", err);
  }
};

export const updateUserProfile = async (jwt, userDataUpdate) => {
  setAuthHeader(jwt);
  try {
    const response = await httpClient.post(
      "/v1/user/update-user-profile",
      userDataUpdate
    );
    toast.success(response.data.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (err) {
    console.error("Update User Profile Error:", err.message);
    toast.error(err.message);
  }
};

export const userResetPassword = async (passwordReset, setJwt) => {
  try {
    const response = await httpClient.post("/v1/reset-password", passwordReset);
    if (response.data.success !== false) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/signin";
        setJwt("");
      }, 5000);
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error("Reset Password Error:", err);
    toast.error(err.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await httpClient.get("/v1/user/logout");
    toast.success(response.data.message);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.href = "/signin";
  } catch (err) {
    console.error("Logout Error:", err.message);
    toast.error(err.message);
  }
};

export const getCountry = async (setCountry) => {
  try {
    const response = await httpClient.get("/v1/get-countries");
    setCountry(response.data.data);
  } catch (err) {
    console.error("Get Country Error:", err.message);
    toast.error(err.message);
  }
};

export const getState = async (countryID, setState) => {
  try {
    const response = await httpClient.post("/v1/get-states", {
      country_id: countryID,
    });
    setState(response.data.data);
  } catch (err) {
    console.error("Get State Error:", err.message);
    toast.error(err.message);
  }
};

export const getCities = async (stateID, setCity) => {
  try {
    const response = await httpClient.post("/v1/get-cities", {
      state_id: stateID,
    });
    setCity(response.data.data);
  } catch (err) {
    console.error("Get Cities Error:", err.message);
    toast.error(err.message);
  }
};
