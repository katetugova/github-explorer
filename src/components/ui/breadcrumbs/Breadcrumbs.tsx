import styles from "./Breadcrumbs.module.css";

interface BreadcrumbsProps {
    items: string[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <div className={styles.breadcrumbs}>
            {items.map((item, index) => (
                <div key={index} className={styles.part}>
                    <span>{item}</span>
                    
                    {index < items.length - 1 && (
                        <span className={styles.separator}>/</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Breadcrumbs;