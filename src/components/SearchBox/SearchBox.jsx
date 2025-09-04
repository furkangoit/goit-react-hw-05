import React from "react";
import styles from "./SearchBox.module.css";

export default function SearchBox({ search, handleSearch }) {
    return (
        <div className={styles.searchbox}>
            <label className={styles.label}>
                Search:
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    className={styles.input}
                    placeholder="Type a name..."
                />
            </label>
        </div>
    );
}