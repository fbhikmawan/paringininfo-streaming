import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Box,
  Link,
  Flex,
  PageLink,
  Pagination,
  PreviousLink,
  NextLink,
} from '@strapi/design-system';

import { Trash } from '@strapi/icons';

import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';

import ActionButton from './ActionButton';

const PublishingTable = () => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videoSources, setVideoSources] = useState<any[]>([]);

  const postsPerPage = 5;

  const handleFetchPosts = async (page: number) => {
    const start = (page - 1) * postsPerPage;
    try {
      // Get video-sources from asaid-strapi-plugin plugin
      const response = await axios.get(`/asaid-strapi-plugin/video-sources?start=${start}`);
      // Check if response.data is an array
      if (Array.isArray(response.data.videoSources)) {
        setVideoSources(response.data.videoSources);
        setPageCount(Math.ceil(response.data.totalPosts / postsPerPage));
      } else {
        console.error("Unexpected response data:", response.data.videoSources);
      }
    } catch (error) {
      console.error("Error fetching video sources:", error);
    }
  };

  const handlePageChange = (e: FormEvent, page: number) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
    handleFetchPosts(page);
  };
  
  const handleDeletePost = async (id: string) => {
    await axios.delete(`/asaid-strapi-plugin/delete-video-source?videoSourceDocumentId=${id}`, {});
    handleFetchPosts(1);
  };

  useEffect(() => {
    handleFetchPosts(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box>
        <Box padding={8} margin={20}>
          <Table colCount={9} rowCount={videoSources.length + 1}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma" textColor="neutral600">
                    Video ID
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma" textColor="neutral600">
                    Video Type
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma" textColor="neutral600">
                    Video Name
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma" textColor="neutral600">
                    Upload Video
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma" textColor="neutral600">
                    Upload Trailer
                  </Typography>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {videoSources.map((videoSource: any) => (
                <Tr key={videoSource.id}>
                  <Td>
                    <Typography textColor="neutral800">{videoSource.video?.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{videoSource.video?.video_type?.name}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      <Link
                        href={`http://localhost:1337/admin/content-manager/collection-types/api::video.video/${videoSource.video?.documentId}`}
                      >
                        { videoSource.video?.name }
                      </Link>
                    </Typography>
                  </Td>
                  <Td>
                    <ActionButton videoSource={videoSource} attribute="videoLink" />
                  </Td>
                  <Td>
                    <ActionButton videoSource={videoSource} attribute="trailerLink" />
                  </Td>
                  <Td>
                    <Trash
                      onClick={() => {
                        handleDeletePost(videoSource.documentId);
                      }}
                      style={{ cursor: 'pointer', color: 'red' }}
                      width={20}
                      height={20}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {videoSources.length <= 0 ? (
        <Flex
          gap={{
            large: 2,
          }}
          direction={{
            medium: 'column',
          }}
          alignItems={{
            initial: 'center',
          }}
        >
          <Typography variant="sigma" padding={20} margin={30} textColor="warning600">
            Nothing Found!
          </Typography>
        </Flex>
      ) : null}
      {videoSources.length > 0 ? (
        <Pagination activePage={currentPage} pageCount={pageCount}>
          <PreviousLink onClick={(e: FormEvent) => handlePageChange(e, currentPage - 1)}>
            Go to previous page
          </PreviousLink>
          {Array.from({ length: pageCount }, (_, index) => (
            <PageLink
              key={index}
              number={index + 1}
              onClick={(e: FormEvent) => handlePageChange(e, index + 1)}
            >
              Go to page {index + 1}
            </PageLink>
          ))}
          <NextLink onClick={(e: FormEvent) => handlePageChange(e, currentPage + 1)}>
            Go to next page
          </NextLink>
        </Pagination>
      ) : null}
    </>
  );
};

export default PublishingTable;