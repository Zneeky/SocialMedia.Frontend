import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
//import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper";
import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Friend from "components/Frined";
import UserImage from "components/UserImage";
import axios from "axios";

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
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsCurrent,setCurrentComments]=useState({});
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user.UserId);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;


  const handleInputBaseKeyDown = (event) => {
    if (event.keyCode === 13 && newComment.trim() !== "") {
      // Submit the input value
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    if(comments!=={}){
      setCurrentComments(comments)
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const  handleCommentSubmit = async (event) => {

    const body={
      Text:newComment,
      MediaUrl:null,
      UserId:loggedInUserId,
      PostId:postId,
    }

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
    setCurrentComments(response)

    setNewComment("");
  };

  const handleToggleComments = () => {
    setIsComments(!isComments);
  };

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://localhost:7172/api/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={username}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
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
            placeholder={"Turn the tide, comment on waVe🌊"}
            multiline
            sx={{
              mt: "10px",
              mb:"10px",
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
            onChange={(e) =>setNewComment(e.target.value)}
            value={newComment}
          />
          <Divider />
          {commentsCurrent.map((Id,Text,MediaUrl,Username,ProfilePicture,CreatedAt,Likes) => (
            <Box key={Id}>
              <FlexBetween>
              <UserImage image={MediaUrl}/>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {Text}
              </Typography>
              </FlexBetween>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
