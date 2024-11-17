export const messageTypes = ['success', 'info', 'warning', 'error'] as const;

export type MessageType = (typeof messageTypes)[number];

// 创建消息的参数
export interface MessageOptions {
  id: string;
  type: MessageType;
  message: string;
  duration: number;
  icon?: string;
  appendTo: HTMLElement;
  offset: number;
  customClass: string;
  dangerouslyUseHTMLString: boolean;
  showClose: boolean;
  onClose?: () => void;
}

// 用户创建消息的参数
export type UserMessageOptions = Partial<MessageOptions>;

// 传递给组件的参数
export type MessageProps = Omit<MessageOptions, 'appendTo'>;

// 组件触发的事件
export type MessageEmits = (e: 'destroy') => true;

// 消息函数相关
export type UserMessageOptionsWithoutType = Omit<UserMessageOptions, 'type'>;

export type UserMessageParams =
  | UserMessageOptionsWithoutType
  | MessageOptions['message'];

type MessageHandler = () => void;

export type MessageFn = (options?: UserMessageOptions) => MessageHandler;

export type MessageTypedFn = (options?: UserMessageParams) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}

export const messageDefaults: MessageOptions = {
  id: '',
  type: 'info',
  message: '',
  duration: 3000,
  icon: undefined,
  appendTo: document.body,
  offset: 20,
  customClass: '',
  dangerouslyUseHTMLString: false,
  showClose: false,
  onClose: undefined,
};
