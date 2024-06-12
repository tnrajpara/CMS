import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "rgb(17 24 39)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Quick Links
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6}>
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" fullWidth>
              Inventory
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/add-product" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" fullWidth>
              Add Product
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Inventory Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "rgb(31 41 55)" }}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">120</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "rgb(31 41 55)" }}>
            <CardContent>
              <Typography variant="h6">Low Stock Items</Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Recent Activities
      </Typography>
      <Card sx={{ backgroundColor: "rgb(31 41 55)", marginBottom: 4 }}>
        <CardContent>
          <Typography>Product A was added.</Typography>
          <Typography>Product B stock was updated.</Typography>
          <Typography>Product C was removed.</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Other Links
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="secondary" fullWidth>
            Settings
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="secondary" fullWidth>
            Help
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
