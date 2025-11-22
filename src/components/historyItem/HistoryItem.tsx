import styles from "./HistoryItem.module.css";
import avatar from "../../assets/icons/avatar.svg";

interface HistoryItemProps {
    username: string;
    onClick?: () => void;
}

function HistoryItem({ username, onClick }: HistoryItemProps) {
    return (
        <div className={styles.item} onClick={onClick}>
            <img className={styles.avatar} src={avatar} alt="Аватар пользователя" />

            <div className={styles.info}>
                <p className={styles.username}>{username}</p>
                <p className={styles.note}>подпись</p>
            </div>
        </div>
    );
}

export default HistoryItem;