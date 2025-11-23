import styles from "./RepoLanguagesCard.module.css";

interface Language {
    name: string;
    percent: number;
    color: string;
}

interface Props {
    languages: Language[];
}

function RepoLanguagesCard({ languages }: Props) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Языки репозитория</h2>

            <div className={styles.bar}>
                {languages.map((lang, index) => {
                    const isLast = index === languages.length - 1;

                    return (
                        <div
                            key={lang.name}
                            className={styles.segment}
                            style={{
                                width: isLast ? "auto" : `${lang.percent}%`,
                                flex: isLast ? 1 : "none",
                                backgroundColor: lang.color
                            }}
                        />
                    );
                })}
            </div>

            <div className={styles.list}>
                {languages.map((lang, index) => (
                    <div key={index} className={styles.item}>
                        <span
                            className={styles.dot}
                            style={{ backgroundColor: lang.color }}
                        />
                        {lang.name} — {lang.percent}%
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RepoLanguagesCard;
