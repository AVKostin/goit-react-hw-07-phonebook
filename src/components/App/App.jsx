import styles from './styles.module.css';
import { FaJournalWhills } from 'react-icons/fa';
import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

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
