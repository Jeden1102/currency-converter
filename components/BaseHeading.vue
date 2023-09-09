<template>
  <header>
    <div class="heading flex gap-6">
      <h1 class="text-2xl text-center dark:text-gray-100">
        Currency converter
      </h1>
      <button class="ml-auto" @click="toggleDarkMode">
        <Icon class="dark:text-gray-100" name="heroicons-solid:sun"
          v-if="darkMode" />
        <Icon name="heroicons-solid:moon" v-else />
      </button>
      <button>
        <Icon class="dark:text-gray-100" name="heroicons-solid:document-search" />
      </button>
    </div>
    <h2 class="text-xl font-light my-4 dark:text-gray-100">
      Check live rates, set rate alerts, receive notifications and more.
    </h2>
  </header>
</template>

<script setup lang="ts">
const darkMode = ref(false);
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  document.body.classList.toggle("dark");
  localStorage.setItem("currency_mode", JSON.stringify(darkMode.value));
}
onMounted(() => {
  document.querySelector("html")?.classList.remove("dark");
  if (localStorage.getItem("currency_mode")) {
    const modeString = localStorage.getItem("currency_mode");

    let mode: string | null = null;

    if (modeString !== null) {
      mode = JSON.parse(modeString);
    }
    if (mode) {
      toggleDarkMode();
    }
  }
});
</script>
