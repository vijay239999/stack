import React, { useEffect, useState } from 'react';
import { getNgrokUrl } from './utils/getNgrokUrl';

export default function Mirraudio() {
  const [ngrokUrl, setNgrokUrl] = useState(null);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const url = await getNgrokUrl();
        setNgrokUrl(url);
      } catch (err) {
        console.error('Failed to get Ngrok URL:', err);
      }
    }

    fetchUrl();
  }, []);

  if (!ngrokUrl) return <p>Loading stream...</p>;

  return (
    <div>
      <h2>Live Audio Stream</h2>
      <audio controls autoPlay>
        <source src={`${ngrokUrl}/live`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
