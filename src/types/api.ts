import { NextResponse } from "next/server";

export type ApiSuccessResponse<T> = {
  message: string
  data: T
};

export type ApiErrorResponse = {
  message: string
  error: unknown
};

export type ApiValidationErrorResponse<T> = {
  message: string
  validationErrors: T
}

export type ApiHandlerResponse<TResponseData, TValidationErrors> =
  | NextResponse<ApiSuccessResponse<TResponseData>>
  | NextResponse<ApiErrorResponse>
  | NextResponse<ApiValidationErrorResponse<TValidationErrors>>;
