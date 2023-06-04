import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    const getPostsRequest = {
      UserId: userId,
      pageNumber: 1,
      pageSize: 15,
    };

    console.log(token);
    const response = await axios.get(
      `https://localhost:7172/api/posts?UserId=${getPostsRequest.UserId}&pageNumber=${getPostsRequest.pageNumber}&pageSize=${getPostsRequest.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const posts = await response.data;
    dispatch(setPosts({ posts }));
    setIsLoading(false);
  };

  const getUserPosts = async () => {
    const pageNumber = 1;
    const pageSize = 15;
    const response = await axios.get(
      `https://localhost:7172/api/posts/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const posts = await response.data;
    dispatch(setPosts({ posts }));
    setIsLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    }, 1000); // The delay in milliseconds
    
    // Clear timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {isLoading ? (
      <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
    ) : (
      posts.$values?.map(
        ({
          UserId,
          PostId,
          Username,
          Text,
          Country,
          MediaUrl,
          UserProfilePicture,
          Likes,
          Comments,
          Shares,
          IsLiked,
        }) => (
          <PostWidget
            key={PostId}
            postId={PostId}
            postUserId={UserId}
            username={Username}
            description={Text}
            location={Country}
            picturePath={MediaUrl}
            userPicturePath={UserProfilePicture}
            likes={Likes}
            comments={Comments}
            shares={Shares}
            isLiked={IsLiked}
          />
        )
      )
    )}
  </>
  );
};

export default PostsWidget;
