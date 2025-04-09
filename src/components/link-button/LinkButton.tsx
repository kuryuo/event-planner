import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
    label: string;
    href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => {
    return <a className={styles.link} href={href}>{label}</a>;
};

export default LinkButton;
