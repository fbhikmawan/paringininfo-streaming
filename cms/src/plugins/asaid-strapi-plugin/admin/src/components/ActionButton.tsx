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

    try {
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
      const response = await axios({
        method: 'post',
        url: '/asaid-strapi-plugin/process-media',
        data: {
          videoSource,
          attributes: [type === 'video' ? 'videoObject' : 'trailerObject'],
          tempFolder: uploadResponse?.data?.tempFolder,
          tempSourcePath: uploadResponse?.data?.tempSourcePath,
        },
        responseType: 'stream',
      });

      response.data.on('data', (chunk: Buffer) => {
        const message = chunk.toString();
        console.log(message);
        if (message.includes('Process completed successfully')) {
          alert('File processed and uploaded successfully');
          window.location.reload();
        } else if (message.includes('Error during process media')) {
          alert(`Error processing file: ${message}`);
        } else {
          setStatus(message);
        }
      });
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
