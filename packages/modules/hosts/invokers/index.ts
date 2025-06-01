import { INVOKE_EVENTS } from '@hosts/constants';
import { invoke } from '@knives/bridge';
import { ResponseCode, ResponseResult, isResponseResult } from '@knives/shared';

const setHostsContent = async (content: string): Promise<ResponseResult> => {
  let result = {
    code: ResponseCode.Success,
    message: 'success',
  };

  try {
    const invokeResult = await invoke<ResponseResult>(
      INVOKE_EVENTS.SetHostsContent,
      {
        content,
      },
    );

    if (invokeResult) {
      result = invokeResult;
    }
  } catch (error) {
    if (isResponseResult(error)) {
      result = error;
    } else {
      result = {
        code: ResponseCode.UnknownError,
        message: 'unknown error.',
      };
    }
  }

  return result;
};

export { setHostsContent };
