import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

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
        src="https://www.tvadsongs.uk/wp-content/uploads/kfc-delivery-adverts-8211-8216-breaking-the-law-8217-FjQHHoJa-yg.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>KFC</Typography>
        <Typography color={medium}>KFCDelivery.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      From juicy chicken to unforgettable moments, KFC brings people together. 
      Join the finger-lickin' fun today!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;