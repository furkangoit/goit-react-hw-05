import React from "react";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

export default function ContactList({ contacts, deleteContact }) {
    return (
        <ul className={styles.list}>
            {contacts.length === 0 ? (
                <li className={styles.noContacts}>No contacts found</li>
            ) : (
                contacts.map((contact) => (
                    <li key={contact.id} className={styles.item}>
                        <Contact contact={contact} onDelete={deleteContact} />
                    </li>
                ))
            )}
        </ul>
    );
}