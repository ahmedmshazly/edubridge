export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Removed the unnecessary escape character before the square bracket
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*()_+\-=\[\]{};':"|,.<>?~]{8,}$/;
  console.log(password, regex.test(password));
  return regex.test(password);
};


export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{4,20}$/;
  return regex.test(username);
};