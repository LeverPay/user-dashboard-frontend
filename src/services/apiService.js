import { toast } from "react-toastify";
import axios from "axios";

const httpClient = axios.create({

  baseURL: process.env.REACT_APP_LEVERPAY_API_URL,
  timeout: 10000,
  headers: { Authorization: "Bearer " + localStorage.getItem("_jwt") },

});

export const signIn = async (userData, jwt, setJwt, setSubmitted) => {
  if (!jwt) {
    const signInURL = "https://leverpay-api.azurewebsites.net/api/v1/login";

    try {
      const response = await httpClient.post(signInURL, userData);

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
        }

    }

  }
};

export const signUp = async ({ signupData }) => {
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
    console.log("Error", error, "Sign Up");
  }
};

export const verifyEmail = async (verifyData) => {
  try {
    const response = await httpClient.post("/v1/verify-email", verifyData);
    if (response.data.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (setUser) => {
  try {
    const response = await httpClient.get("/v1/user/get-user-profile");
    setUser(response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    console.log("User found successfully");
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (userDataUpdate) => {
  try {
    const response = await httpClient.post("/v1/user/update-user-profile", userDataUpdate);
    toast.success(response.data.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (err) {
    console.log(err.message);
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
    toast.error(err.message);
  }
};

export const logoutUser = async () => {

    try {
        const response = await httpClient.get("/v1/user/logout");
        toast.success(response.data.message);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        window.location.href = "/signin"
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
    toast.error(err.message);
  }
};

export const getState = async (countryID, setState) => {
  try {
    const response = await httpClient.post("/v1/get-states", { country_id: countryID });
    setState(response.data.data);
  } catch (err) {
    toast.error(err.message);
  }
};

export const getCities = async (stateID, setCity) => {
  try {
    const response = await httpClient.post("/v1/get-cities", { state_id: stateID });
    setCity(response.data.data);
  } catch (err) {
    toast.error(err.message);
  }
};

