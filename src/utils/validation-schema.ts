import * as Yup from 'yup'

// In your component or wherever you are using Yup validation
const maxFileSize = import.meta.env.VITE_APP_MAX_FILE_SIZE

export const validationFieldsSchema = Yup.object({
  streetName: Yup.string().required('Required field missing.').trim(),
  houseNumber: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  zip: Yup.string().required('Required field missing.').trim(),
  city: Yup.string().required('Required field missing.').trim(),
  image: Yup.mixed()
    .required('Required field missing.')
    .test('is-valid-size', 'Max allowed size is 5MB', (value) => {
      if (typeof value === 'object') {
        const fileValue = value as { size?: number } // Type assertion

        // Check if 'size' is defined before comparing
        return fileValue && fileValue.size !== undefined && fileValue.size <= Number(maxFileSize)
      } else {
        return true
      }
    }),
  price: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  size: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)'),
  hasGarage: Yup.boolean().required('Required field missing.'),
  bedrooms: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  bathrooms: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number'),
  constructionYear: Yup.number()
    .required('Required field missing.')
    .typeError('Required field must be a number.')
    .integer('Must be a whole number (no decimals)')
    .positive('Must be a positive number')
    .test('len', 'Must be exactly 4 characters', (val) => val.toString().length === 4)
    .min(1901, 'Must be greater than or equal to 1901')
    .max(2024, 'Must be less than or equal to 2024'),
  description: Yup.string().required('Required field missing.').trim()
})
