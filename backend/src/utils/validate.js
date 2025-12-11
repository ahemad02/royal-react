export const validateContact = (data) => {
  const { fullName, email, phone,occupation, subject, message } = data;

  if ([fullName, email, phone, occupation, subject, message].some((item) => item?.trim() === "")) {
    return "All fields are required.";
  }

  return null;
};
