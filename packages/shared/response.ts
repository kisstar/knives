export const enum ResponseCode {
  Success = 656,
  FileNotFound,
  PermissionDenied,
  UnknownError,
}

export interface ResponseResult {
  code: ResponseCode;
  message: string;
}

export function createResponseResult(
  code: ResponseCode,
  message: string,
): ResponseResult {
  return {
    code,
    message,
  };
}

export function isResponseResult(result: unknown): result is ResponseResult {
  return (
    typeof result === 'object' &&
    result !== null &&
    Object.prototype.hasOwnProperty.call(result, 'code') &&
    Object.prototype.hasOwnProperty.call(result, 'message')
  );
}
