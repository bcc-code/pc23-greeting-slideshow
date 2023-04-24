<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.fromTo(".arrow", { y: 0 }, { y: -30, duration: 1 });
  tl.play();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center arrow">
    <div class="">
      <svg
        style="transform: rotate(180deg)"
        width="24"
        height="9"
        viewBox="0 0 24 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L12 7.5L23 1"
          stroke="#FEECD0"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        style="transform: rotate(180deg)"
        width="24"
        height="9"
        viewBox="0 0 24 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L12 7.5L23 1"
          stroke="#FEECD0"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div>Swipe</div>
  </div>
</template>
