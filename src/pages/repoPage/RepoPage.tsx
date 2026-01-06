import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { getRepo, getRepoLanguages, getRepoReadme } from "../../api/github";
import type { GithubRepo } from "../../types/github";

import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";
import RepoHeader from "../../components/repoHeader/RepoHeader";
import RepoLanguagesCard from "../../components/repoLanguagesCard/RepoLanguagesCard";
import RepoInfoCard from "../../components/repoInfoCard/RepoInfoCard";
import ReadmeSection from "../../components/readmeSection/ReadmeSection";

import styles from "./RepoPage.module.css";

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Rust: "#dea584",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    HTML: "#e34c26",
    CSS: "#563d7c",
};

function getColor(language: string) {
    return LANGUAGE_COLORS[language] ?? "#9ca3af";
}

function RepoPage() {
    const { username, repo } = useParams<{ username: string; repo: string }>();

    const [repoData, setRepoData] = useState<GithubRepo | null>(null);
    const [languages, setLanguages] = useState<Record<string, number>>({});
    const [readme, setReadme] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!username || !repo) return;

        let alive = true;

        setLoading(true);
        setError("");

        Promise.all([
            getRepo(username, repo),
            getRepoLanguages(username, repo),
            getRepoReadme(username, repo),
        ])
            .then(([repoRes, languagesRes, readmeRes]) => {
                if (!alive) return;
                setRepoData(repoRes);
                setLanguages(languagesRes);
                setReadme(readmeRes);
            })
            .catch((e: unknown) => {
                if (!alive) return;
                const message =
                    e instanceof Error ? e.message : "Ошибка загрузки репозитория";
                setError(message);
            })
            .finally(() => {
                if (!alive) return;
                setLoading(false);
            });

        return () => {
            alive = false;
        };
    }, [username, repo]);

    const languageStats = useMemo(() => {
        const entries = Object.entries(languages);
        const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

        if (total === 0) return [];

        return entries.map(([name, bytes]) => ({
            name,
            percent: Math.round((bytes / total) * 100),
            color: getColor(name),
        }));
    }, [languages]);

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Загрузка репозитория...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p>{error}</p>
            </div>
        );
    }

    if (!repoData) {
        return (
            <div className={styles.container}>
                <p>Репозиторий не найден</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs
                items={[
                    { label: "Поиск", to: "/" },
                    { label: `@${username}`, to: `/user/${username}` },
                    { label: repoData.name },
                ]}
            />

            <RepoHeader
                name={repoData.name}
                description={repoData.description ?? ""}
                stars={repoData.stargazers_count}
                forks={repoData.forks_count}
                watchers={repoData.subscribers_count}
                githubUrl={`https://github.com/${username}/${repoData.name}`}
            />

            <div className={styles.infoWrapper}>
                <RepoInfoCard
                    license={repoData.license?.name}
                    branch={repoData.default_branch}
                    updatedAt={repoData.updated_at}
                    sizeInMB={Number((repoData.size / 1024).toFixed(1))}
                />

                {languageStats.length > 0 && (
                    <RepoLanguagesCard languages={languageStats} />
                )}
            </div>

            {readme ? (
                <ReadmeSection content={readme} />
            ) : (
                <p>README не найден</p>
            )}
        </div>
    );
}

export default RepoPage;