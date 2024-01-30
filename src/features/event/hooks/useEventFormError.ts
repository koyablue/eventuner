import { useState, useCallback } from "react";
import { NewEventFormValidationError } from "../validation/validators";

/**
 * Custom hook for handling errors of event form
 *
 * @return
 * {
      formErrors: NewEventFormValidationError | undefined;
      setFormErrors: Dispatch<SetStateAction<NewEventFormValidationError | undefined>>;
      getFirstError: (key: keyof NewEventFormValidationError) => string | undefined;
      extractEventDatesErrors: (extractCount: number) => string[];
    }
 */
export const useEventFormError = () => {
  const [formErrors, setFormErrors] = useState<NewEventFormValidationError | undefined>();

  /**
   * Check if the given key has any errors
   *
   * @param {keyof NewEventFormValidationError} key
   * @return {boolean}
   */
  const hasErrors = useCallback((key: keyof NewEventFormValidationError): boolean => {
    if (formErrors && key in formErrors) {
      const error = formErrors[key];
      return error !== undefined;
    }
    return false;
  }, [formErrors]);

  /**
   * Get the first error from the error message array based on the given key
   *
   * @param {keyof NewEventFormValidationError} key
   * @return {(string | undefined)}
   */
  const getFirstError = useCallback((key: keyof NewEventFormValidationError): string | undefined => {
    if (formErrors && key in formErrors) {
      const error = formErrors[key];
      if (error && error.length > 0) {
        return error[0];
      }
    }
  }, [formErrors]);

  const resetErrors = useCallback((key: keyof NewEventFormValidationError) => {
    if (hasErrors(key)) {
      setFormErrors({ ...formErrors, [key]: undefined })
    }
  }, [formErrors, hasErrors]);

  /**
   * Extract eventDates errors from 0 to extractCount
   *
   * @param {number} extractCount
   * @return {string[]}
   */
  const extractEventDatesErrors = useCallback((extractCount: number): string[] => {
    if (!formErrors?.eventDates?.length) return [];
    return formErrors.eventDates.splice(0, extractCount);
  }, [formErrors?.eventDates]);

  return {
    formErrors,
    setFormErrors,
    hasErrors,
    getFirstError,
    resetErrors,
    extractEventDatesErrors,
  }
};
