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
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setJwt(response.data.data.token);
        localStorage.setItem("_jwt", response.data.data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error(response.data.message);
        setSubmitted(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }

      setSubmitted(false);
    }
  }
};

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
    const response = await httpClient.post(
      "/v1/user/update-user-profile",
      userDataUpdate
    );
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
  } catch (err) {
    console.log(err.message);
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
    const response = await httpClient.post("/v1/get-states", {
      country_id: countryID,
    });
    setState(response.data.data);
  } catch (err) {
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
    toast.error(err.message);
  }
};
