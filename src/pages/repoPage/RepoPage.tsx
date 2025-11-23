import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import RepoHeader from "../../components/repoHeader/RepoHeader";
import RepoLanguagesCard from "../../components/repoLanguagesCard/RepoLanguagesCard";
import RepoInfoCard from "../../components/repoInfoCard/RepoInfoCard";
import ReadmeSection from "../../components/readmeSection/ReadmeSection";

import styles from "./RepoPage.module.css";

function RepoPage() {
    return (
        <div className={styles.container}>
            <Breadcrumbs items={["Поиск", "@username", "repo-name"]} />

            <RepoHeader
                name="Repo name"
                description="Описание репозитория"
                stars={120}
                forks={35}
                watchers={48}
                githubUrl="https://github.com/username/repo"
            />

            <div className={styles.infoWrapper}>
                <RepoLanguagesCard
                    languages={[
                        { name: "JavaScript", percent: 61.2, color: "#f1e05a" },
                        { name: "CSS", percent: 33.2, color: "#563d7c" },
                        { name: "HTML", percent: 5.2, color: "#e34c26" }
                    ]}
                />

                <RepoInfoCard
                    license="MIT"
                    branch="main"
                    updatedAt="2025-01-20T12:00:00Z"
                    sizeInMB={2.1}
                />
            </div>

            <ReadmeSection content={"# README\n\nТут будет текст readme"} />
        </div>
    );
}

export default RepoPage;
