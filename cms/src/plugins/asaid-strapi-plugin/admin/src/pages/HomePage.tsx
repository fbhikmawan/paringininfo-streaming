import { Main, Box, Typography, Button, Flex } from '@strapi/design-system';
import PublishingTable from '../components/PublishingTable';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateNewPost = () => {
    navigate('/content-manager/collectionType/api::video.video/create');
  };

  return (
    <Main padding={5}>
      <Box paddingBottom={3}>
        <Typography variant="alpha">ASAid Strapi Plugin</Typography>
        <Flex justifyContent="space-between" alignItems="center" paddingTop={2}>
          <Typography variant="epsilon">Manage and publish your video content seamlessly.</Typography>
          <Button onClick={handleCreateNewPost} variant="secondary">Create New Post</Button>
        </Flex>
      </Box>
      <PublishingTable />
    </Main>
  );
};

export { HomePage };