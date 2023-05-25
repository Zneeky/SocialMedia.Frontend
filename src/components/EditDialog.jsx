import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  FingerprintRounded,
  CakeOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Grid,
  Avatar,
  TextField,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useState, useRef } from "react";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "z1rbueyh";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dtu8pzhll/image/upload";
//All we dǿ is just gǿ number one

const EditDialog = ({ open, handleClose, user, token, userId }) => {
  const dispatch = useDispatch();
  const [credentials, setNewCredentials] = useState({
    ProfilePicture: user.ProfilePicture,
    Name: user.Name,
    Bio: user.Bio,
    DateOfBirth: user.DateOfBirth,
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setNewCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (e) => {
    const dateAsString = e.target.value;
    console.log(dateAsString);
    setNewCredentials({
      ...credentials,
      DateOfBirth: dateAsString,
    });
  };
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`${CLOUDINARY_UPLOAD_URL}`, {
      method: "Post",
      body: formData,
    });

    const img = await res.json();
    console.log(img);
    return img.secure_url;
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCredentials({
        ...credentials,
        ProfilePicture: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveProfile = async (values, user) => {
    // Save profile logic
    console.log(user);
    try {
      if (values.ProfilePicture) {
        const imgUrl = await uploadToCloudinary(values.ProfilePicture);
        console.log("profile picture URL: " + imgUrl);
        values.ProfilePicture = imgUrl;
      }

      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }

      //API call using formData
      console.log(values);

      // save username
      const savedUserRsponse = await axios.patch(
        `https://localhost:7172/api/users/${userId}/edit`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedUser = await savedUserRsponse.data;

      // on successful save, close the modal
      dispatch(
        setLogin({
          user: savedUser,
          profile: savedUser,
          token: token,
        })
      );
      handleClose();
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Avatar
            src={credentials.ProfilePicture}
            sx={{ width: 56, height: 56, mt: "1rem" }}
          />
          <Button variant="contained" onClick={handleFileInputClick}>
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              name="Name"
              label="Name"
              type="text"
              fullWidth
              value={credentials.Name}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dateOfBirth"
              label="DateOfBirth"
              type="date"
              defaultValue="1990-01-01"
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Bio"
              label="Bio"
              type="text"
              multiline
              rows={3}
              fullWidth
              value={credentials.Bio}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleSaveProfile(credentials, user)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
