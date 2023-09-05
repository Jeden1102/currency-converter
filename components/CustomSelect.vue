<template>
  <div class="custom-select">
    <button class="custom-select--dropdown">
      {{ filteredValue ? filteredValue : placeholder }}
    </button>
    <input
      v-model="filteredValue"
      class="custom-select--search"
      type="text"
      @keydown="filterResults"
    />
    <button
      class="custom-select--option"
      v-for="option in options"
      @click="selectOption(option.key)"
    >
      {{ option.value }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface option {
  key: string;
  value: string;
  image?: string;
}
const props = defineProps({
  options: { type: Array<option>, required: true },
  placeholder: { type: String, required: true },
});
const filteredValue = ref("");
function filterResults() {}
function selectOption(key: string) {
  console.log(key);
}
</script>

<style scoped>
</style>