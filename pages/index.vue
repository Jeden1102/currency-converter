<template>
  <div
    class="bg-gray-100 flex justify-center items-center min-h-[100vh] dark:bg-gray-500"
  >
    <main
      class="w-11/12 sm:w-3/4 md:w-1/2 bg-gray-200 p-4 rounded-md shadow-lg dark:bg-gray-600"
    >
      <BaseHeading />
      <ExchangeBox />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "../store/index";
const indexStore = useIndexStore();
</script>
