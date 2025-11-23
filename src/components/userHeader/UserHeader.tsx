import Button from "../ui/button/Button";
import styles from "./UserHeader.module.css";

interface UserHeaderProps {
    avatarUrl: string;
    name: string;
    username: string;
    bio?: string;

    repos: number;
    followers: number;
    following: number;

    githubUrl: string;
}

function UserHeader({
    avatarUrl,
    name,
    username,
    bio,
    repos,
    followers,
    following,
    githubUrl
}: UserHeaderProps) {
    return (
        <div className={styles.wrapper}>
            <img src={avatarUrl} alt={name} className={styles.avatar} />

            <div className={styles.info}>
                <div className={styles.main}>
                    <h2 className={styles.name}>{name} @{username}</h2>
                    {bio && <p className={styles.bio}>{bio}</p>}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{repos}</span>
                        <span className={styles.statLabel}>репозитории</span>
                    </div>

                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{followers}</span>
                        <span className={styles.statLabel}>подписчики</span>
                    </div>

                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{following}</span>
                        <span className={styles.statLabel}>подписки</span>
                    </div>
                </div>

                <Button onClick={() => window.open(githubUrl, "_blank")}>
                    Открыть на GitHub
                </Button>
            </div>    
        </div>
    );
}

export default UserHeader;