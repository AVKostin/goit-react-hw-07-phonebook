import Form from "../Form";
import Filter from "../Filter";
import Contacts from "../Contacts";
import styles from "./styles.module.css";
import { FaJournalWhills } from "react-icons/fa";

const App = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>
                <FaJournalWhills size={28} className={styles.icon} />
                Phonebook
            </h1>
            <Form />
            <h2>Contacts</h2>
            <Filter />
            <Contacts />
        </div>
    );
};
export default App;
