'use client';

import { useRef, useEffect, useState } from 'react';
import AdBannerContent from '@/components/elements/AdBannerContent';
import PlayerOvenPlayer from '@/components/elements/PlayerOvenPlayer';

interface OvenPlayerModalProps {
  modalId: string;
  streamUrl: string;
}

export default function OvenPlayerModal({ modalId, streamUrl }: OvenPlayerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
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

  return (
    <>
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
              <PlayerOvenPlayer
                streamUrl={streamUrl}
                shouldPlay={shouldPlay}
              />
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