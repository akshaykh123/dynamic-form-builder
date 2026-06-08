const validateResponse = (formFields, answers) => {
  const errors = [];

  formFields.forEach((field) => {
    const value = answers[field.label];

    /* Required Validation */
    if (
      field.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push(`${field.label} is required`);

      return;
    }

    /* Skip remaining checks if value not provided */
    if (value === undefined || value === null || value === "") {
      return;
    }

    /* Number Validation */
    if (field.type === "number" && isNaN(Number(value))) {
      errors.push(`${field.label} must be a number`);
    }

    /* Select Validation */
    if (field.type === "select") {
      if (field.multiple) {
        if (!Array.isArray(value)) {
          errors.push(`${field.label} must be an array`);

          return;
        }

        const invalidOptions = value.filter(
          (option) => !field.options.includes(option),
        );

        if (invalidOptions.length > 0) {
          errors.push(`${field.label} contains invalid options`);
        }
      } else {
        if (!field.options.includes(value)) {
          errors.push(`${field.label} contains invalid option`);
        }
      }
    }
  });

  return errors;
};

export default validateResponse;
