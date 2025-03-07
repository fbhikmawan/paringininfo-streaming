import Image from "next/image";
import styles from './Preloader.module.css';

export default function Preloader() {
  return (
    <>
      <div className={styles.preloader}>
        <div className={styles.loadingCenter}>
          <div className={styles.loadingCenterAbsolute}>
            <Image src="/assets/img/preloader.svg" alt="Preloader" width={80} height={80} priority />
          </div>
        </div>
      </div>
    </>
  );
}