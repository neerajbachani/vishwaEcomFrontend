import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContact, deleteContact } from '../../user/redux/Contact/Action';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
} from '@mui/material';

const AdminContactComponent = () => {
  const dispatch = useDispatch();
  const { contact, loading, error } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch, contact.deleteContact]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Contact Component
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {contact?.contacts?.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact._id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Avatar>{contact.user.firstName.charAt(0)}</Avatar>
                    <Box marginLeft={2}>
                      <Typography variant="h6" component="h3">
                        {`${contact.user?.firstName} ${contact.user?.lastName}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {contact.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box marginTop={2}>
                    <Typography variant="body1" fontWeight="bold">
                      Contact Details:
                    </Typography>
                    <Typography variant="body1">Name: {contact.name}</Typography>
                    <Typography variant="body1">Phone: {contact.phone}</Typography>
                    <Typography variant="body1">Message: {contact.message}</Typography>
                  </Box>
                  <Box marginTop={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminContactComponent;