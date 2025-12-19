import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/Header';

const Form: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      address1: '',
      address2: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      contact: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),
      address1: Yup.string().required('Required'),
      address2: Yup.string(),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Header title="Create User" subtitle="Create a new user profile" />
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                {...formik.getFieldProps('firstName')}
                className={`w-full rounded-lg border bg-background px-4 py-2 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? 'border-red-500'
                    : 'border-input'
                }`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.firstName}</div>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                {...formik.getFieldProps('lastName')}
                className={`w-full rounded-lg border bg-background px-4 py-2 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? 'border-red-500'
                    : 'border-input'
                }`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-full rounded-lg border bg-background px-4 py-2 ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-input'
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium mb-2">
              Contact Number *
            </label>
            <input
              id="contact"
              type="text"
              {...formik.getFieldProps('contact')}
              className={`w-full rounded-lg border bg-background px-4 py-2 ${
                formik.touched.contact && formik.errors.contact
                  ? 'border-red-500'
                  : 'border-input'
              }`}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.contact}</div>
            )}
          </div>

          <div>
            <label htmlFor="address1" className="block text-sm font-medium mb-2">
              Address 1 *
            </label>
            <input
              id="address1"
              type="text"
              {...formik.getFieldProps('address1')}
              className={`w-full rounded-lg border bg-background px-4 py-2 ${
                formik.touched.address1 && formik.errors.address1
                  ? 'border-red-500'
                  : 'border-input'
              }`}
            />
            {formik.touched.address1 && formik.errors.address1 && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.address1}</div>
            )}
          </div>

          <div>
            <label htmlFor="address2" className="block text-sm font-medium mb-2">
              Address 2
            </label>
            <input
              id="address2"
              type="text"
              {...formik.getFieldProps('address2')}
              className="w-full rounded-lg border bg-background px-4 py-2"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Create User
            </button>
            <button
              type="button"
              onClick={formik.handleReset}
              className="rounded-lg border px-6 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;