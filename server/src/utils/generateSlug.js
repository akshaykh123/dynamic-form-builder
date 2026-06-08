import slugify from "slugify";

const generateSlug = (title) => {
  const randomString = Math.random().toString(36).substring(2, 8);

  return `${slugify(title, {
    lower: true,
    strict: true,
  })}-${randomString}`;
};

export default generateSlug;
