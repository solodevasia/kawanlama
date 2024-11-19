<template>
  <div class="flex items-center justify-center w-full h-[100vh]">
    <div
      v-if="data.success"
      class="absolute top-0 left-0 w-full p-2 bg-green-700 text-center text-white"
    >
      You accounts has been created!
    </div>
    <div>
      <div class="mb-4">
        <label for="username" class="text-[14px] text-gray-500 font-semibold"
          >Username</label
        >
        <div
          class="w-96 h-9 border border-gray-200 rounded-md flex items-center px-3"
        >
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            autocomplete="off"
            :value="data.username"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <div :class="data.invalidEmail ? '' : 'mb-4'">
        <label for="username" class="text-[14px] text-gray-500 font-semibold"
          >Email address</label
        >
        <div
          class="w-96 h-9 border border-gray-200 rounded-md flex items-center px-3"
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            autocomplete="off"
            :value="data.email"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <span v-if="data.invalidEmail" class="mt-1 mb-4 text-sm text-red-500"
        >Invalid email address</span
      >
      <div class="mb-4">
        <label for="username" class="text-[14px] text-gray-500 font-semibold"
          >Password</label
        >
        <div
          class="w-96 h-9 border border-gray-200 rounded-md flex items-center px-3"
        >
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            :value="data.password"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <div :class="data.passwordDontMatch ? '' : 'mb-5'">
        <label
          for="confirmation"
          class="text-[14px] text-gray-500 font-semibold"
          >Confirmation</label
        >
        <div
          class="w-96 h-9 border border-gray-200 rounded-md flex items-center px-3"
        >
          <input
            id="confirmation"
            name="confirmation"
            type="confirmation"
            placeholder="Confirmation"
            :value="data.confirmation"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <span
        v-if="data.passwordDontMatch"
        class="mb-5 text-sm text-red-500 block mt-1"
        >Password don't match, please check again.</span
      >
      <button
        class="outline-none bg-green-500 w-96 p-2 rounded-md text-white"
        @click="onSubmit"
      >
        Register
      </button>
      <div class="text-center mt-5">
        <span class="text-gray-600 mr-1">You already have an account ?</span>
        <span
          class="text-gray-600 cursor-pointer hover:text-blue-500 hover:underline"
          @click="onNavigate"
          >Login</span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      username: "",
      email: "",
      password: "",
      confirmation: "",
      passwordDontMatch: false,
      invalidEmail: false,
      success: false,
    });

    function onNavigate() {
      navigateTo("/");
    }

    function onChange(event: Event) {
      const input = event.target as HTMLInputElement;
      data[input.name] = input.value;
      if (input.name === "email") {
        data.invalidEmail = false;
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)
        ) {
          data.invalidEmail = true;
        }
      }
      if (data.password?.length > 1 && data.confirmation?.length > 1) {
        data.passwordDontMatch = false;
        if (data.password !== data.confirmation) {
          data.passwordDontMatch = true;
        }
      }
    }

    function onSubmit() {
      console.log(data);
      data.success = true;
    }
    return {
      data,
      onChange,
      onSubmit,
      onNavigate,
    };
  },
});
</script>
