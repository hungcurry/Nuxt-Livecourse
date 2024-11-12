// 有自動引入 可省略
// import { ref , reactive } from "vue";
// import { defineStore } from 'pinia';

import axios from 'axios';

export const FetchStore = defineStore('fetch', () => {
  const useName = ref('curry');
  const isLoad = ref(false);
  const errorMessage = ref('');
  const reactiveAry = reactive({ data: [] });

  const FetchInit = async url => {
    try {
      const res = await axios.get(url);
      isLoad.value = true;
      reactiveAry.data = res.data.twzip.city;
    } catch (error) {
      console.log('catch', error.message);
      errorMessage.value = error.message;
    }
  };
  return {
    useName,
    isLoad,
    reactiveAry,
    errorMessage,
    FetchInit,
  };
});
