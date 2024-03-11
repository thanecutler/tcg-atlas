import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CardDataGrid = ({ data, username, updateCardStatus }) => {
  const formatImgUrl = (id) => {
    let url = id.toString();
    while (url.length < 4) {
      url = "0" + url;
    }
    return `${url}.gif`;
  };
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {data.map((card) => (
        <Grid item>
          <Card sx={{ width: 350 }}>
            <CardMedia
              sx={{ height: 500 }}
              image={`${process.env.PUBLIC_URL}/images/neopets/${formatImgUrl(
                card.id
              )}`}
              title={card.name}
            />
            <CardContent>
              <Stack direction={"row"}>
                <Typography variant='h6'>{card.name}</Typography>
                <Typography variant='h6' marginLeft={"auto"}>
                  {card.set_number}
                </Typography>
              </Stack>
              <Typography variant='h7'>{card.rarity}</Typography>
            </CardContent>
            {username && (
              <CardActions>
                <Button
                  size='small'
                  onClick={() =>
                    updateCardStatus(card.id, card.parent_set_id, "own")
                  }
                >
                  <IconButton aria-label='Add to owned'>
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                  Own
                </Button>
                {/* <Button size='small'>
                  <IconButton aria-label='Add to owned'>
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                  Want
                </Button>
                <Button size='small'>
                  <IconButton aria-label='Add to owned'>
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                  For trade
                </Button> */}
              </CardActions>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardDataGrid;
