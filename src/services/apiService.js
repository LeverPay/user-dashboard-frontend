import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "https://leverpay-api.azurewebsites.net/api";

const httpClient = axios.create({
  baseURL,
});

const setAuthHeader = (jwt) => {
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

export const signIn = async (userData, setJwt) => {
  const signInURL = `${baseURL}/v1/login`;
  try {
    const response = await axios.post(signInURL, userData);
    if (response.data.success) {
      const token = response.data.data.token;
      if (token) {
        toast.success(response.data.message);
        // setJwt(token);
        localStorage.setItem("jwt", JSON.stringify(token));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      
        const { email, phone } = response.data.data.user;
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhoneNumber", phone);
        // localStorage.setItem("userWalletAmount", wallet.amount.ngn);

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
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    console.error("API call error:", err);
  }
};

export const signUp = async ({ signupData }) => {
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

export const payInvoice = async ({ id }) => {
  const idData = {
    uuid: id,
  };
  try {
    const response = await httpClient.post("/v1/user/pay-invoice", idData);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return the error response data
    } else {
      return { success: false, message: "An unknown error occurred." }; // Return a generic error message
    }
  }
};

export const verifyPayInvoice = async ({ id, otp }) => {
  const idData = {
    uuid: id,
    otp: otp,
  };

  try {
    const response = await httpClient.post(
      "/v1/user/verify-invoices-otp",
      idData
    );
    return response.data;
  } catch (error) {
    console.log("err", error);
    if (error.response && error.response.data) {
      return error.response.data; 
    } else {
      return { success: false, message: "An unknown error occurred." }; 
    }
  }
};

export const verifyEmail = async (verifyData) => {
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
  try {
    const response = await httpClient.post("/v1/resend-verification-email", {
      email,
    });
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

export const getBillersCategories = async (jwt) => {
  setAuthHeader(jwt);
  try {
    const response = await httpClient.get(
      "/v1/user/quickteller/get-billers-categories"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching biller categories:", error);
    throw error;
  }
};
export const getBillersByCategoryId = async (jwt, categoryId) => {
  const response = await httpClient.get(
    `/v1/user/quickteller/get-billers-by-category-id?categoryId=${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  console.log("Billers for category:", response.data);
  console.log(response.data);
  return response.data;
};
export const getBillerPaymentItemsByAmount = async (jwt, billerId, amount) => {
  try {
    const response = await httpClient.get(
      `/v1/user/quickteller/get-biller-payment-items-by-amount`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          billerId,
          amount,
        },
      }
    );
    console.log("Biller payment items:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
export const submitBillPayment = async (paymentData, jwt) => {
  if (!jwt) {
    throw new Error("JWT token not found.");
  }

  const response = await httpClient.post(
    "/v1/user/quickteller/submit-bill-payment",
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
export const savePin = async (pin, confirmPin, jwt) => {
  setAuthHeader(jwt);
  const formData = new FormData();
  formData.append("pin", pin);
  formData.append("confirm_pin", confirmPin);

  try {
    const response = await httpClient.post(
      "/v1/user/vfd/create-new-pin",
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      throw error; // Ensure the caller can handle the 401 error
    } else {
      console.error("Save Pin Error:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        throw new Error("Failed to save pin");
      }
    }
  }
};

export const resetPin = async (pin, confirmPin, jwt) => {
  setAuthHeader(jwt);
  const formData = new FormData();
  formData.append("pin", pin);
  formData.append("confirm_new_pin", confirmPin);

  try {
    const response = await httpClient.post(
      "/v1/user/vfd/reset-billpayment-pin",
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      throw error; // Ensure the caller can handle the 401 error
    } else {
      console.error("Reset Pin Error:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        throw new Error("Failed to reset pin");
      }
    }
  }
};