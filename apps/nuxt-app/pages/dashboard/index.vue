<template>
  <div class="pt-6">
    <div class="w-full flex items-center justify-center flex-col">
      <div
        class="w-96 h-9 border border-gray-200 rounded-md flex items-center px-3 mb-3"
      >
        <input
          id="title"
          name="title"
          :value="data.title"
          @change="onChange"
          type="text"
          class="w-full text-[14px] font-normal outline-none border-none bg-transparent"
          placeholder="Title"
        />
      </div>
      <div
        class="w-96 h-24 border border-gray-200 rounded-md flex items-center px-1"
      >
        <textarea
          id="description"
          name="description"
          :value="data.description"
          @change="onChange"
          type="text"
          class="w-full h-full bg-transparent text-[14px] font-normal outline-none border-none p-1 resize-none"
          placeholder="Description"
        />
      </div>
      <button
        class="outline-none bg-green-500 w-96 p-2 rounded-md text-white mt-3"
        @click="onSave"
      >
        Create Product
      </button>
    </div>

    <div class="flex flex-wrap p-3">
      <div
        v-for="(item, index) in store.products"
        :key="index"
        class="border border-gray-200 p-2 w-[400px] rounded-md m-2"
      >
        <div class="text-sm flex items-center justify-between text-gray-700">
          <div class="w-80">{{ item.id }} - {{ item.title }}</div>
          <div
            class="flex items-center p-1 cursor-pointer rounded-md justify-center bg-black"
            @click="store.removeProduct(item.id)"
          >
            <img :src="exit" alt="" />
          </div>
        </div>
        <div class="text-sm text-gray-700">{{ item.description }}</div>
        <div class="text-xs text-gray-500">
          {{ transformDate(item.created_at) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { userProductStore } from "../../store";
import moment from "moment";
import exit from "../../assets/exit.svg";

export default defineComponent({
  data: () => {
    return { exit };
  },
  setup({}) {
    const data = reactive<{ title: string; description: string }>({});
    const store = userProductStore();

    onMounted(() => {
      fetch("https://fakestoreapi.com/products").then(async (res) => {
        const data = await res.json();
        store.initialProduct(data);
      });
    });

    function onChange(event: Event) {
      const input = event.target as HTMLInputElement;
      data[input.name] = input.value;
    }

    function onSave() {
      store.addProduct(data);
      data.title = "";
      data.description = "";
    }

    function transformDate(date: string) {
      return moment(date).from();
    }

    return {
      data,
      store,
      onChange,
      onSave,
      transformDate,
    };
  },
});
</script>
