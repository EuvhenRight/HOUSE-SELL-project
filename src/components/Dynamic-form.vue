<script setup lang="ts">
import { ref, computed } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { validationFieldsSchema } from '../utils/validation-schema'
import { HouseListing } from '../types/types'
import { useRouter } from 'vue-router'

import uploadIcon from '../assets/icons/ic_upload@3x.png'
import clearWhiteIcon from '../assets/icons/ic_clear_white@3x.png'

const props = defineProps<{ currentValues: HouseListing }>()
const emit = defineEmits(['on-submit'])

const router = useRouter()

const newImageLink = ref<string | null>(null)
const newImage = ref<HTMLInputElement | null>(null)
// need to compute because of v-model
const currentValuesCopy = computed(() => props.currentValues)
const currentRoute = router.currentRoute.value.name
const handleSubmit = (values) => {
  emit('on-submit', values)
}
const uploadImage = (e) => {
  const file = e.target.files[0]
  if (file) {
    newImage.value = file
    newImageLink.value = URL.createObjectURL(file)
  }
}
const removeImage = () => {
  newImage.value = null
  newImageLink.value = null
  currentValuesCopy.value.image = null
}
</script>

<template>
  <Form
    @submit="handleSubmit"
    :validation-schema="validationFieldsSchema"
    :initial-values="currentValues"
    class="dynamic-form"
    v-slot="{ meta, setFieldValue, errors }"
  >
    {{ console.log('Set Field Value:', setFieldValue) }}
    <!--STREET NAME INPUT-->
    <div class="container-input" id="streetName_g">
      <label for="streetName">Street Name*</label>
      <Field
        id="streetName"
        type="text"
        name="streetName"
        placeholder="Enter the street name"
        :class="{ 'input-error': errors.streetName }"
        v-model="currentValuesCopy.streetName"
      />
      <ErrorMessage name="streetName" class="error-message" />
    </div>
    <!-- HOUSE NUMBER INPUT -->
    <div class="container-input" id="houseNumber_g">
      <label for="houseNumber">House Number*</label>
      <Field
        id="houseNumber"
        name="houseNumber"
        type="number"
        placeholder="Enter house number"
        :class="{ 'input-error': errors.houseNumber }"
        v-model="currentValuesCopy.houseNumber"
      />
      <ErrorMessage name="houseNumber" class="error-message" />
    </div>
    <!-- HOUSE NUMBER ADDITION INPUT -->
    <div class="container-input" id="numberAddition_g">
      <label for="numberAddition">Addition (optional)</label>
      <Field
        id="numberAddition"
        name="numberAddition"
        type="text"
        placeholder="e.g. A"
        v-model="currentValuesCopy.numberAddition"
      />
    </div>
    <!-- ZIP CODE INPUT -->
    <div class="container-input" id="zip_g">
      <label for="zip">Postal Code*</label>
      <Field
        id="zip"
        name="zip"
        type="text"
        placeholder="e.g. 1000 AA"
        :class="{ 'input-error': errors.zip }"
        v-model="currentValuesCopy.zip"
      />
      <ErrorMessage name="zip" class="error-message" />
    </div>
    <!-- CITY INPUT -->
    <div class="container-input" id="city_g">
      <label for="city">City*</label>
      <Field
        id="city"
        name="city"
        type="text"
        placeholder="e.g. Utrecht"
        :class="{ 'input-error': errors.city }"
        v-model="currentValuesCopy.city"
      />
      <ErrorMessage name="city" class="error-message" />
    </div>
    <!-- UPLOAD IMAGE INPUT -->
    <div class="container-input" id="post-image_g">
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
          v-if="currentValues.image && !newImageLink ? !currentValues.image : !newImageLink"
          class="file-input-button"
          type="button"
          :class="{ 'input-error': errors.image }"
          @click="newImage?.click()"
        >
          <img :src="uploadIcon" alt="Upload" />
        </button>
        <div style="position: relative">
          <img
            v-if="currentValues.image && !newImageLink ? currentValues.image : newImageLink"
            :src="(currentValues.image ?? '') || (newImageLink ?? '')"
            class="uploaded-image"
            alt="Upload"
          />
          <img
            v-if="newImageLink || currentValues.image"
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
    <div class="container-input" id="price_g">
      <label for="price">Price*</label>
      <Field
        id="price"
        name="price"
        type="number"
        placeholder="e.g. €150.000"
        :class="{ 'input-error': errors.price }"
        v-model="currentValuesCopy.price"
      />
      <ErrorMessage name="price" class="error-message" />
    </div>
    <!-- SIZE INPUT -->
    <div class="container-input" id="size_g">
      <label for="size">Size*</label>
      <Field
        id="size"
        name="size"
        type="number"
        placeholder="e.g. 60m2"
        :class="{ 'input-error': errors.size }"
        v-model="currentValuesCopy.size"
      />
      <ErrorMessage name="size" class="error-message" />
    </div>
    <!-- GARAGE INPUT -->
    <div class="container-input" id="hasGarage_g">
      <label for="hasGarage">Garage*</label>
      <Field
        id="hasGarage"
        name="hasGarage"
        as="select"
        :class="{ 'input-error': errors.hasGarage }"
        v-model="currentValuesCopy.hasGarage"
        required
      >
        <option value="" selected disabled class="default-option">Select</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Field>
      <ErrorMessage name="hasGarage" class="error-message" />
    </div>
    <!-- BEDROOMS INPUT -->
    <div class="container-input" id="bedrooms_g">
      <label for="bedrooms">Bedrooms*</label>
      <Field
        id="bedrooms"
        name="bedrooms"
        type="number"
        placeholder="Enter amount"
        :class="{ 'input-error': errors.bedrooms }"
        v-model="currentValuesCopy.bedrooms"
      />
      <ErrorMessage name="bedrooms" class="error-message" />
    </div>
    <!-- BATHROOMS INPUT -->
    <div class="container-input" id="bathrooms_g">
      <label for="bathrooms">Bathrooms*</label>
      <Field
        id="bathrooms"
        name="bathrooms"
        type="number"
        placeholder="Enter amount"
        :class="{ 'input-error': errors.bathrooms }"
        v-model="currentValuesCopy.bathrooms"
      />
      <ErrorMessage name="bathrooms" class="error-message" />
    </div>
    <!-- CONSTRUCTION YEAR INPUT -->
    <div class="container-input" id="constructionYear_g">
      <label for="constructionYear">Construction date*</label>
      <Field
        id="constructionYear"
        name="constructionYear"
        type="number"
        placeholder="e.g. 1990"
        :class="{ 'input-error': errors.constructionYear }"
        v-model="currentValuesCopy.constructionYear"
      />
      <ErrorMessage name="constructionYear" class="error-message" />
    </div>
    <!-- DESCRIPTION INPUT -->
    <div class="container-input" id="description_g">
      <label for="description">Description*</label>
      <Field
        id="description"
        name="description"
        as="textarea"
        type="text"
        placeholder="Enter description"
        :class="{ 'input-error': errors.description }"
        v-model="currentValuesCopy.description"
      />
      <ErrorMessage name="description" class="error-message" />
    </div>
    <button
      class="post-btn_g"
      :class="{ 'post-button-disabled': !meta.valid }"
      :disabled="!meta.valid"
      type="submit"
    >
      {{ currentRoute === 'editListing' ? 'SAFE' : 'POST' }}
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
  grid-template-rows: 90px 90px 90px 90px 190px 90px 90px 90px 90px 200px 90px;
  align-items: start;
  gap: 10px 20px;
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
#streetName_g {
  grid-area: streetName;
}
#numberAddition_g {
  grid-area: numberAddition;
}
#houseNumber_g {
  grid-area: houseNumber;
}
#zip_g {
  grid-area: zip;
}
#city_g {
  grid-area: city;
}
#post-image_g {
  grid-area: image;
}
#price_g {
  grid-area: price;
}
#size_g {
  grid-area: size;
}
#hasGarage_g {
  grid-area: hasGarage;
}
#bedrooms_g {
  grid-area: bedrooms;
}
#bathrooms_g {
  grid-area: bathrooms;
}
#constructionYear_g {
  grid-area: constructionYear;
}
#description_g {
  grid-area: description;
}
.post-btn_g {
  grid-area: button;
}
#hasGarage_g {
  position: relative;
}

select {
  background: url('../assets/icons/up-and-down.svg') no-repeat var(--element-background-2);
  background-size: 16px;
  margin-top: 8px;
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
    color: var(--element-secondary);
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
    margin-top: 8px;
    width: 100%;
  }
}

.post-btn_g {
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
.post-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.file-input-button {
  width: 150px;
  height: 150px;
  margin-top: 8px;
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
  margin-top: 12px;
  object-fit: cover;
  border-radius: 8px;
}
.remove-image {
  position: absolute;
  width: 40px;
  left: 116px;
  top: 8px;
  transform: translate(13px, -10px);
  cursor: pointer;
}

@media (max-width: 992px) {
  .dynamic-form {
    width: 100%;
    grid-template-rows: 1.1fr 1.1fr 1.1fr 1.1fr 2fr 1.1fr 1.1fr 1.1fr 1.1fr 2.3fr 1.1fr;
    gap: 0px 16px;
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
  .post-btn_g {
    width: 100%;
    font-size: 12px;
  }
  .container-input {
    font-size: 12px;
  }
}
</style>
