export const getDataForm = (form) => {
  const dataForm = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    dataForm[key] = value;
  }

  return dataForm;
};
