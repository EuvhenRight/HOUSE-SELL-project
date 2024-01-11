<script setup lang="ts">
import uploadIcon from '../assets/icons/ic_upload@3x.png'
import clearWhiteIcon from '../assets/icons/ic_clear_white@3x.png'

import { ref, defineProps, defineEmits } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { validationFieldsSchema } from '../utils/validation-schema'
import { HouseListing } from '../types/types'

defineProps<{ valuesForm: HouseListing }>()
const emit = defineEmits(['on-submit'])

const handleSubmit = (values) => {
  emit('on-submit', values)
}

const imageData = ref<string | null>(null)
const newImage = ref<HTMLInputElement | null>(null)
const newImageLink = ref<string | null>(null)

// const fileInputClick = ref<HTMLInputElement | null>(null)

const uploadImage = (e) => {
  const file = e.target.files[0]
  if (file) {
    newImage.value = file
    newImageLink.value = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  imageData.value = null
  newImage.value = null
  newImageLink.value = null
}
</script>

<template>
  <Form
    @submit="handleSubmit"
    :validation-schema="validationFieldsSchema"
    :initial-values="valuesForm"
    class="dynamic-form"
    v-slot="{ meta, setFieldValue, errors }"
  >
    <!--STREET NAME INPUT-->
    <div class="container-input" id="streetName">
      <label for="streetName">Street Name*</label>
      <Field
        id="streetName"
        type="text"
        name="streetName"
        placeholder="Enter the street name"
        :class="{ 'input-error': errors.streetName }"
      />
      <ErrorMessage name="streetName" class="error-message" />
    </div>
    <!-- HOUSE NUMBER INPUT -->
    <div class="container-input" id="houseNumber">
      <label for="houseNumber">House Number*</label>
      <Field
        id="houseNumber"
        name="houseNumber"
        type="number"
        placeholder="Enter house number"
        :class="{ 'input-error': errors.houseNumber }"
      />
      <ErrorMessage name="houseNumber" class="error-message" />
    </div>
    <!-- HOUSE NUMBER ADDITION INPUT -->
    <div class="container-input" id="numberAddition">
      <label for="numberAddition">Addition (optional)</label>
      <Field id="numberAddition" name="numberAddition" type="text" placeholder="e.g. A" />
    </div>
    <!-- ZIP CODE INPUT -->
    <div class="container-input" id="zip">
      <label for="zip">Postal Code*</label>
      <Field
        id="zip"
        name="zip"
        type="text"
        placeholder="e.g. 1000 AA"
        :class="{ 'input-error': errors.zip }"
      />
      <ErrorMessage name="zip" class="error-message" />
    </div>
    <!-- CITY INPUT -->
    <div class="container-input" id="city">
      <label for="city">City*</label>
      <Field
        id="city"
        name="city"
        type="text"
        placeholder="e.g. Utrecht"
        :class="{ 'input-error': errors.city }"
      />
      <ErrorMessage name="city" class="error-message" />
    </div>
    <!-- UPLOAD IMAGE INPUT -->
    <div class="container-input" id="image">
      <label for="image">Upload picture (PNG or JPG)*</label>
      <Field id="image" name="image" type="file" v-slot="{ field }">
        <input
          name="image"
          type="file"
          hidden
          accept=".png,.jpg"
          @change="uploadImage"
          ref="newImage"
          v-bind="field"
        />
        <button
          v-if="!newImageLink"
          class="file-input-button"
          type="button"
          :class="{ 'input-error': errors.image }"
          @click="newImage?.click()"
        >
          <img :src="uploadIcon" alt="Upload" />
        </button>
        <div style="position: relative">
          <img v-if="newImageLink" :src="newImageLink" class="uploaded-image" alt="Upload" />
          <img
            v-if="newImageLink"
            :src="clearWhiteIcon"
            alt="Remove"
            @click="removeImage(), setFieldValue('image', null)"
            class="remove-image"
          />
        </div>
      </Field>
      <ErrorMessage name="image" class="error-message" />
    </div>
    <!-- PRICE INPUT -->
    <div class="container-input" id="price">
      <label for="price">Price*</label>
      <Field
        id="price"
        name="price"
        type="number"
        placeholder="e.g. €150.000"
        :class="{ 'input-error': errors.price }"
      />
      <ErrorMessage name="price" class="error-message" />
    </div>
    <!-- SIZE INPUT -->
    <div class="container-input" id="size">
      <label for="size">Size*</label>
      <Field
        id="size"
        name="size"
        type="number"
        placeholder="e.g. 60m2"
        :class="{ 'input-error': errors.size }"
      />
      <ErrorMessage name="size" class="error-message" />
    </div>
    <!-- GARAGE INPUT -->
    <div class="container-input" id="hasGarage">
      <label for="hasGarage">Garage*</label>
      <Field
        id="hasGarage"
        name="hasGarage"
        as="select"
        :class="{ 'input-error': errors.hasGarage }"
        required
      >
        <option value="" selected disabled class="default-option">Select</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Field>
      <ErrorMessage name="hasGarage" class="error-message" />
    </div>
    <!-- BEDROOMS INPUT -->
    <div class="container-input" id="bedrooms">
      <label for="bedrooms">Bedrooms*</label>
      <Field
        id="bedrooms"
        name="bedrooms"
        type="number"
        placeholder="Enter amount"
        :class="{ 'input-error': errors.bedrooms }"
      />
      <ErrorMessage name="bedrooms" class="error-message" />
    </div>
    <!-- BATHROOMS INPUT -->
    <div class="container-input" id="bathrooms">
      <label for="bathrooms">Bathrooms*</label>
      <Field
        id="bathrooms"
        name="bathrooms"
        type="number"
        placeholder="Enter amount"
        :class="{ 'input-error': errors.bathrooms }"
      />
      <ErrorMessage name="bathrooms" class="error-message" />
    </div>
    <!-- CONSTRUCTION YEAR INPUT -->
    <div class="container-input" id="constructionYear">
      <label for="constructionYear">Construction date*</label>
      <Field
        id="constructionYear"
        name="constructionYear"
        type="number"
        placeholder="e.g. 1990"
        :class="{ 'input-error': errors.constructionYear }"
      />
      <ErrorMessage name="constructionYear" class="error-message" />
    </div>
    <!-- DESCRIPTION INPUT -->
    <div class="container-input" id="description">
      <label for="description">Description*</label>
      <Field
        id="description"
        name="description"
        as="textarea"
        type="text"
        placeholder="Enter description"
        :class="{ 'input-error': errors.description }"
      />
      <ErrorMessage name="description" class="error-message" />
    </div>
    <button class="post-btn" :class="!meta.valid ? 'post-button-disabled' : ''" type="submit">
      POST
    </button>
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

.dynamic-form span {
  color: var(--element-primary);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  margin-top: 7px;
}
// the inputs for the dynamic form
.container-input {
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
    margin-top: 12px;
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
  & textarea .input-error::placeholder {
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
  margin-top: 26px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
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
}
.remove-image {
  position: absolute;
  width: 40px;
  left: 116px;
  top: auto;
  transform: translate(13px, -10px);
  cursor: pointer;
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
  .container-input {
    font-size: 12px;
  }
}
</style>
../utils/validation-schema
