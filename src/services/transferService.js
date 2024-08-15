import { toast } from "react-toastify";
import axios from "axios";

const baseURL = "https://leverpay-api.azurewebsites.net/api";

const httpClient = axios.create({
  baseURL,
});

const setAuthHeader = (jwt) => {
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

export const getReceiverDetails = async (email, jwt) => {
  setAuthHeader(jwt);

  try {
    const response = await httpClient.post("v1/user/search-user", email);
    if (response.data.success) {
      const receiverData = response.data.data[0];

      return receiverData;
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

export const makeTransferRequest = async (transferData, jwt) => {
  setAuthHeader(jwt);
  // {
  //   "success": true,
  //   "data": {
  //     "amount": "10",
  //     "uuid": "20cbf8d5-23f6-46aa-848c-e69a41146568",
  //     "updated_at": "2024-08-14T11:23:05.000000Z",
  //     "created_at": "2024-08-14T11:23:05.000000Z"
  //   },
  //   "message": "OTP sent"
  // }

  toast.dismiss();

  try {
    const response = await httpClient.post("/v1/user/transfer", transferData);

    if (response.data.success) {
      // Handle successful response
      toast.success(response.data.message || "Transfer successful! OTP sent");

      // Store data in localStorage
      localStorage.setItem("transferData", JSON.stringify(response.data.data));

      return true;
    } else {
      // Handle unsuccessful response with a custom message
      toast.error(response.data.message || "Transfer failed.");
      return false;
    }
  } catch (error) {
    // Handle any errors that occur during the request
    toast.dismiss();

    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(
        `Error: ${error.response.data.message || "Something went wrong"}`
      );
    } else if (error.request) {
      // Request was made but no response was received
      toast.error("No response from the server. Please try again later.");
    } else {
      // Something else happened in making the request
      toast.error(`Error: ${error.message}`);
    }
  }
};

export const verifytransferOtp = async ({ uuid, otp }, jwt) => {
  setAuthHeader(jwt);

  const idData = {
    uuid: uuid,
    otp: otp,
  };

  try {
    const response = await httpClient.post("/v1/user/verify-transfer", idData);
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

export const fetchTransactions = async (jwt) => {
  setAuthHeader(jwt);

  try {
    const response = await httpClient.get("/v1/user/get-user-transactions");
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

export const resendOtp = async (email) => {
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
