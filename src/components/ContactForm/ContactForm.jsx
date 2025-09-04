import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Minimum 3 karakter")
        .max(50, "Maksimum 50 karakter")
        .required("Zorunlu alan"),
    number: Yup.string()
        .min(3, "Minimum 3 karakter")
        .max(50, "Maksimum 50 karakter")
        .required("Zorunlu alan"),
});

export default function ContactForm({ onAddContact }) {
    return (
        <Formik
            initialValues={{ name: "", number: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onAddContact({
                    id: nanoid(),
                    name: values.name,
                    number: values.number,
                });
                resetForm();
            }}
        >
            <Form className={styles.form}>
                <label className={styles.label}>
                    Name
                    <Field name="name" type="text" className={styles.input} />
                    <ErrorMessage name="name" component="div" className={styles.error} />
                </label>
                <label className={styles.label}>
                    Number
                    <Field name="number" type="text" className={styles.input} />
                    <ErrorMessage
                        name="number"
                        component="div"
                        className={styles.error}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    Add Contact
                </button>
            </Form>
        </Formik>
    );
}