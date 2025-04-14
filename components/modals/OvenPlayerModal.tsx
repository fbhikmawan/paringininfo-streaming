'use client';

import { useRef, useEffect, useState } from 'react';
import AdBannerContent from '@/components/elements/AdBannerContent';
import Script from 'next/script';

interface OvenPlayerModalProps {
  modalId: string;
  streamUrl: string;
}

export default function OvenPlayerModal({ modalId, streamUrl }: OvenPlayerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerInstanceRef = useRef<any>(null); // To store the OvenPlayer instance
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Function to check viewport width
    const checkViewportWidth = () => {
      if (typeof window !== 'undefined') {
        setIsMobileView(window.innerWidth < 992);
      }
    };

    // Initial check
    checkViewportWidth();
  }, []);

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

  useEffect(() => {
    if (playerRef.current && window.OvenPlayer && !playerInstanceRef.current) {
      playerInstanceRef.current = window.OvenPlayer.create(playerRef.current, {
        sources: [
          {
            type: 'webrtc',
            file: streamUrl,
            label: 'WebRTC Stream',
          },
        ],
        webrtcConfig: {
          connectionTimeout: 2000,
        }
      });
    }

    if (playerInstanceRef.current) {
      if (shouldPlay) {
        playerInstanceRef.current.play();
      } else {
        playerInstanceRef.current.pause();
      }
    }
  }, [shouldPlay, streamUrl]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/ovenplayer@latest/dist/ovenplayer.js"
        strategy="lazyOnload"
      />
      <div
        className="modal"
        id={modalId}
        tabIndex={-1}
        aria-labelledby={`${modalId}Label`}
        ref={modalRef}
      >
        <div className="modal-dialog justify-content-center modal-dialog-centered modal-xl flex-column flex-lg-row">
          <div className="modal-content w-auto">
            <div className="modal-body d-flex justify-content-center p-0">
              {isMobileView ? (
                <AdBannerContent
                  type="leaderboard"
                  dynamic={true} />
              ) : (
                <AdBannerContent
                  type="sidebar"
                  size="160x600"
                  dynamic={false} />
              )}
            </div>
          </div>
          <div className="modal-content col-lg-8 p-0">
            <div className="modal-body d-flex justify-content-center p-1 p-sm-2 p-lg-3">
              <div
                ref={playerRef}
                style={{ width: '100%', height: 'auto' }}
              ></div>
            </div>
          </div>
        <div className="modal-content w-auto">
          <div className="modal-body d-flex justify-content-center p-0">
            {isMobileView ? (
              <AdBannerContent 
              type="leaderboard" 
              dynamic={true} />
            ) : (
              <AdBannerContent
              type="sidebar"
              size="160x600"
              dynamic={false} />
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}