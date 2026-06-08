import Form from "../models/Form.js";
import generateSlug from "../utils/generateSlug.js";
import validateFormSchema from "../utils/validateFormSchema.js";

export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const errors = validateFormSchema(fields);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const slug = generateSlug(title);

    const form = await Form.create({
      title,
      slug,
      fields,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().populate("createdBy", "name email").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFormBySlug = async (req, res) => {
  try {
    const form = await Form.findOne({
      slug: req.params.slug,
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
