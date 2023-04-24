<script setup lang="ts">
import "locomotive-scroll/dist/locomotive-scroll.css";
import { nextTick, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useI18n } from "vue-i18n";
import SwipeIndicator from "./SwipeIndicator.vue";
import { token } from "./token";

gsap.registerPlugin(ScrollTrigger);
const { t } = useI18n();

ScrollTrigger.config({});

let getRatio = (el: HTMLElement) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

const queryParams = new URLSearchParams(window.location.search);
const showSwipeIndicator = ref(false);
const name = token?.first_name ?? queryParams.get("name") ?? "";
const isMale = token?.gender === "male";

onMounted(() => {
  gsap.utils.toArray<HTMLElement>(".plx-container").forEach((...args) => {
    gsapBg(...args);
    gsapClippedImage(...args);
  });
  const initialTimeline = gsap
    .timeline()
    .delay(0.1)
    .fromTo("#first-bg", { opacity: 0 }, { opacity: 1, duration: 1 });
  initialTimeline.play();
  setTimeout(() => (showSwipeIndicator.value = true), 2000);
  gsap.utils.toArray<HTMLElement>(".plx-container").forEach((...args) => {
    gsapBg(...args);
    gsapClippedImage(...args);
  });
});

const safeParseFloat = (str: string | null): number | null => {
  if (!str) return null;
  const parsed = parseFloat(str);
  if (isNaN(parsed)) return null;
  if (parsed == null) return null;
  return parsed;
};

const gsapBg = (section: HTMLElement, i: number, array: HTMLElement[]) => {
  const bg = section.querySelectorAll<HTMLElement>(".plx");
  if (bg == null) return;
  gsap.fromTo(
    bg,
    {
      yPercent: (_, el: HTMLElement) =>
        -(safeParseFloat(el.getAttribute("data-speed")) ?? 20),
    },
    {
      yPercent: (_, el: HTMLElement) =>
        safeParseFloat(el.getAttribute("data-speed")) ?? 20,
      ease: "none",
      scrollTrigger: {
        scroller: "#scrolltrigger-root",
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
};

const gsapClippedImage = (
  section: HTMLElement,
  i: number,
  array: HTMLElement[]
) => {
  const el = section.querySelector<HTMLElement>(".plx-clip");
  if (el == null) return;
  gsap.fromTo(
    el,
    { backgroundPositionX: () => (el.offsetWidth / 2) * 0.5 + "px" },
    {
      backgroundPositionX: () => -(el.offsetWidth / 2) + "px",
      ease: "none",
      scrollTrigger: {
        scroller: "#scrolltrigger-root",
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
};
</script>

<template>
  <div
    style="-webkit-transform: translate3d(0, 0, 0)"
    id="scrolltrigger-root"
    class="snap-y snap-mandatory snap-always overflow-y-scroll overflow-x-hidden safe-h-screen hide-scrollbar font-['Work_Sans'] text-[#FEECD0] text-2xl max-w-screen-sm mx-auto"
  >
    <div
      class="plx-container snap-center snap-always bg-[#422E1C] w-full safe-h-screen overflow-hidden relative -z-1"
    >
      <div class="relative" id="first-bg">
        <div
          class="absolute plx top-0 left-0 w-full h-[120vh] bg-[top_left_-2.5rem] bg-origin bg-cover bg-[url('/images/sotm_pattern_1.png')] opacity-5"
        ></div>
      </div>
      <div class="flex flex-col w-full safe-h-screen">
        <div
          class="mt-32 flex-1 px-12 flex flex-col w-full justify-center items-center"
        >
          <transition appear appear-active-class="fade-enter-active">
            <div class="intro pr-6">
              <p
                id="dear"
                class="font-serif tracking-wider italic text-3xl mb-8"
              >
                {{
                  isMale ? t("greeting.kjæreGutt") : t("greeting.kjæreJente")
                }}
                {{ name }}
              </p>
              <p id="hjerteligVelkommen" class="tracking-wide">
                {{ t("greeting.hjerteligVelkommen") }}
              </p>
            </div>
          </transition>
        </div>
        <div class="my-8 w-full" style="padding-bottom: 100px">
          <div class="relative flex justify-end pointer-events-none -z-5">
            <img
              src="https://static.bcc.media/images/pc23/nonexisting.png"
              class="pl-8 select-none"
              style="min-width: 100%"
            />
          </div>
        </div>
      </div>
      <div
        v-if="showSwipeIndicator"
        class="absolute plx bottom-0 pb-16 w-full flex flex-col items-center justify-center text-sm tracking-widest font-bold"
        data-speed="-100"
      >
        <SwipeIndicator />
      </div>
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#B16B35] w-full safe-h-screen overflow-hidden"
    >
      <div class="relative">
        <div
          class="absolute plx top-0 left-0 w-full h-[120vh] bg-[top_left_-2.5rem] bg-origin bg-cover bg-[url('/images/disse_mine_ord_pattern.png')]"
        ></div>
      </div>
      <div class="h-screen pb-10 flex flex-col items-center justify-center">
        <div class="py-12 px-12 plx" data-speed="20">
          <div class="mb-14 indent-6" v-html="t('greeting.duKanGlede')"></div>
          <div class="indent-6" v-html="t('greeting.denneCampenEr')"></div>
        </div>
      </div>
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#BDDABB] text-[#536C5B] w-full safe-h-screen overflow-hidden relative -z-20"
    >
      <div
        class="plx absolute bottom-0 w-full px-10 pb-20 -z-10"
        data-speed="50"
      >
        <div class="plx-clip w-full sotm-clip-1 aspect-[1.1] bg-center"></div>
        <svg class="svg absolute top-0 left-0">
          <clipPath id="sotm-clip-path" clipPathUnits="objectBoundingBox">
            <path
              d="M0.644,0 C0.391,0,0.172,0.186,0.117,0.448 L0,1 H0.877 L0.991,0.462 C1,0.225,0.872,0,0.644,0"
            ></path>
          </clipPath>
        </svg>
      </div>
      <div class="safe-h-screen pb-12 flex flex-col items-center justify-start">
        <div class="py-20 px-12">
          <div class="mb-14">
            <span class="bg-[#BDDABB] bg-opacity-75">
              {{ t("greeting.gjennomDeSiste") }}
              {{ t("greeting.ogHarFåttEt") }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#7E873B] text-[#D6DBAD] w-full safe-h-screen overflow-hidden relative -z-20"
    >
      <div class="plx absolute top-0 w-full px-10 pt-24 -z-10" data-speed="50">
        <div
          class="plx-clip w-full sotm-clip-2 aspect-[1.1] bg-[url('/images/camp_moment.jpg')] bg-center"
        ></div>
        <svg class="svg absolute top-0 left-0">
          <clipPath id="sotm-clip-path-2" clipPathUnits="objectBoundingBox">
            <path
              d="M 0.356 1 C 0.609 1 0.828 0.814 0.883 0.552 L 1 0 H 0.123 L 0.009 0.538 C 0 0.775 0.128 1 0.356 1"
            ></path>
          </clipPath>
        </svg>
      </div>
      <div class="safe-h-screen flex flex-col justify-start">
        <div style="flex-basis: 100vw" class="shrink"></div>
        <div style="flex-basis: 300px" class="pt-20 pb-24 px-12">
          <span class="bg-[#7E873B] bg-opacity-75">
            {{ t("greeting.nårDuEr") }}
          </span>
        </div>
      </div>
      <!-- <div class="absolute bottom-[25%]">
        <div class="px-12">
          <div class="">
            <span class="bg-[#7E873B] bg-opacity-75">
              {{ t("greeting.nårDuEr") }}
            </span>
          </div>
        </div>
      </div> -->
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#422E1C] w-full safe-h-screen overflow-hidden"
    >
      <div class="relative">
        <div
          class="absolute plx top-0 left-0 w-full h-[120vh] bg-[top_left_-2.5rem] bg-origin bg-cover bg-[url('/images/sotm_pattern_1.png')] opacity-5"
        ></div>
      </div>
      <div class="safe-h-screen flex flex-col items-center justify-center">
        <div class="py-12 px-10 plx" data-speed="20">
          <div
            class="mb-24 pr-2 indent-6"
            v-html="t('greeting.menVærFattig')"
          ></div>
          <div class="ml-16 indent-6" v-html="t('greeting.daVilTrangen')"></div>
        </div>
      </div>
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#536C5B] text-[#BDDABB] w-full safe-h-screen overflow-hidden"
    >
      <div class="relative">
        <div
          class="absolute plx top-0 left-0 w-full h-[120vh] bg-[top_left_-2.5rem] bg-origin bg-cover bg-[url('/images/sotm_pattern_2.png')]"
        ></div>
      </div>
      <div class="safe-h-screen flex flex-col items-center justify-center">
        <div class="py-12 pb-32 px-10">
          <div class="pr-2 font-bold">"{{ t("greeting.saligeErDe") }}"</div>
          <div class="pr-2 italic font-serif">
            {{ t("greeting.matteus56") }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="plx-container snap-center snap-always bg-[#F09C44] w-full safe-h-screen overflow-hidden relative -z-10"
    >
      <div class="relative">
        <div
          class="absolute plx top-0 left-0 w-full h-[120vh] bg-[top_left_-2.5rem] bg-origin bg-cover bg-[url('/images/sotm_pattern_1.png')] opacity-30 -z-10"
        ></div>
      </div>
      <div class="absolute bottom-0 right-0 max-w-[400px] w-full pb-14 -z-10">
        <img
          src="https://static.bcc.media/images/pc23/nonexisting.png"
          class="pl-8 select-none"
          style="min-width: 100%"
        />
      </div>
      <div class="safe-h-screen flex flex-col items-center justify-center">
        <div class="py-12 pb-32 px-10">
          <div class="pr-2 font-bold">
            {{
              isMale
                ? t("greeting.detKommerTil-Gutt")
                : t("greeting.detKommerTil-Jente")
            }}
            {{ name }}.
          </div>
          <div class="mt-4 pr-2 italic font-serif">
            <!--{{ t("greeting.dinBror") }},<br />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #422e1c;
}
.red {
  background-color: red;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.sotm-clip-1 {
  background-image: url("/images/storm.jpg");
  background-repeat: no-repeat;
  background-color: rgb(50, 61, 70);
  background-size: 120vw;
  clip-path: url(#sotm-clip-path);
  -webkit-clip-path: url(#sotm-clip-path);
}
.sotm-clip-2 {
  background-repeat: no-repeat;
  background-color: rgb(50, 61, 70);
  background-size: 120vw;
  clip-path: url(#sotm-clip-path-2);
  -webkit-clip-path: url(#sotm-clip-path-2);
}

.safe-h-screen {
  /* equivalent to 100dvh in major browsers */
  height: calc(
    100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0)
  );
}

.fade-enter-active {
  animation: go 3s cubic-bezier(0, 0, 0.28, 1);
}

@keyframes go {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@supports (-webkit-touch-callout: none) {
  .safe-h-screen {
    /* for ios safari 15, safe-area-inset-bottom is 0, so a special fix apply here */
    height: -webkit-fill-available;
  }
}
</style>
