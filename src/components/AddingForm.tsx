import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

type AddingFormProp = {
    addTask: (title: string, description: string, category: string) => void
}

type FormValues = {
    title: string;
    description: string;
    category: string
};

const AddingForm = ({ addTask }: AddingFormProp) => {
    const initialValues: FormValues = {
        title: '',
        description: '',
        category: 'Choose Category'
    };

    const categories = ["Home", "Work", "Family", "Study"];

    const handleSubmit = (values: FormValues, actions: any) => {
        addTask(values.title, values.description, values.category);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col mb-10 max-w-md mx-auto p-4 bg-white rounded shadow-md">
                <Field as="input" name="title" type="text" placeholder="Title" className="h-10 border-4 border-yellow-400" />
                <Field name="description" type="text" placeholder="Description" className="h-10 border-4 border-yellow-400" />
                <Field name="category" as="select"  className="h-10 border-4 border-yellow-400">
                    <option value="Choose Category" disabled>Choose Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Field>
                <button type="submit" className="h-10 border-4 border-yellow-400 rounded-xl bg-yellow-300 font-bold">ADD TASK</button>
            </Form>
        </Formik>
    )
}

export default AddingForm