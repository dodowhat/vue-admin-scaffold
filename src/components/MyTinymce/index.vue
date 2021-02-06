<template>
  <tinymce-vue
    v-model="content"
    :value="value"
    :init="init"
    @input="$emit('input', content)"
  />
</template>

<script src="./index.js"></script>
