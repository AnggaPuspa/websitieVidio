import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  const router = useRouter();
  const { data: videos, error } = useSWR('/api/videos', fetcher); // Pastikan URL '/api/videos' sesuai dengan endpoint yang benar

  if (error) return <div>Failed to load videos.</div>;
  if (!videos) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Nonton Film</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>Nonton Film</div>
        <input type="text" placeholder="Search" className={styles.searchBar} />
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li>Beranda</li>
              <li>indo</li>
              <li>jav</li>
              <li>barat</li>
            </ul>
          </nav>
        </aside>

        <main className={styles.main}>
          <div className={styles.grid}>
            {videos.map((video, index) => (
              <div key={index} className={styles.card} onClick={() => router.push(`/video/${video.src}`)}>
                <video className={styles.thumbnail} src={video.src} controls />
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        <p>Suka Co li</p>
      </footer>
    </div>
  );
}

