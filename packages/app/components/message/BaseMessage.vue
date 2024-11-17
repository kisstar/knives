<template>
  <Transition
    enter-from-class="-translate-y-1/2 opacity-0"
    enter-active-class="transition duration-500"
    leave-to-class="-translate-y-1/2 opacity-0"
    leave-active-class="transition duration-500"
    @before-leave="onClose"
    @after-leave="emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      class="fixed left-1/2 -translate-x-1/2 z-[2000]"
      :class="customClass"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <v-alert
        :model-value="true"
        :type="type"
        :icon="icon"
        :closable="showClose"
        @click:close="close"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-if="dangerouslyUseHTMLString" v-html="message"></p>
        <p v-else>
          {{ message }}
        </p>
      </v-alert>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, onMounted, ref } from 'vue';
import {
  useEventListener,
  useResizeObserver,
  useTimeoutFn,
} from '@vueuse/core';
import { EVENT_CODE } from '@knives/shared';
import { getLastInstanceOffset } from '@app/components/message/instance';
import type { MessageProps, MessageEmits } from '@app/components/message/base';

const props = defineProps<MessageProps>();
const emit = defineEmits<MessageEmits>();

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
const height = ref(0);
const offsetTop = computed(() => {
  return props.offset + getLastInstanceOffset(props.id);
});
const bottom = computed((): number => height.value + offsetTop.value); // 底边距离顶部的距离，用于下一条信息计算位置
const customStyle = computed<CSSProperties>(() => ({
  top: `${offsetTop.value}px`,
}));

let stopTimer: (() => void) | undefined = undefined;

function startTimer() {
  if (props.duration === 0) return;

  ({ stop: stopTimer } = useTimeoutFn(() => {
    close();
  }, props.duration));
}

function clearTimer() {
  stopTimer?.();
}

function close() {
  visible.value = false;
}

function keydown({ code }: KeyboardEvent) {
  if (code === EVENT_CODE.esc) {
    // press esc to close the message
    close();
  }
}

onMounted(() => {
  startTimer();
  visible.value = true;
});
useEventListener(document, 'keydown', keydown);
useResizeObserver(messageRef, () => {
  height.value = messageRef.value?.getBoundingClientRect().height || 0;
});
defineExpose({
  visible,
  bottom,
  close,
});
</script>
