const generateAnalytics = (form, responses) => {
  const analytics = {
    totalSubmissions: responses.length,

    numberFields: {},

    selectFields: {},
  };

  form.fields.forEach((field) => {
    /* Number Fields */
    if (field.type === "number") {
      let sum = 0;
      let count = 0;

      responses.forEach((response) => {
        const value = response.answers.get(field.label);

        if (value !== undefined && !isNaN(value)) {
          sum += Number(value);

          count++;
        }
      });

      analytics.numberFields[field.label] = {
        average: count > 0 ? Number((sum / count).toFixed(2)) : 0,
      };
    }

    /* Select Fields */
    if (field.type === "select") {
      const counts = {};

      responses.forEach((response) => {
        const value = response.answers.get(field.label);

        if (value === undefined) return;

        if (field.multiple) {
          value.forEach((option) => {
            counts[option] = (counts[option] || 0) + 1;
          });
        } else {
          counts[value] = (counts[value] || 0) + 1;
        }
      });

      analytics.selectFields[field.label] = counts;
    }
  });

  return analytics;
};

export default generateAnalytics;
