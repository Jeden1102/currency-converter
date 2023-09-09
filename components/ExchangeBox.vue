<template>
  <div class="w-full bg-gray-50 rounded-sm p-3 dark:bg-gray-300 flex flex-col">
    <div class="box-to-convert font-light pb-4">
      <p class="text-sm font-light mb-2">Amount</p>
      <div class="flex justify-between gap-4">
        <CustomSelect @optionSelected="selected" v-if="data" :options="data.data"
          id="from" placeholder="Choose a currency..." />
        <input type="number" v-model="conversion.fromAmount"
          class="pl-2 bg-gray-100 dark:bg-gray-200 w-1/2 border border-gray-200">
      </div>
    </div>
    <div class="exchange-box flex items-center relative">
      <button
        @click="switchCurrencies"
        class="rounded-full w-10 h-10 bg-gray-500 border border-gray-600 hover:bg-gray-600 cursor-pointer mx-auto relative">
        <Icon name="ri:arrow-left-right-fill" class="text-white rotate-90" />
      </button>
    </div>

    <div class="box-to-convert border-b-gray-300 font-light pt-4">
      <p class="text-sm font-light mb-2">Converted amount</p>
      <div class="flex justify-between gap-4">
        <CustomSelect @optionSelected="selected" v-if="data" :options="data.data"
          id="to" placeholder="Choose a currency..." />
        <input type="number" disabled v-model="conversion.toAmount"
          class="pl-2 bg-gray-100 dark:bg-gray-200 w-1/2 border border-gray-200">
      </div>
    </div>
    <template v-if="conversion.from.option && conversion.to.option">
      <div class="shadow-md p-2 rounded-sm" v-if="conversion.from?.option.key && conversion.to?.option.key">
      <p class="text-sm font-light mt-6">Indicated exchange rate</p>
      <p>1 {{conversion.from.option.key}} = 1.22 {{conversion.to.option.key}}</p>
    </div>
    </template>

  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/countries");

interface optionInterface {
  key: string;
  value: string;
  image?: string;
  id:string;
}
enum ConversionKey {
  From = 'from',
  To = 'to',
}
const conversion = ref({
  from: {} as any,
  to: {} as any,
  fromAmount: null,
  toAmount: null,
})
function selected(option: any) {
  const id = option.id as ConversionKey;
  conversion.value[id] = option;
  console.log(conversion.value)
}
function switchCurrencies(){
  console.log('teraz')
}
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