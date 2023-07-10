import { toast } from "react-toastify";
// import ResetPassword from "../components/ResetPasswordComponent/ResetPassword";
// const URL = "http://api.leverpay.io/api/v1/user/update-user-profile";

export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const signInURL = "https://api.leverpay.io/api/v1/login";
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
          // console.log(res);
          setJwt(`${res.data.token}`);
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

//----------------------------------------- getUserProfile --------------------------------------------------//

export const getUserProfile = async (jwt, setUser) => {
  const getData = "https://api.leverpay.io/api/v1/user/get-user-profile";
  const userProfile = await fetch(getData, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((resData) => {
      setUser(resData.data);
      // toast.success(resData.message);
    })
    .catch((err) => {
      console.log(`${err.data}`);
    });

  return await userProfile;
};

export const updateUserProfile = async (jwt, userDataUpdate) => {
  const updateRes = await fetch(
    "https://api.leverpay.io/api/v1/user/update-user-profile",
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
    "https://api.leverpay.io/api/v1/reset-password",
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
  const logOut = await fetch("https://api.leverpay.io/api/v1/user/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((logoutResponse) => {
      if (logoutResponse.status === 200) return logoutResponse.json();
    })
    .then((logoutData) => {
      toast.success(logoutData.message);
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });

  return await logOut;
};
