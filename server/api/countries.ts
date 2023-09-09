import axios from "axios";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const data = await axios.get(
        `${config.public.API_URL}${config.public.API_KEY}/codes`
    );
    let preparedData: object[] = [];
    data.data.supported_codes.forEach((code: any) => {
        preparedData.push({
            key: code[0],
            value: code[1],
        });
    });
    return {
        data: preparedData,
    };
});
