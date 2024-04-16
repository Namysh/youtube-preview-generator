<script setup>
import { ref, watch, computed, reactive } from "vue";
import Thumbnail from "./components/Thumbnail.vue";
import { getYouTubeVideoData } from "@/api";
import { watchDebounced } from "@vueuse/core";

const imageRef = ref();

const videoIdRegex =
  /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;

const form = reactive({
  url: "https://www.youtube.com/watch?v=XEO3duW1A80",
  progress: 50,
});

const videoData = ref();

watchDebounced(
  () => form.url,
  (newVal) => {
    const videoId = newVal.match(videoIdRegex)?.[5] ?? newVal;

    if (videoId) {
      getYouTubeVideoData(videoId).then((data) => {
        videoData.value = data;
      });
    }
  },
  { immediate: true, debounce: 500 },
);
</script>

<template>
  <div class="flex h-full flex-col items-center gap-6 bg-slate-800 pt-16">
    <Thumbnail
      v-if="videoData?.videoDetails"
      ref="imageRef"
      :title="videoData.videoDetails.title"
      :url="videoData.videoDetails.thumbnail?.thumbnails.at(-1)?.url"
      :views="videoData.microformat.playerMicroformatRenderer.viewCount"
      :length="videoData.microformat.playerMicroformatRenderer.lengthSeconds"
      :upload-date="videoData.microformat.playerMicroformatRenderer.uploadDate"
      :progress="form.progress"
    ></Thumbnail>

    <div
      class="flex w-screen max-w-lg flex-col gap-4 rounded-lg border-2 border-slate-400 bg-slate-500 p-4"
    >
      <label class="flex flex-col gap-1">
        URL de la vidéo
        <input
          v-model="form.url"
          autofocus
          class="rounded-md border p-1 outline-none"
          placeholder="Enter image URL id"
        />
      </label>
      <label class="flex flex-col gap-1">
        Progrès
        <input
          class="rounded-md border p-1 outline-none"
          v-model="form.progress"
          type="number"
          min="0"
          max="100"
          placeholder="Progress"
        />
      </label>
      <button
        v-if="videoData"
        class="inline-flex w-full justify-center rounded-lg bg-slate-800 py-1 font-medium text-white transition-colors hover:bg-slate-800/85"
        @click="imageRef?.download"
      >
        Télécharger
      </button>
    </div>
  </div>
</template>
