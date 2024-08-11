import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../../Config/ApiConfig';
import {
  Box,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
  Modal,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { findProducts } from '../../redux/Product/Action';
import { IoMdCloseCircleOutline } from 'react-icons/io';
// import { CloseIcon } from 'yet-another-react-lightbox';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);



  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (query.length > 2) {
      try {
        const response = await api.get(`/api/products/suggestions?query=${query}`);
        if (response.status === 200 && response.data.suggestions) {
          setSuggestions(response.data.suggestions);
          setShowSuggestions(response.data.suggestions.length > 0);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
  //   setShowSuggestions(false);
  // };
  const dispatch = useDispatch();



  // const handleSuggestionClick = (suggestion) => {
  //   navigate(`/products/id/${suggestion._id}`);
  //   setIsModalOpen(false);
  //   setShowSuggestions(false);
  // };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(findProducts({ search: searchQuery }));
    navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    handleModalClose();
  };
  
  const handleSuggestionClick = (suggestion) => {
    navigate(`/products/id/${suggestion._id}`);
    handleModalClose();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchBar = document.getElementById('search-bar');
      if (searchBar && !searchBar.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (showSuggestions) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : -1
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (selectedSuggestionIndex !== -1) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearchSubmit(event);
        }
      }
    } else if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };
  
  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [navigate]);

  const handleMobileSuggestionClick = (suggestion) => {
    handleModalClose();
    // Use setTimeout to ensure the modal closes before navigation
    setTimeout(() => {
      navigate(`/products/id/${suggestion._id}`);
    }, 0);
  };

  const handleMobileSearchSubmit = (event) => {
    event.preventDefault();
    handleModalClose();
    // Use setTimeout to ensure the modal closes before navigation
    setTimeout(() => {
      dispatch(findProducts({ search: searchQuery }));
      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    }, 0);
  };

  return (
    <Box sx={{ position: 'relative', mt: 2 }} id="search-bar">
      {isMobile ? (
        <>
        <IconButton onClick={handleModalOpen}>
          <SearchIcon />
        </IconButton>
        <Modal 
          open={isModalOpen} 
          onClose={handleModalClose}
          aria-labelledby="mobile-search-modal"
          aria-describedby="mobile-search-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'background.paper',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              p: 2,
            }}
          >
            <IconButton 
              onClick={handleModalClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <IoMdCloseCircleOutline />
            </IconButton>
            <Box component="form" onSubmit={handleMobileSearchSubmit} sx={{ mt: 4 }}>
              <InputBase
                sx={{ mb: 2, fontSize: 18, width: '100%' }}
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                inputProps={{ 'aria-label': 'search products' }}
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth>
                Search
              </Button>
            </Box>
            {showSuggestions && (
              <Box sx={{ mt: 2 }}>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={suggestion._id}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      p: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                      bgcolor: index === selectedSuggestionIndex ? 'action.selected' : 'inherit',
                    }}
                    onClick={() => handleMobileSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Modal>
      </>
      ) : (
        <Paper
  component="form"
  onSubmit={handleSearchSubmit}
  sx={{
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 180,
    boxShadow: 'none',
    border: '1px solid #ccc',
    borderRadius: 2,
  }}
>
  <InputBase
    sx={{ ml: 1, flex: 1, fontSize: 12 }}
    placeholder="Search products..."
    value={searchQuery}
    onChange={handleSearchChange}
    onKeyDown={handleKeyDown}
    inputProps={{ 'aria-label': 'search products' }}
  />
  <IconButton type="submit" onClick={handleSearchSubmit}>
    <SearchIcon />
  </IconButton>
</Paper>
      )}
      {!isMobile && showSuggestions && (
        <Paper
          sx={{
            position: 'absolute',
            zIndex: 10,
            mt: 1,
            width: 250,
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          {/* {suggestions.map((suggestion) => (
            <Typography
              key={suggestion._id}
              variant="body1"
              sx={{ p: 1, cursor: 'pointer', '&:hover': { bgcolor: theme.palette.grey[200] } }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </Typography>
          ))} */}
          {suggestions.map((suggestion, index) => (
  <Typography
    key={suggestion._id}
    variant="body1"
    sx={{
      p: 1,
      cursor: 'pointer',
      '&:hover': { bgcolor: theme.palette.grey[200] },
      bgcolor: index === selectedSuggestionIndex ? theme.palette.grey[200] : 'inherit',
    }}
    onClick={() => handleSuggestionClick(suggestion)}
  >
    {suggestion.name}
  </Typography>
))}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;



