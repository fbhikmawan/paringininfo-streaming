import { Button } from '@strapi/design-system';
import axios from 'axios';

type LiveStreamButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSource: any;
};

const LiveStreamButton = ({ videoSource }: LiveStreamButtonProps) => {
  const handleButtonClick = async () => {
    try {
      if (!videoSource.videoObject) {
        const videoObject = `live/${videoSource.video?.nameSlug}/stream.m3u8`;
        await axios.post(`/asaid-strapi-plugin/update-video-object`, {
          documentId: videoSource.documentId,
          videoObject,
        });
      } else {
        const baseUrl = 'rtmp://streaming.paringininfo.com';
        const rtmpUrl = `${baseUrl}/live/${videoSource.video?.nameSlug}`;
        navigator.clipboard.writeText(rtmpUrl);
        alert('RTMP URL has been copied to clipboard.');
      }
    } catch (error) {
      console.error('Error in handleButtonClick:', error);
    }
  };

  return (
    <Button onClick={handleButtonClick}>
      {videoSource.videoObject ? 'Copy RTMP URL' : 'Generate Stream URL'}
    </Button>
  );
};

export default LiveStreamButton;
