import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget"
import axios from "axios";


const PostsWidget = ({userId, isProfile = false}) =>{
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

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
          dispatch(setPosts({posts}));
    };

    const getUserPosts = async () => {
        const pageNumber=1;
        const pageSize=15;
        const response = await axios.get(
            `https://localhost:7172/api/posts/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );        

          const posts= await response.data;
          dispatch(setPosts({posts}));
    };

    useEffect(() =>{
        if(isProfile) {
            getUserPosts();
        }else{
            getPosts();
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {posts.map(
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
                    Shares
                }) => (
                    <PostWidget
                    key={PostId} 
                    postId={PostId}
                    postUserId={UserId}
                    username={Username}
                    description={Text}
                    location={Country}
                    picturePath={ MediaUrl}
                    userPicturePath={UserProfilePicture}
                    likes={Likes}
                    comments={Comments}
                    shares={Shares}
                    />
                )
            )}
        </>
    )
};

export default PostsWidget;