import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";  // Direkt dosya adını kullan
import data from "./data.json";
import styles from "./App.module.css";

function App() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState(data);

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");
    if (localContacts) {
      try {
        setContacts(JSON.parse(localContacts));
      } catch (error) {
        console.error("LocalStorage verisi parse edilemedi:", error);
        setContacts(data);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }

  function addContact(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  function deleteContact(id) {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
        <SearchBox search={search} handleSearch={handleSearch} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
}

export default App;