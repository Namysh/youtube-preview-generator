<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { transform } from "@/utils";
import { toPng } from "html-to-image";
import downloadJs from "downloadjs";

const root = ref();

const props = defineProps([
  "title",
  "url",
  "result",
  "views",
  "length",
  "progress",
  "uploadDate",
]);

const videoLength = computed(() => {
  const length = +props.length;
  const duration = dayjs.duration(length * 1000);
  return duration.hours()
    ? duration.format("HH:mm:ss")
    : duration.format("mm:ss");
});

const download = () =>
  toPng(root.value).then((dataUrl) => {
    downloadJs(dataUrl, "thumb.png");
  });

defineExpose({ download });
</script>

<template>
  <div ref="root" class="flex w-[400px] flex-col rounded-[36px] bg-white p-8">
    <div class="relative overflow-hidden rounded-xl">
      <img :src="`https://corsproxy.io/?${url}`" class="w-full" />
      <div
        class="absolute inset-x-0 bottom-0 h-1 bg-[#909090]"
        :style="`--progress: ${progress}%`"
      >
        <div class="h-full w-[var(--progress)] bg-[#f00]"></div>
      </div>
      <span
        class="absolute bottom-1 right-1 rounded-[4px] bg-black/80 px-1 py-[3px] text-xs font-medium leading-none text-white"
        >{{ videoLength }}</span
      >
    </div>
    <p class="mb-1.5 mt-3 break-words text-sm font-medium text-[#0f0f0f]">
      {{ title }}
    </p>
    <span class="text-xs text-[#606060]"
      >{{ transform(views) }} vues<span class="m-1 select-none">•</span
      >{{ dayjs(uploadDate).fromNow() }}</span
    >
  </div>
</template>
