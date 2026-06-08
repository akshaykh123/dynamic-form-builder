import Form from "../models/Form.js";
import Response from "../models/Response.js";

import generateAnalytics from "../utils/analyticsHelper.js";

export const getAnalytics = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const responses = await Response.find({
      formId,
    });

    const analytics = generateAnalytics(form, responses);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
