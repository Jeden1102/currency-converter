<template>
  <div class="w-full bg-gray-50 rounded-sm p-3 dark:bg-gray-300 flex flex-col">
    <div class="box-to-convert font-light pb-4">
      <p class="text-sm font-light mb-2">Amount</p>
      <div class="flex justify-between gap-4">
        <CustomSelect @optionSelected="selected" v-if="data" :options="data.data"
          id="from" placeholder="Choose a currency..." ref="select_from" />
        <input type="number" v-model="conversion.fromAmount" placeholder="Type amount"
          class="pl-2 bg-gray-100 dark:bg-gray-200 w-1/2 border border-gray-200">
      </div>
    </div>
    <div class="exchange-box flex items-center relative">
      <button :disabled="!conversion.from.option || !conversion.to.option"
        @click="switchCurrencies"
        class="rounded-full w-10 h-10 bg-gray-500 border border-gray-600 hover:bg-gray-600 cursor-pointer mx-auto relative disabled:opacity-50 disabled:cursor-default">
        <Icon name="ri:arrow-left-right-fill" class="text-white rotate-90" />
      </button>
    </div>

    <div class="box-to-convert border-b-gray-300 font-light pt-4">
      <p class="text-sm font-light mb-2">Converted amount</p>
      <div class="flex justify-between gap-4">
        <CustomSelect @optionSelected="selected" v-if="data" :options="data.data"
          id="to" placeholder="Choose a currency..." ref="select_to" />
        <input type="number" disabled v-model="convertedValue.amountTo"
          class="pl-2 bg-gray-100 dark:bg-gray-200 w-1/2 border border-gray-200">
      </div>
    </div>
    <template v-if="conversion.from.option && conversion.to.option">
      <div class="shadow-md p-2 rounded-sm"
        v-if="conversion.from?.option.key && conversion.to?.option.key">
        <p class="text-sm font-light mt-6">Indicated exchange rate</p>
        <p>1 {{ conversion.from.option.key }} = {{ convertedValue.ratio }}
          {{ conversion.to.option.key }}
        </p>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/countries");
const select_from = ref(null);
const select_to = ref(null);
const currencyData = ref(null);
interface optionInterface {
  key: string;
  value: string;
  image?: string;
  id: string;
}
enum ConversionKey {
  From = 'from',
  To = 'to',
}
const conversion = ref({
  from: {} as any,
  to: {} as any,
  fromAmount: null,
})
function selected(option: any) {
  const id = option.id as ConversionKey;
  conversion.value[id] = option;
  if (id === 'from') {
    fetchCurrencyData()
  }
}
function switchCurrencies() {
  const _from = conversion.value.from;
  conversion.value.from = conversion.value.to;
  select_from.value.exposeValue(conversion.value.to);
  select_to.value.exposeValue(_from);
  conversion.value.to = _from;
  fetchCurrencyData()
}
async function fetchCurrencyData() {
  const { data } = await useFetch(`/api/currencies?currency=${conversion.value.from.option.key}`);
  currencyData.value = data;
}

const convertedValue = computed(() => {
  if (!conversion.value.from.option || !conversion.value.to.option) {
    return {
      ratio: null,
      amountTo: null
    };
  }
  const ratio = currencyData.value._value.data.conversion_rates[conversion.value.to.option.key];
  return {
    ratio: ratio,
    amountTo: (conversion.value.fromAmount * ratio).toFixed(3),
  };
})
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