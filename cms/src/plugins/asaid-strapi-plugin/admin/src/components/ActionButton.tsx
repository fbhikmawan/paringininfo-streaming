import { useState, useRef } from 'react';
import { Box, Button, Typography, LinkButton, Flex } from '@strapi/design-system';
import { Upload, Check } from '@strapi/icons';
import axios from 'axios';

type ActionButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSource: any;
  attribute: string;
};

const bigBtn = {
  width: '100px',
};

const smBtn = {
  width: '50px',
};

const ActionButton = ({ videoSource, attribute }: ActionButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = async (event: any) => {
    console.log(`ActionButton:`);
    console.log(`videoSource:`);
    console.log(videoSource);
    console.log(`attribute:`);
    console.log(attribute);

    console.log(`processUpload:`);
    console.log(event);

    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('videoSource', JSON.stringify(videoSource));
    formData.append('attribute', attribute);

    try {
      const response = await axios.post('/asaid-strapi-plugin/upload', formData);
      if (response.data.success) {
        alert('File uploaded successfully');
        // Reload the page
        window.location.reload();
      } else {
        alert(`Error uploading file: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box>
      {(attribute === 'videoLink' ? videoSource.videoLink : videoSource.trailerLink) ? 
      (
        <Flex
          gap={{
            large: 2,
          }}
          direction={{
            medium: 'row',
          }}
          alignItems={{
            initial: 'center',
          }}
        >
          <Button
            style={{ ...bigBtn, cursor: 'not-allowed' }}
            variant="success-light"
            startIcon={<Check />}
          >
            <Typography variant="pi">Uploaded</Typography>
          </Button>

          <LinkButton
            href={attribute === 'videoLink' ? videoSource.videoLink : videoSource.trailerLink}
            isexternal="true"
            style={smBtn}
            variant="secondary"
          >
            Visit
          </LinkButton>
        </Flex>
      ) : loading ? 
        (
          <Button style={bigBtn} loading textColor="neutral800">
            <Typography variant="pi">Uploading</Typography>
          </Button>
        ) : (
          <Flex
          gap={{
              large: 2,
            }}
            direction={{
              medium: 'row',
            }}
            alignItems={{
              initial: 'center',
            }}
          >
            <Button
              startIcon={<Upload />}
              variant="secondary"
              disabled={loading}
              onClick={handleUpload}
            >
              Upload Media
            </Button>
            <input
              type="file"
              accept="video/*"
              onChange={processUpload}
              ref={inputRef}
              style={{ display: 'none' }}
            />
          </Flex>
        )}
    </Box>
  );
};

export default ActionButton;