'use client';

import React, { useRef, useEffect, useState } from 'react';
import OvenPlayer from 'react-ovenplayer';

interface OvenPlayerModalProps {
  modalId: string;
  streamUrl: string;
}

export default function OvenPlayerModal({ modalId, streamUrl }: OvenPlayerModalProps) {
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
            {shouldPlay && (
              <div style={{ width: '100%', height: 'auto' }}>
                <OvenPlayer
                  config={{
                    sources: [
                      {
                        type: 'webrtc',
                        file: streamUrl,
                        label: "WebRTC Stream"
                      },
                    ]
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}