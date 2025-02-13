import { useState, useRef } from 'react';
import { Box, Button, Typography, LinkButton, Flex } from '@strapi/design-system';
import { Upload, Check } from '@strapi/icons';
import axios from 'axios';

type ActionButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSource: any;
  attributes: string[];
};

const bigBtn = {
  width: '100px',
};

const smBtn = {
  width: '50px',
};

const ActionButton = ({ videoSource, attributes }: ActionButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Upload Media');
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus('Uploading..');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await axios.post('/asaid-strapi-plugin/upload', formData);
      if (uploadResponse.data.success) {
        setStatus('Processing..');
        const processResponse = await axios.post('/asaid-strapi-plugin/process-media', {
          videoSource,
          attributes,
          tempFolder: uploadResponse.data.tempFolder,
          tempSourcePath: uploadResponse.data.tempSourcePath,
        });
        if (processResponse.data.success) {
          alert('File processed and uploaded successfully');
          window.location.reload();
        } else {
          alert(`Error processing file: ${processResponse.data.error}`);
        }
      } else {
        alert(`Error uploading file: ${uploadResponse.data.error}`);
      }
    } catch (error) {
      console.error('Error uploading or processing file:', error);
      alert('Error uploading or processing file');
    } finally {
      setLoading(false);
      setStatus('Upload Media');
    }
  };

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const uploadedAttribute = attributes.find(attr => videoSource[attr]);

  return (
    <Box>
      {uploadedAttribute ?
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
            href={videoSource[uploadedAttribute]}
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
            <Typography variant="pi">{status}</Typography>
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
              {status}
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