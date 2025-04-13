'use client';

import React, { useRef, useEffect, useState } from 'react';
import { YouTubeEmbed } from '@next/third-parties/google';

interface YouTubeEmbedModalProps {
  modalId: string;
  videoId: string;
}

export default function YouTubeEmbedModal({ modalId, videoId }: YouTubeEmbedModalProps) {
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
          <div className="modal-body d-flex justify-content-center p-1 p-sm-2 p-lg-3">
            {shouldPlay && (
              <YouTubeEmbed
                videoid={videoId}
                params="autoplay=0&controls=1&modestbranding=1&rel=0"
                style="width: 100%; height: auto; max-width: unset;"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}