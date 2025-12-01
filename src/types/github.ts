export interface GithubUser {
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;

    public_repos: number;
    followers: number;
    following: number;
}

export interface GithubRepo {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    owner: { login: string };
}
