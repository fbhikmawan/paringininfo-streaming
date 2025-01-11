'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  shouldPlay: boolean;
}

export default function VideoPlayer({ src, poster, shouldPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current!);
    }
  }, [src]);

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
    <video ref={videoRef} poster={poster} width={'100%'} height={'auto'} controls>
      Your browser does not support the video tag.
    </video>
  );
}