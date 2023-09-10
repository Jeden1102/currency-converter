<template>
  <div
    class="custom-select relative w-fit bg-gray-100 p-2 h-12 rounded-sm shadow-sm border b-black dark:bg-gray-200 flex text flex-1 w-1/2">
    <button
      class="custom-select__dropdown relative whitespace-nowrap  overflow-hidden text-ellipsis pr-6 w-full text-left"
      @click="dropdownVisible = !dropdownVisible">
      {{ selectedOption.value ? selectedOption.value : placeholder }}
      <Icon
        class="text-gray-600 absolute top-1/2 right-1 translate-y-[-50%] pointer-events-none"
        :class="{ active: dropdownVisible }"
        name="heroicons:chevron-down-solid" />
    </button>
    <Transition name="slide-fade">
      <div
        class="custom-select__dropdown absolute top-[100%] left-0 z-10 flex flex-col bg-white p-2 b-gray-200 shadow-md max-h-60 overflow-auto"
        v-if="dropdownVisible">
        <div class="custom-select__search-box relative">
          <Icon class="ext-gray-600 absolute top-1/2 left-2 translate-y-[-50%]"
            name="heroicons-solid:search" />
          <input v-model="filteredValue"
            class="custom-select__search bg-gray-100 border b-gray-400 rounded-sm h-8 pl-8"
            type="text" placeholder="Search..." />
        </div>

        <div class="custom-select__options flex flex-col items-start">
          <button
            class="custom-select__option pl-2 py-2 hover:bg-gray-200 w-full text-left"
            v-for="option in filteredOptions" @click="selectOption(option)">
            {{ option.value }}
          </button>
        </div>
        <span class="my-2 font-light" v-if="filteredOptions.length === 0">No
          results</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface option {
  key?: string;
  value?: string;
}
const props = defineProps({
  options: { type: Array<option>, required: true },
  placeholder: { type: String, required: true },
  id: { type: String, required: true },
});
const dropdownVisible = ref(false);
const filteredValue = ref("");
const selectedOption = ref<option>({});
const emit = defineEmits(['optionSelected'])
function selectOption(option: option) {
  dropdownVisible.value = false;
  selectedOption.value = option;
  emit('optionSelected', { option, id: props.id });
}
function exposeValue(option) {
  selectedOption.value = option.option;
}
defineExpose({
  exposeValue
});
const filteredOptions = computed(() => {
  if (!filteredValue.value) return props.options;
  return props.options.filter(
    (option) =>
      option.key.includes(filteredValue.value.toUpperCase()) ||
      option.value.toUpperCase().includes(filteredValue.value.toUpperCase())
  );
});
onMounted(() => {
  document.addEventListener("click", (ev) => {
    if (dropdownVisible.value === false) return;
    const targetElement = ev.target as Element;
    if (
      !targetElement.classList.contains("custom-select__search") &&
      !targetElement.classList.contains("custom-select__dropdown")
    ) {
      dropdownVisible.value = false;
    }
  });
});
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.custom-select {
  &__dropdown {
    svg {
      transition: transform 0.3s;

      &.active {
        transform: rotate(180deg) translateY(50%);
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>