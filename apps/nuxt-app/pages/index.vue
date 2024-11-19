<template>
  <div class="flex items-center justify-center w-full h-[100vh]">
    <div
      v-if="data.failed"
      class="absolute top-0 left-0 w-full p-2 bg-red-700 text-center text-white"
    >
      Username or password incorrect
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
            placeholder="Username or email"
            autocomplete="off"
            :value="data.username"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <div class="mb-5">
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
            placeholder="Password"
            :value="data.password"
            @change="onChange"
            class="text-[14px] w-full outline-none border-none text-gray-500"
          />
        </div>
      </div>
      <button
        class="outline-none bg-green-500 w-96 p-2 rounded-md text-white"
        @click="onSubmit"
      >
        Log in
      </button>
      <div class="text-center mt-5">
        <span class="text-gray-600 mr-1">You don't have an account ?</span>
        <span
          class="text-gray-600 cursor-pointer hover:text-blue-500 hover:underline"
          @click="onNavigate"
          >Register</span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({ username: "", password: "", failed: false });

    function onNavigate() {
      navigateTo("/register");
    }

    function onChange(event: Event) {
      const input = event.target as HTMLInputElement;
      data[input.name] = input.value;
    }

    function onSubmit() {
      if (data.username === "admin" && data.password === "admin") {
        data.failed = false;
        navigateTo("/dashboard");
      } else data.failed = true;
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
