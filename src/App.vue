<script setup lang="ts">
import { ref } from "vue";
import Greeting from "./Greeting.vue";

function preloadImage(url: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(url);
    };
    img.onerror = function (err) {
      reject(err);
    };
  });
}
const imagesLoaded = ref(false);
const initialImageLoad = Promise.allSettled(
  [
    "https://static.bcc.media/images/pc23/nonexisting.png",
    "/images/sotm_pattern_1.png",
  ].map(preloadImage)
);

[
  "/images/sotm_pattern_2.png",
  "/images/disse_mine_ord_pattern.png",
  "camp_moment.jpg",
  "storm.jpg",
].map(preloadImage);

Promise.any([new Promise((r) => setTimeout(r, 1000)), initialImageLoad]).then(
  () => {
    imagesLoaded.value = true;
  }
);
</script>

<template>
  <div
    v-if="!imagesLoaded"
    class="safe-h-screen w-full flex items-center justify-center text-white"
  >
    <div>Loading...</div>
  </div>
  <Greeting v-else></Greeting>
</template>
