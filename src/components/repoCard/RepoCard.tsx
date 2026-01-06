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

    onClick?: () => void;
}

function RepoCard({
    name,
    description,
    language,
    languageColor = "#ffffff",
    stars,
    forks,
    updatedAt,
    onClick,
}: RepoCardProps) {
    return (
        <div className={styles.card} onClick={onClick}>
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

            <p className={styles.update}>
                обновлено {formatDate(updatedAt)}
            </p>
        </div>
    );
}

export default RepoCard;

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
