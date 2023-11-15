<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};
</script>

<template>
  <div class="wrapper">
    <p v-if="isLoggedIn">You are logged in!</p>
    <p v-if="isLoggedIn">{{ auth.currentUser.email }}</p>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped></style>
