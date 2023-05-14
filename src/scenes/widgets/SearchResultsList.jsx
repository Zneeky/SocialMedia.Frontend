import React from "react";
import { Box } from "@mui/material";
import Friend from "components/Frined";
import SearchedProfile from "./SearchedProfile";

const SearchResultsList = ({profileValues}) =>{

    return(
        <Box overflow="auto">
            <>
                {profileValues.map(
                 ({
                    UserId,
                    Name,
                    UserProfilePicture
                  }) => 
                  (
                    <SearchedProfile
                        key={UserId} 
                        UserId={UserId}
                        Name={Name}
                        ProfilePicture={UserProfilePicture}
                    />
                  )
                )}
            </>
        </Box>
    )
}

export default SearchResultsList;