// import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import {
    useGetContactsQuery,
    useDeleteContactMutation,
} from 'redux/contactsApi';

const Contacts = () => {
    const { data } = useGetContactsQuery();

    const [deleteContact] = useDeleteContactMutation();

    const filter = useSelector(getFilter);

    const filteredContacts = () => {
        return data.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase().trim)
        );
    };
    let rendered = filter === '' ? data : filteredContacts();
    return (
        <>
            <ul className={styles.contactsList}>
                {data &&
                    rendered.map(({ name, id, number }) => (
                        <li className={styles.listItem} key={id} id={id}>
                            <span className={styles.contactName}>
                                <IoIosContact size={20} />: {name}{' '}
                            </span>
                            <span className={styles.phoneNumber}>
                                <BsTelephone size={15} />
                                <span> : </span>
                                {number}
                            </span>

                            <button
                                className={styles.buttons}
                                onClick={() => deleteContact(id)}
                                title="delete"
                                aria-label="delete contact button"
                            >
                                <MdOutlineDeleteForever size={30} />
                            </button>
                        </li>
                    ))}
            </ul>
            {data && data.length === 0 && (
                <p style={{ textDecoration: 'underline' }}>
                    no contacts available
                </p>
            )}
        </>
    );
};

// Contacts.propTypes = {
//     filter: PropTypes.string,
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     filteredContacts: PropTypes.func,
//     deleteContact: PropTypes.func,
// };
export default Contacts;
