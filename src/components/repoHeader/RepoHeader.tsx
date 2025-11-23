import Button from "../ui/button/Button";

import styles from "./RepoHeader.module.css";

import starIcon from "../../assets/icons/stars.svg";
import forkIcon from "../../assets/icons/forks.svg";
import watchersIcon from "../../assets/icons/watchers.svg";

interface RepoHeaderProps {
    name: string;
    description?: string;
    stars: number;
    forks: number;
    watchers: number;
    githubUrl: string;
}

function RepoHeader({
    name,
    description,
    stars,
    forks,
    watchers,
    githubUrl
}: RepoHeaderProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.textBlock}>
                    <h1 className={styles.title}>{name}</h1>
                    {description && (
                        <p className={styles.desc}>{description}</p>
                    )}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <img src={starIcon} alt="" className={styles.icon} />
                        <span className={styles.value}>{stars}</span>
                        <span className={styles.label}>stars</span>
                    </div>

                    <div className={styles.statItem}>
                        <img src={forkIcon} alt="" className={styles.icon} />
                        <span className={styles.value}>{forks}</span>
                        <span className={styles.label}>forks</span>
                    </div>

                    <div className={styles.statItem}>
                        <img src={watchersIcon} alt="" className={styles.icon} />
                        <span className={styles.value}>{watchers}</span>
                        <span className={styles.label}>watchers</span>
                    </div>
                </div>
            </div>

            <Button onClick={() => window.open(githubUrl, "_blank")}>
                Открыть на GitHub
            </Button>
        </div>
    );
}

export default RepoHeader;