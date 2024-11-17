import { createApp, render, type App } from 'vue';
import { isString } from 'lodash-es';
import vuetify from '@app/plugins/vuetify';
import {
  type MessageOptions,
  type UserMessageOptions,
  type UserMessageParams,
  type MessageFn,
  type Message,
  messageDefaults,
  messageTypes,
} from '@app/components/message/base';
import { instances } from '@app/components/message/instance';
import MessageConstructor from '@app/components/message/BaseMessage.vue';

let seed = 1;

const closeMessage = (instance: App) => {
  const idx = instances.indexOf(instance);

  if (idx === -1) return;

  instance._instance?.exposed?.close();
  instances.splice(idx, 1);
};

const createMessage = ({ appendTo, ...options }: MessageOptions) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = document.createElement('div');
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(app);
    },
    onDestroy: () => {
      render(null, container);
    },
  };
  const app = createApp(MessageConstructor, props);

  app.use(vuetify).mount(container);
  appendTo.appendChild(container.firstElementChild as HTMLElement);

  return { app };
};

export const message: MessageFn & Partial<Message> = (
  options: UserMessageOptions = {},
) => {
  const { app } = createMessage({ ...messageDefaults, ...options });
  const handler = () => app._instance?.exposed?.close();

  instances.push(app);

  return handler;
};

messageTypes.forEach((type) => {
  message[type] = (options: UserMessageParams = {}) => {
    if (isString(options)) {
      return message({ type, message: options });
    }

    return message({ ...options, type });
  };
});
