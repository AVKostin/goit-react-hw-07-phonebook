import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, getFilter } from 'Redux/contactsSlice';

export default function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const handleFilterChange = e => dispatch(setFilter(e.currentTarget.value));

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>Find contacts by name</p>
            <input
                className={styles.filter}
                name="filter"
                value={filter}
                onChange={handleFilterChange}
            />
        </div>
    );
}
