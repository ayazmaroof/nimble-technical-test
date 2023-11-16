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
  <nav class="bg-gray-100">
    <div class="px-8 mx-auto border">
      <div class="flex space-x-1">
        <RouterLink class="py-5 px-2 text-gray-700 hover:text-gray-900" to="/">Home</RouterLink>
        <RouterLink
          class="py-5 px-2 text-gray-700 hover:text-gray-900"
          v-if="!isLoggedIn"
          to="/register">Register
        </RouterLink>
        <RouterLink
          class="py-5 px-2 text-gray-700 hover:text-gray-900"
          v-if="!isLoggedIn"
          to="/login">Login
        </RouterLink>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
      </div>
    </div>
    <div></div>
  </nav>
  <div>
    <p v-if="isLoggedIn">You are logged in!</p>
    <p v-if="isLoggedIn">{{ auth.currentUser.email }}</p>
  </div>

  <RouterView />
</template>

<style scoped></style>
