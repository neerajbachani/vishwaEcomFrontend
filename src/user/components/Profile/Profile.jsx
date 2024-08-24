import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateProfile, addAddress, updateAddress, deleteAddress } from '../../redux/Auth/Action';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Rating,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircleOutline,
} from '@mui/icons-material';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [addressDialog, setAddressDialog] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '',
  });

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUser(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (user) {
      setEditedUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateProfile(editedUser)).then(() => {
      dispatch(getUser(jwt)); // Fetch updated user data
      setEditMode(false);
    });
  };

  const handleAddressDialogOpen = (addressId = null) => {
    setEditAddressId(addressId);
    if (addressId) {
      const address = user.address.find(addr => addr._id === addressId);
      setNewAddress(address);
    } else {
      setNewAddress({
        streetAddress: '',
        city: '',
        state: '',
        pincode: '',
        mobile: '',
      });
    }
    setAddressDialog(true);
  };

  const handleAddressDialogClose = () => {
    setAddressDialog(false);
    setEditAddressId(null);
  };

  const handleAddressInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = () => {
    if (editAddressId) {
      dispatch(updateAddress(editAddressId, newAddress)).then(() => {
        dispatch(getUser(jwt)); // Fetch updated user data
        handleAddressDialogClose();
      });
    } else {
      dispatch(addAddress(newAddress)).then(() => {
        dispatch(getUser(jwt)); // Fetch updated user data
        handleAddressDialogClose();
      });
    }
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId)).then(() => {
      dispatch(getUser(jwt)); // Fetch updated user data
    });
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  if (error) {
    return <Container><Typography color="error">Error: {error}</Typography></Container>;
  }

  if (!user) {
    return <Container><Typography>No user data available</Typography></Container>;
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: 'primary.main', 
                fontSize: '2rem',
                mb: 2
              }}
            >
              {getInitials(`${user.firstName} ${user.lastName}`)}
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {editMode ? (
                <TextField
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                `${user.firstName} ${user.lastName}`
              )}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {editMode ? (
                <TextField
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
            </Typography>
            {editMode ? (
              <Button onClick={handleSubmit}>Save</Button>
            ) : (
              <Button startIcon={<EditIcon />} onClick={handleEditToggle}>Edit Profile</Button>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Addresses
          
          </Typography>
          {user.address && user.address.length > 0 ? (
            <Grid container spacing={2}>
              {user.address.map((addr) => (
                <Grid item xs={12} sm={6} key={addr._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {addr.streetAddress}
                      </Typography>
                      <Typography>
                        {addr.city}, {addr.state} {addr.pincode}
                      </Typography>
                      <Typography>{addr.mobile}</Typography>
                      <Box mt={2}>
                        <Button startIcon={<EditIcon />} onClick={() => handleAddressDialogOpen(addr._id)}>Edit</Button>
                        <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteAddress(addr._id)}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No addresses found.</Typography>
          )}

          <Dialog open={addressDialog} onClose={handleAddressDialogClose}>
            <DialogTitle>{editAddressId ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogContent>
              <TextField
                name="streetAddress"
                label="Street Address"
                fullWidth
                value={newAddress.streetAddress}
                onChange={handleAddressInputChange}
                margin="normal"
              />
              <TextField
                name="city"
                label="City"
                fullWidth
                value={newAddress.city}
                onChange={handleAddressInputChange}
                margin="normal"
              />
              <TextField
                name="state"
                label="State"
                fullWidth
                value={newAddress.state}
                onChange={handleAddressInputChange}
                margin="normal"
              />
              <TextField
                name="pincode"
                label="Pincode"
                fullWidth
                value={newAddress.pincode}
                onChange={handleAddressInputChange}
                margin="normal"
              />
              <TextField
                name="mobile"
                label="Mobile"
                fullWidth
                value={newAddress.mobile}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddressDialogClose}>Cancel</Button>
              <Button onClick={handleAddressSubmit}>Save</Button>
            </DialogActions>
          </Dialog>

          {/* Reviews section remains the same */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
