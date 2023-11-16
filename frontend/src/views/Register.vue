<template>
  <div class="container mx-auto p-10">
    <div class="flex flex-col mx-auto items-center gap-y-3">
      <input
        class="w-4/12 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 pl-2"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="w-4/12 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 pl-2"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <button
        class="w-1/12 rounded-md shadow-sm bg-blue-500 p-2 text-sm font-semibold text-white hover:bg-blue-400"
        @click="register">Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push('/');
    })
    .catch((error) => {
      alert(error.message);
    });
};
</script>
