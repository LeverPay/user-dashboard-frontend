import Swal from "sweetalert2";
export const forgotPassword = () => {
  Swal.fire({
    title: "Enter email address",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Request token",
    showLoaderOnConfirm: true,
    preConfirm: async (email) => {
      const passResponse = await fetch(
        "https://api.leverpay.io/api/v1/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
      return await passResponse;
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: result.value,
        text: `Please check your inbox for a password reset token`,
      });

      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 3000);
    }
  });
};
