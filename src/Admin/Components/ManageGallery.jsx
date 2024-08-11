import React from 'react'
import { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, Avatar, Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createGalleryPhoto, deleteGalleryPhoto, getGalleryPhotos } from "../../user/redux/Gallery/Action";

const ManageGallery = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryPhotoData, setGalleryPhotoData] = useState({
    image: "",
  });

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('image', file);
    });

    dispatch(createGalleryPhoto(formData))
      .then(() => {
        setGalleryPhotoData({ image: '' });
        setSelectedFiles([]);
        // Optionally show a success message here
      })
      .catch((error) => {
        console.error('Failed to create gallery photos:', error);
        // Optionally show an error message here
      });
  };

  const { gallery } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getGalleryPhotos());
  }, [dispatch, gallery.deleteGalleryPhoto]);

  const handleDeleteGalleryPhoto = (galleryPhotoId) => {
    console.log("delete photo", galleryPhotoId);
    dispatch(deleteGalleryPhoto(galleryPhotoId));
  };

  return (
    <div className="bg-[#1b1b1b]">
      <Typography variant="h3" sx={{ textAlign: "center" }} className="py-10 text-center">
        Add Photos to your Gallery
      </Typography>
      <form onSubmit={handleSubmit} className="min-h-[17rem]">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add Photo to your Gallery
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="">
        <Box width={"100%"}>
          <Card className="mt-2">
            <CardHeader
              title="All Photos"
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
            />
            <TableContainer>
              <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Link</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gallery?.galleryPhotos?.map((item) => (
                    <TableRow
                      hover
                      key={item._id}
                      sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                    >
                      <TableCell>
                        {item.image.map((imageUrl, index) => (
                          <Avatar
                            key={`${item._id}-${index}`}
                            alt={`Image ${index + 1}`}
                            src={imageUrl}
                            sx={{ marginRight: 1 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {item.image.join(", ")}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          variant="text"
                          onClick={() => handleDeleteGalleryPhoto(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default ManageGallery;
