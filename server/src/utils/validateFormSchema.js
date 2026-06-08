const allowedFieldTypes = [
  "text",
  "number",
  "select",
];

const validateFormSchema = (fields) => {
  const errors = [];

  if (
    !Array.isArray(fields) ||
    fields.length === 0
  ) {
    errors.push(
      "At least one field is required"
    );

    return errors;
  }

  fields.forEach((field, index) => {
    const {
      label,
      type,
      options,
      multiple,
    } = field;

    if (!label?.trim()) {
      errors.push(
        `Field ${index + 1}: Label is required`
      );
    }

    if (
      !type ||
      !allowedFieldTypes.includes(type)
    ) {
      errors.push(
        `Field ${index + 1}: Invalid field type`
      );
    }

    if (type === "select") {
      if (
        !Array.isArray(options) ||
        options.length === 0
      ) {
        errors.push(
          `Field ${index + 1}: Select field must have options`
        );
      }

      if (
        multiple !== undefined &&
        typeof multiple !== "boolean"
      ) {
        errors.push(
          `Field ${index + 1}: Multiple must be boolean`
        );
      }
    }
  });

  return errors;
};

export default validateFormSchema;