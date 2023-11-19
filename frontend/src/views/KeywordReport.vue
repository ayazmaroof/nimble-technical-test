<template>
  <h2>Keywords</h2>
  <form @submit.prevent="fileUpload">
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTask">
      <button
        class='w-1/12 rounded-md shadow-sm bg-gray-300 p-2 text-sm font-semibold text-black hover:bg-blue-400'
        type="button"
        @click="open({ accept: '.csv', multiple: false })"
      > Choose File
      </button>
      <span v-if='files' class='px-5'>
        {{ files[0].name }}
      </span>
      <br />
      <button class='w-1/12 rounded-md shadow-sm bg-blue-500 p-2 text-sm font-semibold text-white hover:bg-blue-400'>Upload</button>
    </fieldset>
  </form>
  <div v-if='uploadProgress === 1'>
    File Uploaded Successfully!
  </div>
</template>

<script setup lang='ts'>
import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { useFileDialog } from '@vueuse/core'

const storage = useFirebaseStorage();
const fileRef = storageRef(storage, `user/keyword_list_${new Date().getTime()}`)
const {
  url,
  uploadProgress,
  uploadError,
  uploadTask,
  upload
} = useStorageFile(fileRef);

const fileUpload = () => {
  const data = files.value?.item(0);
  if (data) {
    upload(data)!
      .then(() => {
        reset();
      })
  }
}
const { files, open, reset } = useFileDialog()
</script>
