import styles from './taks-container.module.css'
import { States } from '../../types/colorStates';

interface ITaskContainer {
    name: string;
    state: States
}

export const TaskContainer: React.FC<ITaskContainer> = ({name, state}) => {
    return <div className={`${styles.main} ${styles[state]}`}>
        <h2>{name}</h2>
        <ul>

        </ul>
    </div>
}