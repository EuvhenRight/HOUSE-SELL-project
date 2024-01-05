<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import uploadIcon from '../assets/icons/ic_upload@3x.png'
import clearWhiteIcon from '../assets/icons/ic_clear_white@3x.png'
const props = defineProps(['schema'])

const imageData = ref<string | null>(null)
const newImage = ref<string | null>(null)
const newImageLink = ref<string | null>(null)

const uploadImage = (e: any) => {
  const file = e.target.files[0]
  if (file) {
    newImage.value = file
    newImageLink.value = URL.createObjectURL(file)
    console.log(newImageLink.value)
  }
}

const removeImage = () => {
  imageData.value = null
  newImage.value = null
  newImageLink.value = null
}
</script>

<template>
  <Form class="dynamic-form" v-slot="{ errors }">
    <div
      class="container-inputs"
      :id="name"
      v-for="{ as, name, label, children, type, rules, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <!-- All input types -->
      <Field
        :id="name"
        :as="as"
        :name="name"
        :rules="rules"
        v-bind="attrs"
        :class="{ 'input-error': errors[name] }"
        v-if="type !== 'select' && type !== 'file'"
      >
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
      <!-- Select hasGarage input -->
      <Field
        :id="name"
        :name="name"
        :rules="rules"
        :class="{ 'input-error': errors[name] }"
        v-if="type == 'select'"
      >
        <select :as="as" :id="name" :name="name" v-bind="attrs">
          <option value="" selected disabled hidden class="default-select-option">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </Field>
      <!-- File Image input with icon -->
      <div v-if="type === 'file'">
        <label :for="name" class="file-input" style="position: relative">
          <!-- Upload image -->
          <button
            v-if="!newImageLink"
            class="file-input-button"
            type="button"
            :id="name"
            :class="{ 'input-error': errors[name] }"
          >
            <img :src="uploadIcon" alt="Upload" />
          </button>
          <img
            v-if="newImageLink"
            :src="imageData || newImageLink"
            class="uploaded-image"
            alt="Upload"
          />
          <img
            v-if="newImageLink"
            :src="clearWhiteIcon"
            alt="Remove"
            @click="removeImage"
            class="remove-image"
          />
        </label>
        <Field
          :as="as"
          :id="name"
          :name="name"
          :rules="rules"
          v-bind="attrs"
          :type="type"
          @change="uploadImage"
        />
      </div>
      <ErrorMessage :name="name" />
    </div>
    <button class="post-btn" type="submit">POST</button>
  </Form>
</template>

<style scoped lang="scss">
// the main layout for the dynamic form
.dynamic-form {
  width: 400px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr 2fr 1fr;
  grid-auto-columns: 1fr;
  align-items: start;
  gap: 0px 20px;
  grid-auto-flow: row;
  grid-template-areas:
    'streetName streetName'
    'houseNumber numberAddition'
    'zip zip'
    'city city'
    'image image'
    'price price'
    'size hasGarage'
    'bedrooms bathrooms'
    'constructionYear constructionYear'
    'description description'
    '. button';
}
#streetName {
  grid-area: streetName;
}
#numberAddition {
  grid-area: numberAddition;
}
#houseNumber {
  grid-area: houseNumber;
}
#zip {
  grid-area: zip;
}
#city {
  grid-area: city;
}
#post-image {
  grid-area: image;
}
#price {
  grid-area: price;
}
#size {
  grid-area: size;
}
#hasGarage {
  grid-area: hasGarage;
}
#bedrooms {
  grid-area: bedrooms;
}
#bathrooms {
  grid-area: bathrooms;
}
#constructionYear {
  grid-area: constructionYear;
}
#description {
  grid-area: description;
}
.post-btn {
  grid-area: button;
}

#hasGarage {
  position: relative;
}

select {
  background: url('../assets/icons/up-and-down.svg') no-repeat var(--element-background-2);
  background-size: 16px;
  background-position: calc(100% - 0.75rem) center !important;
  appearance: none !important;
  padding-right: 2rem !important;
  cursor: pointer;
}

select:invalid,
select option[value=''] {
  color: var(--element-tertiary-2);
}
select,
select option {
  color: black;
}
.dynamic-form span {
  color: var(--element-primary);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  margin-top: 7px;
}
// the inputs for the dynamic form
.container-inputs {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  & input,
  select {
    width: 100%;
    resize: none;
    padding: 15px 20px;
    border: none;
    border-radius: 10px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
  & textarea {
    width: 100%;
    height: 150px;
    resize: none;
    padding: 15px 20px;
    margin-top: 8px;
    border: none;
    border-radius: 10px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
  & label {
    margin-bottom: 12px;
  }
  & .input-error {
    border: 1px solid var(--element-primary);
  }
  // the error message for the input red color
  & .input-error::placeholder {
    color: var(--element-primary);
  }
  & .input-error:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--element-primary);
  }
  & .input-error::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--element-primary);
  }
  // the error message for the textarea red color
  & textarea.input-error::placeholder {
    color: var(--element-primary);
  }
  & input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--element-tertiary-2);
    opacity: 1; /* Firefox */
  }
  & input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--element-tertiary-2);
  }
  & input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--element-tertiary-2);
  }
  & textarea::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--element-tertiary-2);
    opacity: 1; /* Firefox */
  }
  & textarea:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--element-tertiary-2);
  }
  & textarea::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--element-tertiary-2);
  }
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    /* Chrome, Safari, Edge, Opera */
    -webkit-appearance: none;
    margin: 0;
  }
  & input[type='number'] {
    /* Firefox */
    -moz-appearance: textfield;
    appearance: textfield;
  }
  & input {
    width: 100%;
  }
}

.post-btn {
  width: 200px;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background-color: var(--element-primary);
  color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.dynamic-form input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.file-input-button {
  width: 150px;
  height: 150px;
  background-color: transparent;
  border: 2px dashed var(--element-tertiary-2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & img {
    width: 35px;
  }
}
.uploaded-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}
.remove-image {
  position: absolute;
  width: 40px;
  right: 0;
  top: auto;
  transform: translate(13px, -10px);
}

@media (max-width: 992px) {
  .dynamic-form {
    width: 100%;
    grid-template-areas:
      'streetName streetName'
      'houseNumber numberAddition'
      'zip zip'
      'city city'
      'image image'
      'price price'
      'size hasGarage'
      'bedrooms bathrooms'
      'constructionYear constructionYear'
      'description description'
      'button button';
  }
  .post-btn {
    width: 100%;
    font-size: 12px;
  }
  .container-inputs {
    font-size: 12px;
  }
}
</style>
