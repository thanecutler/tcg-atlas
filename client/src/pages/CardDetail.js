import React from "react";
import { Paper, Typography, Box, CardMedia } from "@mui/material";

const CardDetail = ({ card, imageUrl }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400 }}>
      <Typography variant='h5' gutterBottom>
        Card Details
      </Typography>
      <CardMedia
        component='img'
        height='200'
        image={imageUrl}
        alt={card.name}
        sx={{ marginBottom: 2 }}
      />
      <Box>
        <Typography variant='subtitle1'>
          <strong>Number:</strong> {card.set_number}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Name:</strong> {card.name}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Rarity:</strong> {card.rarity}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Category 1:</strong> {card.category1}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Category 2:</strong> {card.category2}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Attribute:</strong> {card.attribute}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Color:</strong> {card.color}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Bank:</strong> {card.bank || "-"}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Strength:</strong> {card.strength || "-"}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Agility:</strong> {card.agility || "-"}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Magic:</strong> {card.magic || "-"}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Intelligence:</strong> {card.intelligence || "-"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CardDetail;
