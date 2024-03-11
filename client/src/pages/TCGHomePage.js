import { Card, Box, Typography, CardContent, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const TCGHomePage = () => {
  const [{ data }, setData] = useState(useLoaderData());
  console.log(data);
  return (
    <Box>
      <Typography variant='h3' gutterBottom>
        {data.name}
      </Typography>
      <Typography variant='h5' gutterBottom>
        Released {data.release_year}
      </Typography>
      <Grid
        container
        rowspacing={2}
        rowGap={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {data.sets.map((set) => (
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  component={Link}
                  to={`/sets/${set.id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  gutterBottom
                >
                  {set.name} ({set.release_year})
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TCGHomePage;
