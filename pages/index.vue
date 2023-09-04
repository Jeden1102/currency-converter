<template>
  <div>
    <h1 class="bg-red-200">test</h1>
    <div class="box w-20 h-20 bg-red-300"></div>
    <div class="box-2 w-[130px] h-[130px] bg-green-300">
      {{ indexStore.isMenuOverlay }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "../store/index";
const indexStore = useIndexStore();
</script>
