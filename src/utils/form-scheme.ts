import * as Yup from 'yup'

// In your component or wherever you are using Yup validation
const maxFileSize = import.meta.env.VITE_APP_MAX_FILE_SIZE

export const formSchema = {
  fields: [
    {
      label: 'streetName',
      name: 'streetName',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'houseNumber',
      name: 'houseNumber',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'numberAddition',
      name: 'numberAddition',
      as: 'input',
      type: 'text',
      rules: Yup.string().trim()
    },
    {
      label: 'zip',
      name: 'zip',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'image',
      name: 'image',
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
      label: 'city',
      name: 'city',
      as: 'input',
      type: 'text',
      rules: Yup.string().required('Required field missing.').trim()
    },
    {
      label: 'price',
      name: 'price',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'size',
      name: 'size',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
    },
    {
      label: 'hasGarage',
      name: 'hasGarage',
      as: 'input',
      type: 'checkbox',
      rules: Yup.boolean().required('Required field missing.')
    },
    {
      label: 'bedrooms',
      name: 'bedrooms',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'bathrooms',
      name: 'bathrooms',
      as: 'input',
      type: 'number',
      rules: Yup.number()
        .required('Required field missing.')
        .typeError('Required field must be a number.')
        .integer('Must be a whole number (no decimals)')
        .positive('Must be a positive number')
    },
    {
      label: 'constructionYear',
      name: 'constructionYear',
      as: 'input',
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
      label: 'description',
      name: 'description',
      as: 'textarea',
      type: 'text',
      rules: Yup.string().required('Required field missing.')
    }
  ]
}
