import React from "react";
import { Box,useTheme } from "@mui/material";
import SearchedProfile from "./SearchedProfile";

const SearchResultsList = ({profileValues}) =>{

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    console.log(profileValues);
    return(
            <>
                {profileValues.map(
                 ({
                    Name,
                    UserProfilePicture,
                    UserId,
                  }) => 
                  (
                    <SearchedProfile
                        key={UserId} 
                        SearchedUserId={UserId}
                        Name={Name}
                        ProfilePicture={UserProfilePicture}
                    />
                  )
                )}
            </>
    )
}

export default SearchResultsList;