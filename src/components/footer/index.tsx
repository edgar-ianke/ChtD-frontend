import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div>
        <p className={`text ${styles.info}`}>
          Created by <a className={`text-bold ${styles.link}`} href="https://github.com/edgar-ianke">Edgar Ianke</a>
        </p>
        <p className={`text ${styles.info}`}>For studying purposes only</p>
      </div>
      <p className={`text ${styles.info}`}>2024</p>
    </footer>
  );
}
