import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "state";
import Friend from "components/Frined";
import UserImage from "components/UserImage";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import PostDialog from "components/PostDialog";

const PostWidget = ({
  postId,
  postUserId,
  username,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  shares,
  isLiked,
}) => {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [isMyPost, setMyPost] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes.$values.length);
  const [newComment, setNewComment] = useState("");
  const [commentsCurrent, setCurrentComments] = useState({});
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user.UserId);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const updateComments = (updatedComments) => {
    setCurrentComments(updatedComments);
  };

  const updateLikes = (newLikeCount, likedStatus) => {
    setLikeCount(newLikeCount);
    setIsLikedPost(likedStatus);
  };

  const handleMore = () => {
    setMore(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMore(false);
  };

  /*const checkIsLiked = async () => {
    const body = {
      UserId: loggedInUserId,
      PostId: postId,
    };
    const likeState = await axios.get(
      `https://localhost:7172/api/posts/likes?userId=${body.UserId}&postId=${body.PostId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await likeState.data;
    setIsLikedPost(response);
  };*/

  const handleInputBaseKeyDown = (event) => {
    if (event.keyCode === 13 && newComment.trim() !== "") {
      // Submit the input value
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    if (comments !== {}) {
      setCurrentComments(comments);
    }
    if (loggedInUserId === postUserId) {
      setMyPost(true);
    }
  }, [comments, likes]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCommentSubmit = async (event) => {
    const body = {
      Text: newComment,
      MediaUrl: null,
      UserId: loggedInUserId,
      PostId: postId,
    };

    const postComment = await axios.post(
      `https://localhost:7172/api/posts/comments`,
      body, // Request body for a POST request
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await postComment.data;
    console.log(response);
    setCurrentComments(response);
    setNewComment("");
  };

  //Logic might be added here
  const handleToggleComments = () => {
    setIsComments(!isComments);
  };

  //Delete post API call

  const handleDeletePost = async () => {
    await axios
      .delete(`https://localhost:7172/api/posts?postId=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => dispatch(removePost(postId))) // Reload page after delete
      .catch((error) => console.error(`Error: ${error}`)); // Log any errors
  };

  //Post liking API calls
  const handleLike = async () => {
    const body = {
      UserId: loggedInUserId,
      PostId: postId,
    };
    if (isLikedPost) {
      const newAmaount = likeCount - 1;
      setLikeCount(newAmaount);
      setIsLikedPost(false);

      const response = await axios.delete(
        `https://localhost:7172/api/posts/likes?userId=${body.UserId}&postId=${body.PostId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      const newAmaount = likeCount + 1;
      setLikeCount(newAmaount);
      setIsLikedPost(true);

      const response = await axios.post(
        `https://localhost:7172/api/posts/likes?userId=${body.UserId}&postId=${body.PostId}`,
        null, // Pass null as the request body since it's a POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  return (
    <WidgetWrapper m="2rem 0" sx={{ pl: 0, pr: 0 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Friend
          friendId={postUserId}
          name={username}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <IconButton
          sx={{ "&:hover": { backgroundColor: "transparent" } }}
          onClick={handleMore}
        >
          <MoreHoriz />
        </IconButton>
      </Box>
      <Typography color={main} sx={{ mt: "1rem", pl: "1.5rem", pr: "1.5rem" }}>
        {description}
      </Typography>
      <Dialog open={more} onClose={handleClose}>
        <Box sx={{ width: "400px", height: "300px" }}>
          <Button sx={{ width: "100%", height: "40px", color: "red" }}>
            {" "}
            Report
          </Button>
          <Divider />
          <Button
            onClick={handleDeletePost}
            sx={{ width: "100%", height: "40px", color: "red" }}
          >
            {" "}
            Delete
          </Button>
          <Divider />
        </Box>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            maxHight: "95%",
            maxWidth: "95%",
            m: "auto",
            borderRadius: "4px",
            background: "transparent",
            justifyContent: "center",
            boxSizing: "border-box",
            display: "flex",
            overflow: "hidden",
          },
        }}
      >
        <PostDialog
          postId={postId}
          postUserId={postUserId}
          username={username}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          updateComments={updateComments}
          isLikedPost={isLikedPost}
          likeCount={likeCount}
          updateLikes={updateLikes}
        />
      </Dialog>
      {picturePath && (
        <img
          style={{
            maxHeight: "520px",
            width: "100%",
            height: "auto",
            marginTop: "0.75rem",
          }}
          alt="post"
          src={`${picturePath}`}
          onDoubleClick={handleOpen}
        />
      )}
      <FlexBetween mt="0.25rem" sx={{ pl: "1.5rem" }}>
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              {isLikedPost ? (
                <FavoriteOutlined sx={{ color: palette.primary.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <FontAwesomeIcon icon={faComment} />
            </IconButton>
            {commentsCurrent.$values && (
              <Typography>{commentsCurrent.$values.length}</Typography>
            )}
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          <InputBase
            placeholder={"Turn the tide, comment a waVe🌊..."}
            multiline
            sx={{
              height: "6vh",
              width: "100%",
              transition: "rows 0.2s",
              overflowWrap: "break-word", // Enable text wrapping
              wordWrap: "break-word", // Alternative property for older browsers
              padding: "1rem 2rem",
              overflowX: "hidden", // Set a maximum height
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: palette.primary.main,
                borderRadius: "8px",
                border: "none",
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                },
              },
            }}
            onKeyDown={handleInputBaseKeyDown}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Divider />
          <Box
            height="290px"
            pl="25px"
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: palette.primary.main,
                borderRadius: "8px",
                border: "none",
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                },
              }, // For Internet Explorer and Edge
            }}
          >
            {commentsCurrent.$values.map((comment) => (
              <Box
                key={comment.Id}
                mt="6px"
                mr="10px"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                  gap="1rem"
                >
                  <UserImage image={comment.ProfilePicture} size="35px" />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                      gap="0.5rem"
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {comment.Username}
                      </Typography>
                      <Typography>{comment.Text}</Typography>
                    </Box>
                    <Box mt="5px">
                      <Box
                        sx={{
                          display: "flex",
                        }}
                        gap="1rem"
                      >
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8E8E8E" }}
                        >
                          {`${comment.CreatedAt}`}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8E8E8E" }}
                        >
                          {comment.Likes ? comment.Likes.length : 0} likes
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#8E8E8E" }}
                        >
                          {comment.Replies ? comment.Replies.length : 0} replies
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <FavoriteBorderOutlined sx={{ fontSize: "15px" }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
