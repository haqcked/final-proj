function CollectionValidation(values) {
  let error = {}

  if(values.title === "") {
    error.title = "Enter title"
  } else {
    error.title = ""
  }

  if(values.description === "") {
    error.description = "Enter your description"
  } else {
    error.description = ""
  }
  return error;
}

export default CollectionValidation;
