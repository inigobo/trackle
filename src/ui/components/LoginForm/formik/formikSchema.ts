import * as yup from 'yup'

export const formikSchema = yup.object().shape({
    email: yup
        .string()
        .required('Please, enter an email')
        .email('Invalid email'),
    password: yup
        .string()
        .required('Please, enter your password')
})
