import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

import { createForm } from "../services/formService";

function CreateForm() {
  const [title, setTitle] = useState("");

  const [fields, setFields] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const createField = () => ({
    label: "",
    type: "text",
    required: false,
    options: [],
    multiple: false,
  });

  const addField = () => {
    setFields((prev) => [...prev, createField()]);
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];

    updated[index][key] = value;

    setFields(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createForm({
        title,
        fields,
      });

      setTitle("");
      setFields([]);

      alert("Form created successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">
          Create Form
        </h1>

        {error && ( 
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6">
            <label className="block font-medium mb-2">
              Form Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
              placeholder="Job Application"
            />
          </div>

          {/* Fields */}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className=" flex justify-between mb-4">
                  <h3 className="font-semibold">
                    Field #{index + 1}
                  </h3>

                  <button type="button" onClick={() => removeField(index)}>
                    <Trash2 size={18} className="text-red-500"/>
                  </button>
                </div>

                {/* Label */}

                <input
                  type="text"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-3"
                />

                {/* Type */}

                <select
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-3"
                >
                  <option value="text">Text</option>

                  <option value="number">Number</option>

                  <option value="select">Select</option>
                </select>

                {/* Required */}

                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(index, "required", e.target.checked)
                    }
                  />
                  Required
                </label>

                {/* Select Options */}

                {field.type === "select" && (
                  <>
                    <textarea
                      placeholder="One option per line"
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-3"
                      onChange={(e) =>
                        updateField( index, "options", e.target.value.split("\n").filter(Boolean),)
                      }
                    />

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.multiple}
                        onChange={(e) =>
                          updateField(index, "multiple", e.target.checked)
                        }
                      />
                      Multiple Select
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={addField}
              className="px-5 py-3 rounded-lg border border-slate-300 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Field
            </button>

            <button
              disabled={loading}
              type="submit"
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {loading ? "Saving..." : "Save Form"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateForm;
