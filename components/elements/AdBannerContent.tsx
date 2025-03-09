import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdBanner } from '@/types/ads';
import { getAdBanners } from '@/lib/api';

type LeaderboardSize = '728x90' | '320x50';
type SidebarSize = '160x600' | '160x300';

interface BaseProps {
  type: 'leaderboard' | 'sidebar' | 'rectangle';
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

const AdBannerContent = ({ type, size, dynamic = false }: AdBannerContentProps) => {
  const [randomAdBanner, setRandomAdBanner] = useState<AdBanner | null>(null);

  useEffect(() => {
    async function fetchAdBanners() {
      const { adBanners } = await getAdBanners();
      if (adBanners.length > 0) {
        const randomBanner = adBanners[Math.floor(Math.random() * adBanners.length)];
        setRandomAdBanner(randomBanner);
      }
    }

    fetchAdBanners();
  }, []);

  if (!randomAdBanner) return null;

  const renderBanner = () => {
    switch (type) {
      case 'leaderboard':
        if (dynamic) {
          return (
            <>
              {randomAdBanner.banner320x50 && (
                <div className="ad-banner position-relative mt-4 d-block d-md-none">
                  <div className="banner320x50 text-center">
                    <a href={randomAdBanner.destinationLink} target="_blank">
                      <Image
                        className="img-banner w-100"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner320x50?.url}`}
                        alt={randomAdBanner.name}
                        width={randomAdBanner.banner320x50?.width}
                        height={randomAdBanner.banner320x50?.height}
                      />
                    </a>
                  </div>
                </div>
              )}
              {randomAdBanner.banner728x90 && (
                <div className="ad-banner position-relative mt-4 d-none d-md-block">
                  <div className="banner728x90 text-center">
                    <a href={randomAdBanner.destinationLink} target="_blank">
                      <Image
                        className="img-banner w-100"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner728x90?.url}`}
                        alt={randomAdBanner.name}
                        width={randomAdBanner.banner728x90?.width}
                        height={randomAdBanner.banner728x90?.height}
                      />
                    </a>
                  </div>
                </div>
              )}
            </>
          );
        } else {
          if (size === '728x90' && randomAdBanner.banner728x90) {
            return (
              <div className="ad-banner position-relative mt-4">
                <div className="banner728x90 text-center">
                  <a href={randomAdBanner.destinationLink} target="_blank">
                    <Image
                      className="img-banner w-100"
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner728x90?.url}`}
                      alt={randomAdBanner.name}
                      width={randomAdBanner.banner728x90?.width}
                      height={randomAdBanner.banner728x90?.height}
                    />
                  </a>
                </div>
              </div>
            );
          } else if (size === '320x50' && randomAdBanner.banner320x50) {
            return (
              <div className="ad-banner position-relative mt-4">
                <div className="banner320x50 text-center">
                  <a href={randomAdBanner.destinationLink} target="_blank">
                    <Image
                      className="img-banner w-100"
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner320x50?.url}`}
                      alt={randomAdBanner.name}
                      width={randomAdBanner.banner320x50?.width}
                      height={randomAdBanner.banner320x50?.height}
                    />
                  </a>
                </div>
              </div>
            );
          }
        }
        break;
      case 'sidebar':
        if (size === '160x600' && randomAdBanner.banner160x600) {
          return (
            <div className="ad-banner position-relative mt-4">
              <div className="banner160x600 text-center">
                <a href={randomAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner160x600?.url}`}
                    alt={randomAdBanner.name}
                    width={randomAdBanner.banner160x600?.width}
                    height={randomAdBanner.banner160x600?.height}
                  />
                </a>
              </div>
            </div>
          );
        } else if (size === '160x300' && randomAdBanner.banner160x300) {
          return (
            <div className="ad-banner position-relative mt-4">
              <div className="banner160x300 text-center">
                <a href={randomAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner160x300?.url}`}
                    alt={randomAdBanner.name}
                    width={randomAdBanner.banner160x300?.width}
                    height={randomAdBanner.banner160x300?.height}
                  />
                </a>
              </div>
            </div>
          );
        }
        break;
      case 'rectangle':
        if (randomAdBanner.banner300x250) {
          return (
            <div className="ad-banner position-relative mt-4">
              <div className="banner300x250 text-center">
                <a href={randomAdBanner.destinationLink} target="_blank">
                  <Image
                    className="img-banner"
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner300x250?.url}`}
                    alt={randomAdBanner.name}
                    width={randomAdBanner.banner300x250?.width}
                    height={randomAdBanner.banner300x250?.height}
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