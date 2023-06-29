import Swal from "sweetalert2";
export const forgotPassword = () => {
  Swal.fire({
    title: "Enter email address",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Send token",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      fetch("https://api.leverpay.io/api/v1/forgot-password")
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
          console.log(error);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        console.log(result)
        //     {
        //     title: `${result.value.login}'s avatar`,
        //     imageUrl: result.value.avatar_url,
        //   }
      );
    }
  });
};
