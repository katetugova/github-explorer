import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUser, getUserRepos } from "../../api/github";
import type { GithubRepo, GithubUser } from "../../types/github";

import UserHeader from "../../components/userHeader/UserHeader";
import RepoCard from "../../components/repoCard/RepoCard";
import Breadcrumbs from "../../components/ui/breadcrumbs/Breadcrumbs";

import arrowIcon from "../../assets/icons/arrow.svg";
import styles from "./UserPage.module.css";

type SortKey = "updated" | "stars" | "forks";

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

function getLanguageColor(language: string) {
    return LANGUAGE_COLORS[language] ?? "#9ca3af";
}

function UserPage() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
    const [sortKey, setSortKey] = useState<SortKey>("updated");

    useEffect(() => {
        if (!username) return;

        let alive = true;

        setLoading(true);
        setError("");

        Promise.all([getUser(username), getUserRepos(username)])
            .then(([u, r]) => {
                if (!alive) return;
                setUser(u);
                setRepos(r);

                setSelectedLanguage("all");
                setSortKey("updated");
            })
            .catch((e: unknown) => {
                if (!alive) return;
                const message =
                    e instanceof Error ? e.message : "Ошибка загрузки данных";
                setError(message);
            })
            .finally(() => {
                if (!alive) return;
                setLoading(false);
            });

        return () => {
            alive = false;
        };
    }, [username]);

    const languageOptions = useMemo(() => {
        const set = new Set<string>();

        for (const repo of repos) {
            set.add(repo.language ?? "Не указан");
        }

        return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, [repos]);

    const visibleRepos = useMemo(() => {
        const filtered =
            selectedLanguage === "all"
                ? repos
                : repos.filter(
                    (repo) => (repo.language ?? "Не указан") === selectedLanguage
                );

        const sorted = [...filtered].sort((a, b) => {
            if (sortKey === "stars") {
                return b.stargazers_count - a.stargazers_count;
            }

            if (sortKey === "forks") {
                return b.forks_count - a.forks_count;
            }

            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        return sorted;
    }, [repos, selectedLanguage, sortKey]);

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Загрузка...</p>
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

    if (!user) {
        return (
            <div className={styles.container}>
                <p>Пользователь не найден</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs
                items={[
                    { label: "Поиск", to: "/" },
                    { label: `@${user.login}` },
                ]}
            />

            <UserHeader
                avatarUrl={user.avatar_url}
                name={user.name ?? user.login}
                username={user.login}
                bio={user.bio ?? ""}
                repos={user.public_repos}
                followers={user.followers}
                following={user.following}
                githubUrl={`https://github.com/${user.login}`}
            />

            <div className={styles.repoHeader}>
                <h2 className={styles.title}>Репозитории</h2>

                <div className={styles.filters}>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <option value="all">Все языки</option>
                            {languageOptions
                                .filter((x) => x !== "all")
                                .map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                        </select>
                        <img src={arrowIcon} className={styles.arrow} alt="" />
                    </div>

                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.select}
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value as SortKey)}
                        >
                            <option value="updated">По обновлению</option>
                            <option value="stars">По звёздам</option>
                            <option value="forks">По форкам</option>
                        </select>
                        <img src={arrowIcon} className={styles.arrow} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.repoList}>
                {visibleRepos.length === 0 ? (
                    <p>Репозитории не найдены</p>
                ) : (
                    visibleRepos.map((repo) => {
                        const lang = repo.language ?? "Не указан";

                        return (
                            <RepoCard
                                key={repo.name}
                                name={repo.name}
                                description={repo.description ?? undefined}
                                language={lang}
                                languageColor={getLanguageColor(lang)}
                                stars={repo.stargazers_count}
                                forks={repo.forks_count}
                                updatedAt={repo.updated_at}
                                onClick={() => navigate(`/user/${user.login}/${repo.name}`)}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default UserPage;