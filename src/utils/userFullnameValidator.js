const userFullnameValidator = (userFullname) => {
  let valid;
  if (userFullname !== "") {
    if (userFullname.length >= 3 && userFullname.length <= 32) {
      valid = true;
    } else {
      valid = false;
    }
  } else {
    valid = false;
  }
  return valid;
};

export default userFullnameValidator;
