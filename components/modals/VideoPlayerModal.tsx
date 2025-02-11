'use client';

import React, { useRef, useEffect, useState } from 'react';
import VideoPlayer from '../elements/VideoPlayer';

interface VideoPlayerModalProps {
  modalId: string;
  videoObject: string;
  posterSrc: string;
}

export default function VideoPlayerModal({ modalId, videoObject, posterSrc }: VideoPlayerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (!modalRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          if (modalRef.current?.classList.contains('show')) {
            setShouldPlay(true);
          } else {
            setShouldPlay(false);
          }
        }
      });
    });

    observer.observe(modalRef.current, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, [modalId]);

  return (
    <div
      className="modal"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}Label`}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <VideoPlayer 
              hlsManifest={videoObject} 
              poster={posterSrc}
              shouldPlay={shouldPlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}