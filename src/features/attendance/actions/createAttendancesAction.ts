"use server";

export const createAttendancesAction = async (formData: FormData) => {
  // TODO: validation

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  // TODO: store
};
