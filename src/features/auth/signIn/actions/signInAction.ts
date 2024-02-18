"use server";

export type SignInFormState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
};

export const signInAction = async (prevState: SignInFormState, formData: FormData) => {
  console.log(formData.get("email"));
  console.log(formData.get("password"));

  return prevState;
};