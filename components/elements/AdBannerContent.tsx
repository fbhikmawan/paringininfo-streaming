import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdBanner } from '@/types/ads';
import { getAdBanners, incrementDisplayCount } from '@/lib/api';

type LeaderboardSize = '728x90' | '320x50';
type SidebarSize = '160x600' | '160x300';

interface BaseProps {
  type: 'leaderboard' | 'sidebar' | 'rectangle';
  className?: string;
}

interface LeaderboardProps extends BaseProps {
  type: 'leaderboard';
  size?: LeaderboardSize;
  dynamic?: boolean;
}

interface SidebarProps extends BaseProps {
  type: 'sidebar';
  size: SidebarSize;
  dynamic?: boolean;
}

interface RectangleProps extends BaseProps {
  type: 'rectangle';
  size?: never;
  dynamic?: boolean;
}

type AdBannerContentProps = LeaderboardProps | SidebarProps | RectangleProps;

const AdBannerContent = ({ type, size, dynamic = false, className = '' }: AdBannerContentProps) => {
  const [selectedAdBanner, setSelectedAdBanner] = useState<AdBanner | null>(null);

  useEffect(() => {
    async function fetchAdBanners() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let filters: Record<string, string> = {};
      switch (type) {
        case 'leaderboard':
          filters = dynamic 
            ? { 'filters[$or][0][banner728x90][$ne]': 'null', 'filters[$or][1][banner320x50][$ne]': 'null' } 
            : { [`filters[banner${size}][$ne]`]: 'null' };
          break;
        case 'sidebar':
          filters = { [`filters[banner${size}][$ne]`]: 'null' };
          break;
        case 'rectangle':
          filters = { 'filters[banner300x250][$ne]': 'null' };
          break;
      }

      const { adBanners } = await getAdBanners(filters);
      if (adBanners.length > 0) {
        const selectedBanner = adBanners[0]; // Select the banner with the lowest display count
        setSelectedAdBanner(selectedBanner);

        // Increment the display count
        await incrementDisplayCount(selectedBanner.documentId, selectedBanner.displayCount);
      }
    }

    fetchAdBanners();
  }, [type, size, dynamic]);

  if (!selectedAdBanner) return null;

  const renderBanner = () => {
    switch (type) {
      case 'leaderboard':
        if (dynamic) {
          return (
            <>
              {selectedAdBanner.banner320x50 && (
                <div className={`ad-banner position-relative d-block d-md-none ${className}`}>
                  <div className="banner320x50 text-center">
                    <a href={selectedAdBanner.destinationLink} target="_blank">
                      <Image
                        className="img-banner w-100"
                        src={`${process.env.STRAPI_URL}${selectedAdBanner.banner320x50?.url}`}
                        alt={selectedAdBanner.name}
                        width={selectedAdBanner.banner320x50?.width}
                        height={selectedAdBanner.banner320x50?.height}
                      />
                    </a>
                  </div>
                </div>
              )}
              {(selectedAdBanner.banner728x90 || !selectedAdBanner.banner320x50) && (
                <div className={`ad-banner position-relative ${!selectedAdBanner.banner320x50 ? 'd-block' : 'd-none d-md-block'} ${className}`}>
                  <div className="banner728x90 text-center">
                    <a href={selectedAdBanner.destinationLink} target="_blank">
                      <Image
                        className="img-banner w-100"
                        src={`${process.env.STRAPI_URL}${selectedAdBanner.banner728x90?.url}`}
                        alt={selectedAdBanner.name}
                        width={selectedAdBanner.banner728x90?.width}
                        height={selectedAdBanner.banner728x90?.height}
                      />
                    </a>
                  </div>
                </div>
              )}
            </>
          );
        } else {
          if (size === '728x90' && selectedAdBanner.banner728x90) {
            return (
              <div className={`ad-banner position-relative ${className}`}>
                <div className="banner728x90 text-center">
                  <a href={selectedAdBanner.destinationLink} target="_blank">
                    <Image
                      className="img-banner w-100"
                      src={`${process.env.STRAPI_URL}${selectedAdBanner.banner728x90?.url}`}
                      alt={selectedAdBanner.name}
                      width={selectedAdBanner.banner728x90?.width}
                      height={selectedAdBanner.banner728x90?.height}
                    />
                  </a>
                </div>
              </div>
            );
          } else if (size === '320x50' && selectedAdBanner.banner320x50) {
            return (
              <div className={`ad-banner position-relative ${className}`}>
                <div className="banner320x50 text-center">
                  <a href={selectedAdBanner.destinationLink} target="_blank">
                    <Image
                      className="img-banner w-100"
                      src={`${process.env.STRAPI_URL}${selectedAdBanner.banner320x50?.url}`}
                      alt={selectedAdBanner.name}
                      width={selectedAdBanner.banner320x50?.width}
                      height={selectedAdBanner.banner320x50?.height}
                    />
                  </a>
                </div>
              </div>
            );
          }
        }
        break;
      case 'sidebar':
        if (size === '160x600' && selectedAdBanner.banner160x600) {
          return (
            <div className={`ad-banner position-relative ${className}`}>
              <div className="banner160x600 text-center">
                <a href={selectedAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.STRAPI_URL}${selectedAdBanner.banner160x600?.url}`}
                    alt={selectedAdBanner.name}
                    width={selectedAdBanner.banner160x600?.width}
                    height={selectedAdBanner.banner160x600?.height}
                  />
                </a>
              </div>
            </div>
          );
        } else if (size === '160x300' && selectedAdBanner.banner160x300) {
          return (
            <div className={`ad-banner position-relative ${className}`}>
              <div className="banner160x300 text-center">
                <a href={selectedAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.STRAPI_URL}${selectedAdBanner.banner160x300?.url}`}
                    alt={selectedAdBanner.name}
                    width={selectedAdBanner.banner160x300?.width}
                    height={selectedAdBanner.banner160x300?.height}
                  />
                </a>
              </div>
            </div>
          );
        }
        break;
      case 'rectangle':
        if (selectedAdBanner.banner300x250) {
          return (
            <div className={`ad-banner position-relative ${className}`}>
              <div className="banner300x250 text-center">
                <a href={selectedAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.STRAPI_URL}${selectedAdBanner.banner300x250?.url}`}
                    alt={selectedAdBanner.name}
                    width={selectedAdBanner.banner300x250?.width}
                    height={selectedAdBanner.banner300x250?.height}
                  />
                </a>
              </div>
            </div>
          );
        }
        break;
      default:
        return null;
    }
  };

  return renderBanner();
};

export default AdBannerContent;