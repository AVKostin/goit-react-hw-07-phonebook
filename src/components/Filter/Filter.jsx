import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, getFilter } from 'redux/contactsSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    // const handleFilterChange = e => dispatch(setFilter(e.currentTarget));

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>Find contacts by name</p>
            <input
                className={styles.filter}
                name="filter"
                value={filter}
                onChange={e => dispatch(setFilter(e.currentTarget.value))}
            />
        </div>
    );
};
export default Filter;
