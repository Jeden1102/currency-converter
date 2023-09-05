<template>
  <div class="w-full bg-gray-50 rounded-sm p-3 dark:bg-gray-300 flex flex-col">
    <div class="box-to-convert font-light pb-4">
      <p class="text-sm">Amount</p>
      <CustomSelect :options="options" placeholder="Pick a value..." />
    </div>
    <div class="exchange-box flex items-center relative">
      <button
        class="rounded-full w-10 h-10 bg-gray-500 border border-gray-600 hover:bg-gray-600 cursor-pointer mx-auto relative"
      ></button>
    </div>

    <div class="box-to-convert border-b-gray-300 font-light pt-4">
      <p class="text-sm">Converted amount</p>
    </div>
    <div class="shadow-md p-2 rounded-sm">
      <p class="text-sm font-light mt-6">Indicated exchange rate</p>
      <p>1 USD = 1.22 EUR</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface optionInterface {
  key: string;
  value: string;
  image?: string;
}
const options: Array<optionInterface> = [
  { key: "PL", value: "Poland" },
  { key: "GER", value: "Germany" },
];
</script>

<style>
.exchange-box::before {
  content: "";
  left: 0;
  bottom: 50%;
  width: 100%;
  position: absolute;
  height: 2px;
  background: rgb(206, 206, 206);
}
</style>