import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "https://leverpay-api.azurewebsites.net/api";

// Create an axios instance
const httpClient = axios.create({
    baseURL,
    timeout: 5000,
});

// Utility function to set the Authorization header dynamically
const setAuthHeader = (token) => {
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Sign In Function
export const signIn = async (userData, jwt, setJwt) => {
    if (!jwt) {
        const signInURL = `${baseURL}/v1/login`;
        console.log("Making API request to:", signInURL);
        console.log("User data:", userData);

        try {
            const response = await httpClient.post(signInURL, userData);
            console.log("Response received:", response);

            // Check the structure of the response data
            console.log("Response data:", response.data);

            if (response.data.success) {
                // Access token from nested data property
                const token = response.data.data.token;

                // Debugging: Check the token value
                console.log("Token received:", token);

                if (token) {
                    toast.success(response.data.message);
                    setJwt(token);
                    localStorage.setItem("_jwt", token);
                    setAuthHeader(token);
                    
                    // Debugging: Check if token is set correctly
                    console.log("Token set in localStorage:", localStorage.getItem("_jwt"));
                    
                    setTimeout(() => {
                        // Debugging: Log before redirection
                        console.log("Redirecting to dashboard");
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
};


// Sign Up Function
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
    }
};

// Verify Email Function
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
        console.error("Verify Email Error:", error);
        toast.error(error.message);
    }
};

// Get User Profile Function
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

// Update User Profile Function
export const updateUserProfile = async (jwt, userDataUpdate) => {
    setAuthHeader(jwt);
    try {
        const response = await httpClient.post("/v1/user/update-user-profile", userDataUpdate);
        toast.success(response.data.message);
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    } catch (err) {
        console.error("Update User Profile Error:", err.message);
        toast.error(err.message);
    }
};

// User Reset Password Function
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

// Logout User Function
export const logoutUser = async () => {
    try {
        const response = await httpClient.get("/v1/user/logout");
        toast.success(response.data.message);
        localStorage.removeItem("user");
        localStorage.removeItem("_jwt");
    } catch (err) {
        console.error("Logout Error:", err.message);
        toast.error(err.message);
    }
};

// Get Country Function
export const getCountry = async (setCountry) => {
    try {
        const response = await httpClient.get("/v1/get-countries");
        setCountry(response.data.data);
    } catch (err) {
        console.error("Get Country Error:", err.message);
        toast.error(err.message);
    }
};

// Get State Function
export const getState = async (countryID, setState) => {
    try {
        const response = await httpClient.post("/v1/get-states", { country_id: countryID });
        setState(response.data.data);
    } catch (err) {
        console.error("Get State Error:", err.message);
        toast.error(err.message);
    }
};

// Get Cities Function
export const getCities = async (stateID, setCity) => {
    try {
        const response = await httpClient.post("/v1/get-cities", { state_id: stateID });
        setCity(response.data.data);
    } catch (err) {
        console.error("Get Cities Error:", err.message);
        toast.error(err.message);
    }
};



// import { toast } from "react-toastify";
// import axios from "axios";

// const httpClient = axios.create({
//     // baseURL: process.env.REACT_APP_LEVERPAY_API_URL,
//     baseURL: "https://leverpay-api.azurewebsites.net/api",
//     // ---DEBUGGING ---
//     //The sign in is not working after click of the signIn button
//     //so here, i am trying to check where the error is from
//     //change the time out from 1seconds to 5 seconds
//     timeout: 5000,
//     headers: { Authorization: "Bearer " + localStorage.getItem("_jwt") },
// });

// export const signIn = async (userData, jwt, setJwt) => {
//     if (!jwt) {
//         const signInURL = "https://leverpay-api.azurewebsites.net/api/v1/login";
//         //----DEBUGGING----
//         //check if the request is sent successfully
//         console.log("Making API request to:", signInURL);
//         console.log("User data:", userData);

//         httpClient
//             .post(signInURL, userData)
//             .then((response) => {
//                 // ---DEBUGGING---
//                 console.log("Response received:", response);
//                 if (response.data.success) {
//                     toast.success(`${response.data.message}`);
//                     setJwt(`${response.data.token}`);
//                     localStorage.setItem("_jwt", response.data.token);
//                     setTimeout(() => {
//                         window.location.href = "/";
//                     }, 2000);
//                 } else {
//                     toast.error(`${response.data.message}`);
//                 }
//             })
//             .catch((err) => {
//                 toast.error(err);
//                 // ---DEBUGGING---
//                 console.error("API call error:", err);
//             });
//     }
// };

// export const signUp = async ({ signupData }) => {
//     httpClient
//         .post("/v1/user/signup", signupData)
//         .then((response) => {
//             if (response.data.status === 200) {
//                 toast.success(`${response.data.message}`);
//                 localStorage.setItem("userEmail", signupData.email);
//                 setTimeout(() => {
//                     window.location.href = "/leverpay-signup/signup-OTP";
//                 }, 2000);
//             } else {
//                 toast.error(`${response.data.message}`);
//             }
//         })
//         .catch((error) => {
//             console.log("Error", error, "Sign Up");
//         });
// };

// export const verifyEmail = async (verifyData) => {
//     httpClient
//         .post("/v1/verify-email")
//         .then((response) => {
//             if (response.data.status === 200) {
//                 // Use response instead of messages
//                 toast.success(`${response.data.message}`);
//                 setTimeout(() => {
//                     window.location.href = "/signin";
//                 }, 2000);
//             } else {
//                 toast.error(`${response.data.message}`);
//             }
//         })
//         .catch((error) => {
//             //TODO Handle exception
//             return;
//         });
// };

// export const getUserProfile = async (jwt, setJwt, setUser) => {
//     httpClient
//         .get("/v1/user/get-user-profile")
//         .then((response) => {
//             setUser(response.data.data);
//             localStorage.setItem("user", JSON.stringify(response.data.data));
//             console.log("user found successfully");
//         })
//         .catch((err) => {
//             console.log(`${err}`);
//         });
// };

// export const updateUserProfile = async (jwt, userDataUpdate) => {
//     httpClient
//         .post("/v1/user/update-user-profile", userDataUpdate)
//         .then((response) => {
//             toast.success(response.data.message);
//             setTimeout(() => {
//                 window.location.href = "/";
//             }, 2000);
//         })
//         .catch((err) => {
//             console.log(`${err.message}`);
//         });
// };

// export const userResetPassword = async (passwordReset, setJwt) => {
//     httpClient
//         .post("/v1/reset-password", passwordReset)
//         .then((response) => {
//             if (response.data.success !== false) {
//                 toast.success(response.data);
//                 setTimeout(() => {
//                     window.location.href = "/signin";
//                     setJwt("");
//                 }, 5000);
//             }
//             if (response.data.message === "Error") {
//                 toast.error(`${response.data.data.new_password}`);
//             } else {
//                 toast.error(response.data.message);
//             }
//         })
//         .catch((err) => {
//             toast.error(`${err}`);
//         });
// };

// export const logoutUser = async (jwt) => {
//     httpClient
//         .get("/v1/user/logout")
//         .then((response) => {
//             toast.success(response.data.message);
//             localStorage.removeItem("user");
//         })
//         .catch((err) => {
//             console.log(`${err.message}`);
//         });
// };

// export const getCountry = ({ setCountry }) => {
//     httpClient
//         .get("/v1/get-countries")
//         .then((response) => {
//             setCountry(response.data.data.map((countries) => countries));
//         })
//         .catch((err) => {
//             toast.error(err.message);
//         });
// };

// export const getState = ({ countryID, setState }) => {
//     httpClient
//         .post("https://leverpay-api.azurewebsites.net/api/v1/get-states", {
//             country_id: countryID,
//         })
//         .then((getStates) => {
//             setState(getStates.data.data.map((states) => states));
//         })
//         .catch((err) => {
//             toast.error(err.message);
//         });
// };

// export const getCities = ({ stateID, setCity }) => {
//     httpClient
//         .post("https://leverpay-api.azurewebsites.net/api/v1/get-cities", {
//             state_id: stateID,
//         })
//         .then((getCities) => {
//             setCity(getCities.data.data.map((cities) => cities));
//         })
//         .catch((err) => {
//             toast.error(err.message);
//         });
// };
