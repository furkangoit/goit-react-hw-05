import React from "react";
import styles from "./Contact.module.css";

export default function Contact({ contact, onDelete }) {
    return (
        <div className={styles.contact}>
            <div>
                <span className={styles.name}>{contact.name}</span>:
                <span className={styles.number}>{contact.number}</span>
            </div>
            <button className={styles.button} onClick={() => onDelete(contact.id)}>
                Delete
            </button>
        </div>
    );
}