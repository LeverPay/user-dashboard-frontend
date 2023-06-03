import { toast } from "react-toastify";
const URL = "http://api.leverpay.io/api/v1/user/signup";

export const signIn = async (userData, jwt, setJwt) => {
  if (!jwt) {
    const response = await fetch("http://api.leverpay.io/api/v1/login", {
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
          // console.log(res.data);
          setJwt([res.data]);
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
