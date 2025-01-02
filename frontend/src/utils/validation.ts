export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

export const validateName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 50;
};