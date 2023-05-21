import { isRef, ref, unref, watchEffect } from "vue";
import axios, { AxiosError } from "axios";

export function useFetch(url, method, payload) {
  const isLoading = ref(false);
  const error = ref(false);
  const data = ref(null);

  async function fetchData() {
    try {
      isLoading.value = true;
      const response = await axios({
        url: unref(url),
        method,
        data: payload,
      });
      data.value = response.data;
    } catch (e) {
      if (e instanceof AxiosError || e instanceof Error) {
        error.value = e;
      } else {
        error.value = new Error(String(e));
      }
    } finally {
      isLoading.value = false;
    }
  }

  if (isRef(url)) {
    watchEffect(fetchData);
  } else {
    fetchData();
  }

  return { data, isLoading, error };
}
