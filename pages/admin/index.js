import { useState } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import styles from '../../styles/Admin.module.css';
import Link from 'next/link';

const fetcher = url => axios.get(url).then(res => res.data);

function AdminPage() {
  const { data: videos, error } = useSWR('/api/videos', fetcher);
  const [videoData, setVideoData] = useState({ id: '', title: '', description: '', src: '' });
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/videos/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      mutate('/api/videos'); // Re-fetch videos
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/videos/delete', { data: { id } });
      mutate('/api/videos'); // Re-fetch videos
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video.');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('/api/videos/update', videoData);
      console.log('Response:', response.data);
      mutate('/api/videos'); // Re-fetch videos
      alert('Video updated successfully!');
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Failed to update video.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      <nav className={styles.nav}>
        <Link href="/admin/videos">Videos</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={videoData.title}
          onChange={e => setVideoData({ ...videoData, title: e.target.value })}
          className={styles.inputText}
        />
        <input
          type="text"
          placeholder="Description"
          value={videoData.description}
          onChange={e => setVideoData({ ...videoData, description: e.target.value })}
          className={styles.inputText}
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className={styles.inputFile}
        />
        <button type="submit" className={styles.button}>Add Video</button>
      </form>

      <form onSubmit={handleUpdate} className={styles.form}>
        <input
          type="text"
          placeholder="ID"
          value={videoData.id}
          onChange={e => setVideoData({ ...videoData, id: e.target.value })}
          className={styles.inputText}
        />
        <input
          type="text"
          placeholder="Title"
          value={videoData.title}
          onChange={e => setVideoData({ ...videoData, title: e.target.value })}
          className={styles.inputText}
        />
        <input
          type="text"
          placeholder="Description"
          value={videoData.description}
          onChange={e => setVideoData({ ...videoData, description: e.target.value })}
          className={styles.inputText}
        />
        <button type="submit" className={styles.button}>Update Video</button>
      </form>

      <div className={styles.videoList}>
        <h2>Video List</h2>
        {error && <div>Failed to load videos.</div>}
        {!videos && <div>Loading...</div>}
        {videos && videos.map((video) => (
          <div key={video.id} className={styles.videoItem}>
            <h3 className={styles.videoItemTitle}>{video.title}</h3>
            <p className={styles.videoItemDescription}>{video.description}</p>
            <button onClick={() => handleDelete(video.id)} className={styles.videoItemButton}>Delete</button>
            <button onClick={() => setVideoData(video)} className={styles.videoItemButton}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;

