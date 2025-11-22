import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import HistoryItem from "../../components/historyItem/HistoryItem";

import searchIcon from "../../assets/icons/search.svg";

import styles from "./HomePage.module.css";

function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>GitHub Explorer</h1>
                <p className={styles.subtitle}>Быстрый доступ к профилям и репозиториям GitHub</p>
            </div>

            <div className={styles.search}>
                <div className={styles.inputWrapper}>
                    <img src={searchIcon} alt="Поиск" className={styles.icon} />
                    <Input placeholder="Введите имя пользователя..." />
                </div>
                
                <Button>Поиск</Button>
            </div>

            <div className={styles.historyHeader}>
                <h2>Недавно искали</h2>
                <button className={styles.clear}>Очистить все</button>
            </div>

            <div className={styles.historyItems}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <HistoryItem key={i} username="Имя пользователя" />
                ))}
            </div>
        </div>
    );
}

export default HomePage;