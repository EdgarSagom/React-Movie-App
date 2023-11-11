import { FaSpinner } from 'react-icons/fa';
import './Spinner.css';

export default function Spinner() {
    return (
        <div className='spinner'>
            <FaSpinner className={styles.spinning} size={60} />
        </div>
    )
}
