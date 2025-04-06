import { useState, useRef } from 'react';
import { Box, Button, Typography, LinkButton, Flex } from '@strapi/design-system';
import { Upload, Check } from '@strapi/icons';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type ActionButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSource: any;
  type: 'video' | 'trailer';
};

const bigBtn = {
  width: '100px',
};

const smBtn = {
  width: '50px',
};

const MAX_CHUNK_SIZE = 50 * 1024 * 1024; // 50MB

const ActionButton = ({ videoSource, type }: ActionButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Upload Media');
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to split the file into chunks
  const splitFile = (file: File) => {
    const chunks = [];
    let start = 0;
    while (start < file.size) {
      const end = Math.min(start + MAX_CHUNK_SIZE, file.size);
      chunks.push(file.slice(start, end));
      start = end;
    }
    return chunks;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus('Uploading..');

    const chunks = splitFile(file);
    const uploadId = uuidv4();
    const fileExtension = file.name.split('.').pop();

    // Prepare wakeLock
    let wakeLock: WakeLockSentinel | null = null;

    try {
      // Request a screen wake lock
      wakeLock = await navigator.wakeLock.request('screen');
      if (wakeLock) {
        console.log('Screen Wake Lock requested');
        wakeLock.addEventListener('release', () => {
          if (wakeLock) {
            console.log('Screen Wake Lock released:', wakeLock.released);
          }
        });
      }

      let uploadResponse;
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', i.toString());
        formData.append('totalChunks', chunks.length.toString());
        formData.append('fileExtension', fileExtension);

        uploadResponse = await axios.post('/asaid-strapi-plugin/upload', formData);

        if (!uploadResponse.data.success) {
          alert(`Error uploading file chunk: ${uploadResponse.data.error}`);
          throw new Error(`Error uploading file chunk: ${uploadResponse.data.error}`);
        }
      }

      setStatus('Processing..');
      const processResponse = await axios.post('/asaid-strapi-plugin/process-media', {
        videoSource,
        attributes: [type === 'video' ? 'videoObject' : 'trailerObject'],
        tempFolder: uploadResponse?.data?.tempFolder,
        tempSourcePath: uploadResponse?.data?.tempSourcePath,
      });

      if (processResponse.data.success) {
        alert('File processed and uploaded successfully');
        window.location.reload();
      } else {
        alert(`Error processing file: ${processResponse.data.error}`);
      }
    } catch (error) {
      console.error('Error uploading or processing file:', error);
      alert('Error uploading or processing file');
    } finally {
      // Release the wake lock
      if (wakeLock) {
        await wakeLock.release();
      }

      setLoading(false);
      setStatus('Upload Media');
    }
  };

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const uploadedAttribute = videoSource[type === 'video' ? 'videoObject' : 'trailerObject'];
  const link = videoSource[type === 'video' ? 'videoLink' : 'trailerLink'];

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
        </Flex>
      ) : loading ?
        (
          <Button style={bigBtn} loading>
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
              variant={link ? "danger-light" : null}
              disabled={loading}
              onClick={handleUpload}
            >
              {status}
            </Button>
            <input
              type="file"
              accept="video/mp4"
              onChange={processUpload}
              ref={inputRef}
              style={{ display: 'none' }}
            />
            {link && (
              <LinkButton
                href={link}
                isexternal="true"
                style={smBtn}
                variant="secondary"
              >
                Visit
              </LinkButton>
            )}
          </Flex>
        )
      }
    </Box>
  );
};

export default ActionButton;
