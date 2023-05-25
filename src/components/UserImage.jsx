import { Box } from "@mui/material";
//objectFit:"cover",
const UserImage = ({image, size="60px"}) =>{
    return(
        <Box width={size} height={size}>
            <img 
              style={{borderRadius: "50%"}}
              width={size}
              height={size}
              alt="user"
              src={`${image}`}
              crossOrigin="anonymous"
            />
        </Box>
    )
}

export default UserImage;