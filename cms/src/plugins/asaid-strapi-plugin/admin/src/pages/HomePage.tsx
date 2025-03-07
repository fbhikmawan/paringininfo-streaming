import { useState, useEffect } from 'react';
import { Main, Box, Typography, Flex } from '@strapi/design-system';
import axios from 'axios';
import PublishingTable from '../components/PublishingTable';

const HomePage = () => {
  const [storageInfo, setStorageInfo] = useState<{ bucketName: string; totalSize: number; remainingSpace: number } | null>(null);

  useEffect(() => {
    const fetchStorageInfo = async () => {
      try {
        const response = await axios.get('/asaid-strapi-plugin/bucket-storage-info');
        setStorageInfo(response.data);
      } catch (error) {
        console.error('Error fetching storage info:', error);
      }
    };

    fetchStorageInfo();
  }, []);

  return (
    <Main padding={5}>
      <Box paddingBottom={3}>
        <Typography variant="alpha">ASAid Strapi Plugin</Typography>
        <Flex justifyContent="space-between" alignItems="center" paddingTop={2}>
          <Typography variant="epsilon">Manage and publish your video content seamlessly.</Typography>
        </Flex>
      </Box>
      {storageInfo && (
        <Flex justifyContent="flex-start" direction="column" alignItems="flex-start" paddingTop={2}>
          <Typography variant="epsilon">Usage Space: {(storageInfo.totalSize / (1024 * 1024)).toFixed(2)} MB</Typography>
          <Typography variant="epsilon">Remaining Space: {(storageInfo.remainingSpace / (1024 * 1024)).toFixed(2)} MB</Typography>
        </Flex>
      )}
      <PublishingTable />
    </Main>
  );
};

export { HomePage };