import { useState } from "react";
import axios from "axios";
import{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from "formik";
import * as yup from "yup" //VALIDATION LIBRARY
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Password } from "@mui/icons-material";

// Import the Cloudinary classes. 
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

//https://localhost:7172
const CLOUDINARY_UPLOAD_PRESET = "dtu8pzhll";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dtu8pzhll/image/upload";

const registerSchema = yup.object().shape({
    username:yup.string().required("required"),
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    password:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    country:yup.string().required("required"),
    bio:yup.string().optional().nullable(),
    profilePicture:yup.string().optional(),
    coverPicture:yup.string().optional(),
    phoneNumber:yup.string().optional().nullable(),

});

const loginSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
})

const initialValuesRegister = {
    username:"",
    firstName:"",
    lastName:"",
    password:"",
    email:"",
    country:"",
    bio:"",
    profilePicture:"",
    coverPicture:"",
    phoneNumber:""
}

const initialValuesLogin = {
    email:"",
    password:""
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType ==="register";


    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        try {
          const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
          return response.data.secure_url;
        } catch (err) {
          console.error(err);
        }
      };

    const register = async(values, onSubmitProps) =>{
        //this allows us to send form info with image
        if (values.profilePicture) {
            const imgUrl = await uploadToCloudinary(values.profilePicture);
            console.log("profile picture URL: " + imgUrl);
            values.profilePicture = imgUrl;
          }

        const formData = new FormData();
        for(let value in values){
            formData.append(value, values[value])
        }

        //API call using formData
        const savedUserRsponse = await fetch(
            "https://localhost:7172/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        const savedUser= await savedUserRsponse.json();
        onSubmitProps.resetForm();

        if(savedUser){
            setPageType("login");
        }
    }

    const login = async(values, onSubmitProps) =>{
        const loggedInRsponse = await fetch(
            "https://localhost:7172/auth/login",
            {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );

        const loggedIn = await loggedInRsponse.json();
        onSubmitProps.resetForm();
        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.username,
                    token: loggedIn.token
                })
            );
            navigate("/home")
        }
    };

    const handleFormSubmit = async(values, onSubmitProps) =>{
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik 
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema:registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            })=> (
                <form onSubmit={handleSubmit}>
                    <Typography fontWeight="500" variant="h3" sx={{mb: "1.5rem"}}>
                        {isLogin ? "Sign in to your account" : "Sign up for an account"}
                    </Typography>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0,1fr))"
                        sx={{
                            "& > div":{gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                    >
                        {isRegister && (
                            <>
                              <TextField 
                                 label="Username" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.username}
                                 name="username"
                                 error={Boolean(touched.username) && Boolean(errors.username)}
                                 helperText={touched.username && errors.username}
                                 sx={{gridColumn: "span 4"}}
                              />
                              <TextField 
                                 label="First Name" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.firstName}
                                 name="firstName"
                                 error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                 helperText={touched.firstName && errors.firstName}
                                 sx={{gridColumn: "span 2"}}
                              />
                              <TextField 
                                 label="Last Name" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.lastName}
                                 name="lastName"
                                 error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                 helperText={touched.lastName && errors.lastName}
                                 sx={{gridColumn: "span 2"}}
                              />
                               <TextField 
                                 label="Phone Number" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.phoneNumber}
                                 name="phoneNumber"
                                 error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                                 helperText={touched.phoneNumber && errors.phoneNumber}
                                 sx={{gridColumn: "span 2"}}
                              />
                              <TextField 
                                 label="Country" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.country}
                                 name="country"
                                 error={Boolean(touched.country) && Boolean(errors.country)}
                                 helperText={touched.country && errors.country}
                                 sx={{gridColumn: "span 2"}}
                              />
                              <TextField 
                                 label="Bio" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.bio}
                                 name="bio"
                                 error={Boolean(touched.bio) && Boolean(errors.bio)}
                                 helperText={touched.bio && errors.bio}
                                 sx={{gridColumn: "span 4"}}
                              />
                              <Box
                                 gridColumn="span 4"
                                 border={`1px solid ${palette.neutral.medium}`}
                                 borderRadius="5px"
                                 p="1rem"
                              >
                                <Dropzone
                                   acceptedFiles=".jpg,.jpeg,.png"
                                   multiple={false}
                                   onDrop={(acceptedFiles) => 
                                    setFieldValue("profilePicture" , acceptedFiles[0])
                                   }
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <Box
                                          {...getRootProps()}
                                          border={`2px dashed ${palette.primary.main}`}
                                          p="1rem"
                                          sx={{"&:hover":{ cursor:"pointer"}}}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.profilePicture?(
                                                <p>Add profile pic here</p>
                                            ):(
                                                <FlexBetween>
                                                    <Typography>{values.profilePicture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                              </Box>
                            </>
                        )} {/*JUST FOR REGISTER SECTION */}

                             <TextField 
                                 label="Email" 
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.email}
                                 name="email"
                                 error={Boolean(touched.email) && Boolean(errors.email)}
                                 helperText={touched.email && errors.email}
                                 sx={{gridColumn: "span 2"}}
                              />
                              <TextField 
                                 label="Password" 
                                 type="password"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.password}
                                 name="password"
                                 error={Boolean(touched.password) && Boolean(errors.password)}
                                 helperText={touched.password && errors.password}
                                 sx={{gridColumn: "span 2"}}
                              />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover":{color: palette.primary.main}
                            }}
                        >
                         {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                          onClick={() =>{
                            setPageType(isLogin ? "register":"login")
                            resetForm();
                          }}
                          sx={{
                            textDecoration:"underline",
                            color: palette.primary.main,
                            "&:hover" :{
                                cursor: "pointer",
                                color: palette.primary.light,
                            }
                          }}
                        >
                          {isLogin 
                          ? "Don't have an account? Sing up here." 
                          : "Already have an account? Login here."
                          }

                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
};

export default Form;