import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsUp as FarThumbsUp } from 'react-icons/fa';

import { useSelector } from 'react-redux';

const ShowLikes = ({ likes }) => {
  const { user } = useSelector(state => ({ ...state.auth }));

  const userId = user?.result?._id || user?.result?.googleId;

  if (likes?.length > 0) {
    return likes.find(like => like === userId) ? (
      <>
        <Icon as={FaThumbsUp} color="blue.500" />
        &nbsp;
        {likes.length > 2 ? (
          <Tooltip
            label={`You and ${likes.length - 1} other people likes`}
            aria-label="Likes"
          >
            <Text fontWeight="bold">{likes.length} Likes</Text>
          </Tooltip>
        ) : (
          <Text as="span" fontWeight="bold">
            {likes.length} Like{likes.length > 1 ? 's' : ''}
          </Text>
        )}
      </>
    ) : (
      <>
        <Icon as={FarThumbsUp} />
        &nbsp;
        {/* <Tooltip label="Please login to like tour" aria-label="Likes"> */}
        <Text as="span" fontWeight="bold">
          {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </Text>
        {/* </Tooltip> */}
      </>
    );
  }
  return (
    <>
      <Icon as={FarThumbsUp} />
      &nbsp;
      <Text as="span" fontWeight="bold">
        Like
      </Text>
    </>
  );
};

export default ShowLikes;
