import {
  AppBar,
  Toolbar,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CardDataTable from "../components/CardDataTable";
import CardDataGrid from "../components/CardDataGrid";
import axios from "axios";

const TCGSetPage = () => {
  const [{ data }, setData] = useState(useLoaderData());

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [view, setView] = useState("grid");
  const [sortKey, setSortKey] = useState("set_number");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const sortData = (a, b, key, direction) => {
    const x = a[key] || null;
    const y = b[key] || null;

    switch (direction) {
      case "desc":
        if (x > y) {
          return 1;
        }
        if (x < y) {
          return -1;
        }
        if (x === null || x === "") {
          return 1;
        }
        if (y === null || y === "") {
          return -1;
        }
        break;
      case "asc":
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        if (x === null || x === "") {
          return -1;
        }
        if (y === null || y === "") {
          return 1;
        }
        break;
      default:
        break;
    }
  };

  const handleSetFilterBy = (e) => {
    setFilterBy(e.target.value);
  };

  const toggleShowFilter = () => {
    setFilterValue("");
    setShowFilter(!showFilter);
  };

  const handleSetFilterValue = (e) => {
    setFilterValue(e.target.value.toLowerCase());
  };

  const filterItemByValue = (item) => {
    if (filterBy && filterValue) {
      if (!item[filterBy]) {
        return;
      }
      return item[filterBy].toLowerCase().includes(filterValue);
    }
    return item;
  };

  const tableButtons = [
    {
      label: "View",
      icon:
        view === "grid" ? (
          <ViewModuleIcon sx={{ marginRight: 1 }} />
        ) : (
          <FormatListBulletedIcon sx={{ marginRight: 1 }} />
        ),
      visible: true,
      variant: "",
      handler: () => setView(view === "grid" ? "table" : "grid"),
    },
    {
      label: "Filter",
      icon: showFilter ? (
        <FilterAltOffIcon sx={{ marginRight: 1 }} />
      ) : (
        <FilterAltIcon sx={{ marginRight: 1 }} />
      ),
      visible: true,
      variant: showFilter ? "contained" : "",
      handler: toggleShowFilter,
    },
  ];

  const updateCardStatus = async (cardId, setId, status) => {
    if (!username) {
      return console.error("User not logged in");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/checklists/update`,
        { cardId, setId, username, status }
      );
    } catch (error) {}
  };

  return (
    <>
      <AppBar sx={{ position: "sticky", top: 64, left: 0 }}>
        <Toolbar>
          <Typography variant='h6'>
            {data.setMetadata.name} - {data.setMetadata.card_count} cards
          </Typography>
          {tableButtons.map(
            (button) =>
              button.visible && (
                <Button
                  variant={button.variant}
                  color={button.color}
                  sx={{ marginLeft: 1 }}
                  onClick={button.handler}
                  disabled={button.disabled}
                >
                  {button.icon} {button.label}
                </Button>
              )
          )}
        </Toolbar>
      </AppBar>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {showFilter && (
          <Toolbar>
            <FormControl sx={{ width: 180, marginRight: 1 }} size='small'>
              <Select onChange={handleSetFilterBy} value={filterBy}>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"category1"}>Category</MenuItem>
                <MenuItem value={"category2"}>Category 2</MenuItem>
                <MenuItem value={"attribute"}>Attribute</MenuItem>
                <MenuItem value={"color"}>Color</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='standard-basic'
              label='Filter'
              variant='standard'
              fullWidth
              onChange={(e) => handleSetFilterValue(e)}
            />
          </Toolbar>
        )}
        {view === "grid" ? (
          <CardDataGrid
            data={data.cardData
              .filter((item) => filterItemByValue(item))
              .sort((a, b) => sortData(a, b, sortKey, sortDirection))}
            username={username}
            updateCardStatus={updateCardStatus}
          />
        ) : (
          <CardDataTable
            data={data.cardData
              .filter((item) => filterItemByValue(item))
              .sort((a, b) => sortData(a, b, sortKey, sortDirection))}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            username={username}
            updateCardStatus={updateCardStatus}
          />
        )}
      </Paper>
    </>
  );
};

export default TCGSetPage;
