import { render, screen } from "@testing-library/react";
import RepoCard from "./RepoCard";

test("отображает название репозитория", () => {
    render(
        <RepoCard
            name="my-repo"
            language="TypeScript"
            stars={10}
            forks={5}
            updatedAt="2024-01-01"
        />
    );

    expect(screen.getByText("my-repo")).toBeInTheDocument();
});