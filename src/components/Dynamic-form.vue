<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'

const props = defineProps(['schema'])
</script>

<template>
  <Form>
    <div v-for="{ as, name, label, children, ...attrs } in schema.fields" :key="name">
      <label :for="name">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage :name="name" />
    </div>
    <button>Submit</button>
  </Form>
</template>
