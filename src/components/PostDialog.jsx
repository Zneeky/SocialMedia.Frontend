import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FavoriteRounded,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Friend from "components/Frined";
import UserImage from "components/UserImage";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const PostDialog = ({
  postId,
  postUserId,
  username,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.$values.length);
  const [newComment, setNewComment] = useState("");
  const [commentsCurrent, setCurrentComments] = useState({});
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user.UserId);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const isSM = useMediaQuery("(min-width:782px)");
  const isMD = useMediaQuery("(min-width:1000px)");
  const isL = useMediaQuery("(min-width:1200px)");
  const isXL = useMediaQuery("(min-width:1500px)");

  const checkIsLiked = async () => {
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
  };

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
    checkIsLiked();
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

  //Post liking API calls
  const handleLike = async () => {
    const body = {
      UserId: loggedInUserId,
      PostId: postId,
    };
    if (isLikedPost) {
      const response = await axios.delete(
        `https://localhost:7172/api/posts/likes?userId=${body.UserId}&postId=${body.PostId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAmaount = likeCount - 1;
      setLikeCount(newAmaount);

      setIsLikedPost(false);
    } else {
      const response = await axios.post(
        `https://localhost:7172/api/posts/likes?userId=${body.UserId}&postId=${body.PostId}`,
        null, // Pass null as the request body since it's a POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAmaount = likeCount + 1;
      setLikeCount(newAmaount);
      setIsLikedPost(true);
    }
  };

  if (isXL) {
  } else if (isL) {
  } else if (isMD) {
    return (
      <Box
        sx={{
          width: "855px",
          height: "520px",
          justifyContent: "center",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Box
          maxWidth="372px"
          maxHeight="520px"
          alt="post"
          aspectRatio="372/520"
          flexBasis="372px"
          justifyContent="center"
          flexGrow={1}
          flexShring={1}
          display="flex"
          flexDirection="column"
          position="relative"
          overflow="hidden"
          style={{ marginTop: "0.75rem" }}
          backgroundColor="rgb(0,0,0)"
        >
          <Box
            width="372px"
            height="465px"
            component="img"
            src={`${picturePath}`}
          />
        </Box>
        <Box
          sx={{
            pl: 0,
            pr: 0,
            border: `solid 1px ${palette.neutral.light}`,
            background: palette.background.default,
            height: "520px",
            width: "483px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          <Box p="14px 4px 14px 16px">
            <Friend
              friendId={postUserId}
              name={username}
              subtitle={location}
              userPicturePath={userPicturePath}
            />
            <Typography
              color={main}
              sx={{ mt: "1rem", pl: "1.5rem", pr: "1.5rem" }}
            >
              {description}
            </Typography>
          </Box>

          <Divider />

          <Box>
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
                            {`${comment.CreatedAt}d`}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#8E8E8E" }}
                          >
                            {comment.Likes ? comment.Likes.length : 0} likes
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#8E8E8E" }}
                          >
                            {comment.Replies ? comment.Replies.length : 0}{" "}
                            replies
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <FavoriteBorderOutlined sx={{ fontSize: "15px" }} />
                </Box>
              ))}
          </Box>
          <FlexBetween mt="0.25rem" sx={{ pl: "1.5rem", pr: "1.5rem" }}>
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
                  mt: "10px",
                  mb: "10px",
                  height: "6vh",
                  width: "100%",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "8px",
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
            </Box>
          )}
        </Box>
      </Box>
    );
  } else if (isSM) {
  } else {
  }
};

export default PostDialog;
