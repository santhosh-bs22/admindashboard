import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

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
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('First Name is required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      contact: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Contact Number is required'),
      address1: Yup.string().required('Address is required'),
      address2: Yup.string(),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const errorClass = "border-red-500 focus-visible:ring-red-500";
  
  return (
    <div className="space-y-6">
      <Header title="Create User" subtitle="Create a new user profile" />
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps('firstName')}
                    className={`${inputClass} ${formik.touched.firstName && formik.errors.firstName ? errorClass : ''}`}
                    placeholder="John"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-xs text-red-500">{formik.errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps('lastName')}
                    className={`${inputClass} ${formik.touched.lastName && formik.errors.lastName ? errorClass : ''}`}
                    placeholder="Doe"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-xs text-red-500">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className={`${inputClass} ${formik.touched.email && formik.errors.email ? errorClass : ''}`}
                  placeholder="john.doe@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="text"
                  {...formik.getFieldProps('contact')}
                  className={`${inputClass} ${formik.touched.contact && formik.errors.contact ? errorClass : ''}`}
                  placeholder="9876543210"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p className="text-xs text-red-500">{formik.errors.contact}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="address1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Address Line 1
                </label>
                <input
                  id="address1"
                  type="text"
                  {...formik.getFieldProps('address1')}
                  className={`${inputClass} ${formik.touched.address1 && formik.errors.address1 ? errorClass : ''}`}
                  placeholder="Street address, P.O. box"
                />
                {formik.touched.address1 && formik.errors.address1 && (
                  <p className="text-xs text-red-500">{formik.errors.address1}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="address2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Address Line 2 (Optional)
                </label>
                <input
                  id="address2"
                  type="text"
                  {...formik.getFieldProps('address2')}
                  className={inputClass}
                  placeholder="Apartment, suite, unit, building, floor"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={formik.handleReset}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;