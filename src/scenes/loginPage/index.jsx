import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import Lottie from "react-lottie";
import lottie from "lottie-web";
import WaveLottie from "lotties/WaveLottie.json";
import { LottieInteractivity, create } from '@lottiefiles/lottie-interactivity';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [waveHeight, setWaveHeight] = useState(300);
  const waveContainerRef = useRef(null);

  useEffect(() => {
    const waveContainer = waveContainerRef.current;
    const waveLottie = lottie.loadAnimation({
      container: waveContainer,
      animationData: WaveLottie,
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    const handleMouseMove = (event) => {
      if (waveContainerRef.current) {
        const cursorYPosition = event.clientY;
        const waveContainerTop = waveContainerRef.current.getBoundingClientRect().top;
        const maxWaveHeight = window.innerHeight - cursorYPosition + 500;
    
        let newWaveHeight = maxWaveHeight - waveContainerTop;
        if (newWaveHeight < 350) {
          newWaveHeight = 350;
        } else if (newWaveHeight > 550) {
          newWaveHeight = 550;
        }
    
        setWaveHeight(newWaveHeight);
        /*waveLottie.stop();*/
        /*waveLottie.goToAndStop(Math.round(newWaveHeight / 300 * waveLottie.getDuration()), true);
      */}
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      waveLottie.destroy();
    };
  }, []);
  

  

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          waVe
        </Typography>                                                                                                                                 
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.primary}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>                   
          Welcome to waVe, where connections are made and stories are shared.
          Join our vibrant community of creators, thinkers, and doers, and let's
          ride the waves of social media together!
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>

      {isNonMobileScreens && (
        <div ref={waveContainerRef} style={{ height: 300 }}>
        <Lottie
          options={{
            animationData: WaveLottie,
            loop: true,
            autoplay: true,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={waveHeight}
        />
      </div>
      )}
    </Box>
  );
};

export default LoginPage;
