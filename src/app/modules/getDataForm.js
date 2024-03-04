export const getDataForm = (form) => {
  const dataForm = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    dataForm[key] = value;
  }

  return dataForm;
};

//Función para insertar datos en los campos de entrada de un formulario
export const insertDataToForm = (form, editData) => {
  const formChildrens = Array.from(form.children);
  formChildrens.forEach((element) => {
    if (element.getAttribute("name")) {
      const key = element.getAttribute("name");
      element.value = editData[key];
    }
  });
};