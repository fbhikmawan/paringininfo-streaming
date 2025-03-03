'use client';

import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  hlsManifest: string;
  shouldPlay: boolean;
}

export default function VideoPlayer({ hlsManifest, shouldPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoUrl, setVideoUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [segments, setSegments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the presigned URLs for the HLS manifest and segments
    const fetchPresignedUrls = async () => {
      const response = await fetch(`/api/generate-presigned-url?manifestName=${hlsManifest}`);
      const data = await response.json();
      setVideoUrl(data.manifestUrl);
      setSegments(data.segments);
    };

    if (Hls.isSupported()) {
      // fetch the presigned URLs and load the video
      fetchPresignedUrls();

      const hls = new Hls();

      // Intercept the HLS requests to replace segment URIs with presigned URLs
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.config.xhrSetup = (xhr, url) => {
          const segment = segments.find(seg => url.endsWith(seg.uri));
          if (segment) {
            xhr.open('GET', segment.url, true);
          }
        };
      });

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current!);
    }
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (shouldPlay) {
        video.play().catch(e => console.error("Error playing video:", e));
      } else {
        video.pause();
      }
    }
  }, [shouldPlay]);

  return (
    <video ref={videoRef} width={'100%'} height={'auto'} controls>
      Your browser does not support the video tag.
    </video>
  );
}