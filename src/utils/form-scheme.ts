import * as Yup from 'yup'

// In your component or wherever you are using Yup validation
const maxFileSize = import.meta.env.VITE_APP_MAX_FILE_SIZE

export const formSchema = {
  fields: [
    {
      label: 'Street Name*',
      name: 'streetName',
      class: 'input',
      placeholder: 'Enter the street name',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'House Number*',
      name: 'houseNumber',
      class: 'double-input',
      placeholder: 'Enter house number',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'Addition (optional)',
      name: 'numberAddition',
      class: 'double-input',
      placeholder: 'e.g. A',
      as: 'input',
      type: 'text',
      rules: Yup.string().trim()
    },
    {
      label: 'Postal Code*',
      name: 'zip',
      class: 'input',
      placeholder: 'e.g. 1000 AA',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'City*',
      name: 'city',
      class: 'input',
      placeholder: 'e.g. Utrecht',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'Upload picture (PNG or JPG)*',
      class: 'input',
      name: 'post-image',
      as: 'input',
      type: 'file',
      rules: Yup.mixed()
        .required('Required field missing.')
        .test('is-valid-size', 'Max allowed size is 5MB', (value) => {
          if (typeof value === 'object') {
            const fileValue = value as { size?: number } // Type assertion

            // Check if 'size' is defined before comparing
            return (
              fileValue && fileValue.size !== undefined && fileValue.size <= Number(maxFileSize)
            )
          } else {
            return true
          }
        })
    },
    {
      label: 'Price*',
      name: 'price',
      class: 'input',
      placeholder: 'e.g. €150.000',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'Size*',
      name: 'size',
      class: 'double-input',
      placeholder: 'e.g. 60m2',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
    },
    {
      label: 'Garage*',
      name: 'hasGarage',
      class: 'double-input',
      as: 'select',
      type: 'select',
      rules: Yup.string().test('is-not-required', 'Required field missing', (value) => value !== '')
    },
    {
      label: 'Bedrooms*',
      name: 'bedrooms',
      class: 'double-input',
      placeholder: 'Enter amount',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'Bathrooms*',
      name: 'bathrooms',
      class: 'double-input',
      placeholder: 'Enter amount',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'Construction date*',
      name: 'constructionYear',
      as: 'input',
      class: 'input',
      placeholder: 'e.g. 1990',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
        .test('len', 'Must be exactly 4 characters', (val) => val.toString().length === 4)
        .min(1901, 'Must be greater than or equal to 1901')
        .max(2024, 'Must be less than or equal to 2024')
    },
    {
      label: 'Description*',
      name: 'description',
      class: 'input',
      placeholder: 'Enter description',
      as: 'textarea',
      type: 'text',
      rules: Yup.string().required('Required field missing.')
    }
  ]
}
