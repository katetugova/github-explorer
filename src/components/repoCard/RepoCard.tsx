import styles from "./RepoCard.module.css";
import starIcon from "../../assets/icons/stars.svg";
import forkIcon from "../../assets/icons/forks.svg";

interface RepoCardProps {
    name: string;
    description?: string;
    language: string;
    languageColor?: string;
    stars: number;
    forks: number;
    updatedAt: string;
}

function RepoCard({
    name,
    description,
    language,
    languageColor = "#ffffff",
    stars,
    forks,
    updatedAt,
}: RepoCardProps) {
    const formattedDate = formatUpdatedAt(updatedAt);

    return (
        <div className={styles.card}>
            <div className={styles.main}>
                <h3 className={styles.name}>{name}</h3>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </div>

            <div className={styles.meta}>
                <span className={styles.language}>
                    <span
                        className={styles.langDot}
                        style={{ backgroundColor: languageColor }}
                    />
                    {language}
                </span>

                <div className={styles.stat}>
                    <img src={starIcon} className={styles.icon} alt="Stars" />
                    <span>{stars} stars</span>
                </div>

                <div className={styles.stat}>
                    <img src={forkIcon} className={styles.icon} alt="Forks" />
                    <span>{forks} forks</span>
                </div>
            </div>

            <p className={styles.update}>обновлено {formattedDate}</p>
        </div>
    );
}

export default RepoCard;

function formatUpdatedAt(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 0) return "сегодня";
    if (diff === 1) return "1 день назад";
    return `${diff} дней назад`;
}
