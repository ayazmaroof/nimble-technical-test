<template>
  <div>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="login">Submit</button></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('You are signed in!');
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
