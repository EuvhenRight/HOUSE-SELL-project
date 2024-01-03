<script setup lang="ts">
import DynamicForm from '../components/Dynamic-form.vue'
import { formSchema } from '../utils/form-scheme'
</script>

<template>
  <DynamicForm :schema="formSchema" />
</template>
