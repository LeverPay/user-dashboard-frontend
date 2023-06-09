import { toast } from "react-toastify";
const URL = "http://api.leverpay.io/api/v1/user/signup";

export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const signInURL = "http://api.leverpay.io/api/v1/login";
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
          console.log(res);
          setJwt(`${res.data.token}`);
          //transition to homepage
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          toast.error(`${res.message}`);
          console.log(res);
        }
      })
      .catch((err) => {
        toast.error(err);
      });

    return await response;
  }
};

//getUserProfile

export const getUserProfile = async (jwt, setUser) => {
  const getData = "http://api.leverpay.io/api/v1/user/get-user-profile";
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
    })
    .catch((err) => {
      console.log(`${err.message}`);
    });

  return await userProfile;
};

export const signUp = async (userData) => {
  const response = await fetch(URL, {
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
        console.log(res);
      } else {
        if (
          userData.first_name.length === 0 &&
          userData.last_name.length === 0
        ) {
          toast.error(`${res.data.first_name}`);
          toast.error(`${res.data.last_name}`);
        } else {
          toast.error(`${res.data.email}`);
        }
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return await response;
};
