// import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, getFilter, getItems } from 'redux/contactsSlice';

const Contacts = () => {
    const contacts = useSelector(getItems);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const filteredContacts = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    };
    let rendered = filter === '' ? contacts : filteredContacts();
    return (
        <ul className={styles.contactsList}>
            {rendered.map(({ name, id, number }) => (
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
                        onClick={e =>
                            dispatch(
                                deleteContacts(e.currentTarget.parentNode.id)
                            )
                        }
                        title="delete"
                        aria-label="delete contact button"
                    >
                        <MdOutlineDeleteForever size={30} />
                    </button>
                </li>
            ))}
        </ul>
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
