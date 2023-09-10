import axios from "axios";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { currency } = getQuery(event);
    const url = `${config.public.API_URL}${config.public.API_KEY}/latest/${currency}`;
    const data: any = await axios.get(url);
    const preparedData = {
        base: data.data.base_code,
        conversion_rates: data.data.conversion_rates,
    };
    return {
        data: preparedData,
    };
});
