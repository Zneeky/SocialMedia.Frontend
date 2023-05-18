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
                {profileValues.$values.map(
                 ({
                    Name,
                    ProfilePicture,
                    UserId,
                  }) => 
                  (
                    <SearchedProfile
                        key={UserId} 
                        SearchedUserId={UserId}
                        ProfilePicture={ProfilePicture}
                        Name={Name}
                    />
                  )
                )}
            </>
    )
}

export default SearchResultsList;