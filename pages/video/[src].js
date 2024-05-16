import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function VideoPage() {
  const router = useRouter();
  const { src } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Video</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <video className={styles.videoPlayer} src={`/uploads/${src}`} controls />
      </main>
    </div>
  );
}

