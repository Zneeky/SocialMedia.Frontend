import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [advert,setAdvert] = useState({company:"",site:"",picture:"",text:""})

  const handleAdvert = (()=>{
    const advertArray=[
     {company:"KFC",site:"KFCDelivery.com",picture:"https://www.tvadsongs.uk/wp-content/uploads/kfc-delivery-adverts-8211-8216-breaking-the-law-8217-FjQHHoJa-yg.jpg",text:"From juicy chicken to unforgettable moments, KFC brings people together. Join the finger-lickin' fun today!"}
    ,{company:"Microsoft",site:"microsoft.com",picture:"https://www.pcgamesn.com/wp-content/sites/pcgamesn/2023/05/windows-11-full-page-upgrade-advert.jpg",text:"Power your progress with our tools, sculpting tomorrow's technology today. Dream, create, and achieve with Microsoft."}
    ,{company:"DAZN",site:"DAZN.com",picture:"https://sportsmintmedia.com/wp-content/uploads/2021/09/DAZN-still-eyeing-Premier-League-rights.jpg",text:"Watch all sprots events including the matches of the Premier League exclusively on DAZN! Get your pass NOW!"}
    ,{company:"Logitech",site:"Logitech.com",picture:"https://cdn.arstechnica.net/wp-content/uploads/2021/11/IMG_0035.jpeg",text:" Breathe Life Into Every Keystroke. Precision meets innovation, delivering unmatched typing experience. Embrace the future of productivity with Logitech."}]
   
    const randomAdvert = advertArray[Math.floor(Math.random() * advertArray.length)];
  
    setAdvert(randomAdvert);
  })

  useEffect(()=>{
    handleAdvert();
  },[])
    

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={advert.picture}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>{advert.company}</Typography>
        <Typography color={medium}>{advert.site}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">{advert.text}</Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;