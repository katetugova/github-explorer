import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
    label: string;
    to?: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <div className={styles.breadcrumbs}>
            {items.map((item, index) => (
                <div key={index} className={styles.part}>
                    {item.to ? (
                        <Link className={styles.link} to={item.to}>
                            {item.label}
                        </Link>
                    ) : (
                        <span>{item.label}</span>
                    )}

                    {index < items.length - 1 && (
                        <span className={styles.separator}>/</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Breadcrumbs;