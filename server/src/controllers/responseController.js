import Form from "../models/Form.js";
import Response from "../models/Response.js";

import validateResponse from "../utils/validateResponse.js";

export const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;

    const { answers } = req.body;

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const errors = validateResponse(form.fields, answers);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const response = await Response.create({
      formId,
      answers,
    });

    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResponses = async (req, res) => {
  try {
    const { formId } = req.params;

    const responses = await Response.find({
      formId,
    }).sort({
      submittedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
