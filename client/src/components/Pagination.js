import React from 'react';
import { IconButton, Center, Text, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (numberOfPages <= 1) return null;

    const pagesToShow = 5; // Number of pages to show

    // Calculate the range of pages to display
    let startPage = 1;
    let endPage = numberOfPages;

    if (numberOfPages > pagesToShow) {
      const offset = Math.floor(pagesToShow / 2);

      if (currentPage - offset > 1) {
        startPage = currentPage - offset;
      } else {
        startPage = 1;
      }

      endPage = startPage + pagesToShow - 1;

      if (endPage > numberOfPages) {
        endPage = numberOfPages;
        startPage = endPage - pagesToShow + 1;
      }
    }

    const pageButtons = [];

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <Text
          key={page}
          fontWeight={page === currentPage ? 'bold' : 'normal'}
          mt={1}
          mx={2}
          cursor="pointer"
          onClick={() => dispatch(setCurrentPage(page))}
        >
          {page}
        </Text>
      );
    }

    return (
      <Center mt={4}>
        <IconButton
          mx={2}
          variant="solid"
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => {
            if (currentPage > 1) {
              dispatch(setCurrentPage(currentPage - 1));
            }
          }}
        />

        <HStack spacing={2}>{pageButtons}</HStack>

        <IconButton
          mx={2}
          variant="solid"
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (currentPage < numberOfPages) {
              dispatch(setCurrentPage(currentPage + 1));
            }
          }}
        />
      </Center>
    );
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default Pagination;
