import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { TiUserAddOutline } from 'react-icons/ti';
import Notiflix from 'notiflix';
import styles from './styles.module.css';
// import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, addContacts } from 'redux/contactsSlice';

Notiflix.Notify.init({
    position: 'center-top',
    width: '400px',
    fontSize: '18px',
});

export default function Form() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [isDisabled, setIsDisabled] = useState('false');
    const dispatch = useDispatch();
    const contacts = useSelector(getItems);

    const reset = () => {
        setName('');
        setNumber('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const contact = {
            id: shortid.generate(),
            name,
            number,
        };

        if (name.length === 0)
            return Notiflix.Notify.failure(
                'Enter valid name / Введите корректное имя'
            );

        if (number.length !== 13)
            return Notiflix.Notify.failure(
                'Enter valid 13 digits number / Введите корректный 13-ти значный номер'
            );
        dispatch(addContacts(contact));
        reset();
    };

    useEffect(() => {
        setIsDisabled(false);
        const contactFinder = contacts.find(
            contact =>
                contact.name.toLowerCase() === name.toLowerCase() ||
                contact.number === number
        );

        if (contactFinder) {
            setIsDisabled(true);
            Notiflix.Notify.warning(
                `${name} ${number} is already in contacts / уже есть в списке ваших контактов.`
            );
            // reset();
        }
    }, [name, number, contacts]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Name:
                <input
                    type="text"
                    name="name"
                    placeholder="John Brown"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                />
            </label>

            <label>
                Number:
                <input
                    type="tel"
                    name="number"
                    placeholder="+380 12 345 6789"
                    className={styles.phoneInputCountry}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    value={number}
                    onChange={e => setNumber(e.currentTarget.value)}
                />
            </label>

            <button
                className={styles.submitButton}
                type="submit"
                disabled={isDisabled}
            >
                add contact
                <TiUserAddOutline size={20} className={styles.icon} />
            </button>
        </form>
    );
}

// Form.propTypes = {
//     addContact: PropTypes.func,
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//             id: PropTypes.string.isRequired,
//         })
//     ),
// };
