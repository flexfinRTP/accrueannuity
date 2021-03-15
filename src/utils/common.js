//makes sure form fields across entire app are not empty
export const validateFields = (fieldsToValidate) => {
    return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};
