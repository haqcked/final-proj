function CollectionValidation(values) {
  let error = {}

  if(values.title === "") {
    error.title = "Enter title."
  } else {
    error.title = ""
  }

  if (values.description === "") {
    error.description = "Enter your description.";
  } else if (values.description.length > 255) {
    error.description = "Description cannot exceed 255 characters.";
  } else {
    error.description = "";
  }

  return error;
}

export default CollectionValidation;
