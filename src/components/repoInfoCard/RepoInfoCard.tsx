import styles from "./RepoInfoCard.module.css";

interface RepoInfoCardProps {
    license?: string;
    branch: string;
    updatedAt: string;
    sizeInMB: number;
}

function RepoInfoCard({ license, branch, updatedAt, sizeInMB }: RepoInfoCardProps) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Информация</h2>

            <div className={styles.row}>
                <span className={styles.label}>Лицензия</span>
                <span className={styles.value}>{license ?? "Нет"}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Default branch</span>
                <span className={styles.value}>{branch}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Размер репозитория</span>
                <span className={styles.value}>{sizeInMB} MB</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Последнее обновление</span>
                <span className={styles.value}>{formatDate(updatedAt)}</span>
            </div>
        </div>
    );
}

export default RepoInfoCard;

function formatDate(iso: string) {
    const date = new Date(iso);
    return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}