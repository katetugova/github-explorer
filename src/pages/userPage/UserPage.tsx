import UserHeader from "../../components/userHeader/UserHeader";
import RepoCard from "../../components/repoCard/RepoCard";
import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";

import arrowIcon from "../../assets/icons/arrow.svg";

import styles from "./UserPage.module.css";

function UserPage() {
    const username = "username";

    return (
        <div className={styles.container}>
            <Breadcrumbs items={["Поиск", "@username"]} />
            
            <UserHeader
                avatarUrl=""
                name="Имя профиля"
                username={username}
                bio="Описание профиля"
                repos={20}
                followers={13}
                following={5}
                githubUrl="https://github.com/username"
            />

            <div className={styles.repoHeader}>
                <h2 className={styles.title}>Репозитории</h2>

                <div className={styles.filters}>
                    <div className={styles.selectWrapper}>
                        <select className={styles.select}>
                            <option>Язык</option>
                            <option>JavaScript</option>
                            <option>TypeScript</option>
                            <option>Python</option>
                        </select>
                        <img src={arrowIcon} className={styles.arrow} alt="" />
                    </div>
                    
                    <div className={styles.selectWrapper}>
                        <select className={styles.select}>
                            <option>Сортировка</option>
                            <option>По звёздам</option>
                            <option>По форкам</option>
                            <option>По обновлению</option>
                        </select>
                        <img src={arrowIcon} className={styles.arrow} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.repoList}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <RepoCard
                        key={i}
                        name="Название репозитория"
                        description="Описание"
                        language="JavaScript"
                        languageColor="#f1e05a"
                        stars={248}
                        forks={66}
                        updatedAt="2025-01-20T12:00:00Z"
                    />
                ))}
            </div>
        </div>
    );
}

export default UserPage;