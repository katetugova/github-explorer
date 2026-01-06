import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/github";

import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import HistoryItem from "../../components/historyItem/HistoryItem";

import searchIcon from "../../assets/icons/search.svg";
import styles from "./HomePage.module.css";

const HISTORY_KEY = "github-search-history";
const MAX_HISTORY = 10;

function HomePage() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed);
    }, []);

    function saveHistory(nextHistory: string[]) {
        setHistory(nextHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    }

    function handleClearHistory() {
        saveHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    }

    async function handleSearch() {
        const username = query.trim();

        if (!username) {
            setError("Введите имя пользователя");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await getUser(username);

            const nextHistory = [username,...history.filter((x) => x !== username),].slice(0, MAX_HISTORY);
            saveHistory(nextHistory);

            navigate(`/user/${username}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Ошибка запроса");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>GitHub Explorer</h1>
                <p className={styles.subtitle}>
                    Быстрый доступ к профилям и репозиториям GitHub
                </p>
            </div>

            <div className={styles.search}>
                <div className={styles.inputWrapper}>
                    <img src={searchIcon} alt="Поиск" className={styles.icon} />
                    <Input
                        placeholder="Введите имя пользователя..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                </div>

                <Button onClick={handleSearch} disabled={isLoading}>
                    Поиск
                </Button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {history.length > 0 && (
                <>
                    <div className={styles.historyHeader}>
                        <h2>Недавно искали</h2>
                        <button className={styles.clear} onClick={handleClearHistory}>
                            Очистить все
                        </button>
                    </div>

                    <div className={styles.historyItems}>
                        {history.map((name) => (
                            <HistoryItem
                                key={name}
                                username={name}
                                onClick={() => navigate(`/user/${name}`)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;