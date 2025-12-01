const BASE_URL = "https://api.github.com";

async function request<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        const message =
            res.status === 404
                ? "Пользователь или репозиторий не найден"
                : "Ошибка загрузки данных";

        throw new Error(message);
    }

    return res.json();
}

export function getUser(username: string) {
    return request<any>(`${BASE_URL}/users/${username}`);
}

export function getUserRepos(username: string) {
    return request<any[]>(`${BASE_URL}/users/${username}/repos?per_page=100`);
}

export function getRepo(owner: string, repo: string) {
    return request<any>(`${BASE_URL}/repos/${owner}/${repo}`);
}

export function getRepoLanguages(owner: string, repo: string) {
    return request<Record<string, number>>(
        `${BASE_URL}/repos/${owner}/${repo}/languages`
    );
}

export async function getRepoReadme(owner: string, repo: string) {
    const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/readme`);

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Ошибка загрузки README");
    }

    const data = await res.json();

    return atob(data.content);
}