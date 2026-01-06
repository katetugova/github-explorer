import ReactMarkdown from "react-markdown";
import styles from "./ReadmeSection.module.css";

interface Props {
    content: string;
}

function ReadmeSection({ content }: Props) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>README</h2>

            <p className={styles.content}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </p>
        </div>
    );
}

export default ReadmeSection;