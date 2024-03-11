import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
} from "@mui/material";

const CardDataTable = ({
  data,
  sortKey,
  setSortKey,
  sortDirection,
  setSortDirection,
}) => {
  const handleColumnSort = (columnName, sortDirection) => {
    if (sortKey === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("desc");
      setSortKey(columnName);
    }
  };
  const columnHeaders = [
    {
      label: "Number",
      align: "right",
      key: "set_number",
      style: { width: "50px" },
    },
    {
      label: "Name",
      align: "left",
      key: "name",
    },
    {
      label: "Rarity",
      align: "left",
      key: "rarity",
    },
    {
      label: "Category 1",
      align: "left",
      key: "category1",
    },
    {
      label: "Category 2",
      align: "left",
      key: "category2",
    },
    {
      label: "Attribute",
      align: "left",
      key: "attribute",
    },
    {
      label: "Color",
      align: "left",
    },
    {
      label: "Bank",
      align: "left",
    },
    {
      label: "Strength",
      align: "left",
    },
    {
      label: "Agility",
      align: "left",
    },
    {
      label: "Magic",
      align: "left",
    },
    {
      label: "Intelligence",
      align: "left",
    },
  ];
  return (
    <TableContainer sx={{ maxHeight: "calc(100vh - 160px)" }}>
      <Table stickyHeader sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow>
            {columnHeaders.map((header) => (
              <TableCell sx={header.style} align={header.align}>
                <TableSortLabel
                  onClick={() =>
                    handleColumnSort(
                      header.key || header.label.toLowerCase(),
                      sortDirection
                    )
                  }
                  direction={sortKey === header.key ? sortDirection : "desc"}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((card) => (
            <TableRow>
              <TableCell align='right' size='small'>
                {card.set_number}
              </TableCell>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.rarity}</TableCell>
              <TableCell>{card.category1}</TableCell>
              <TableCell>{card.category2}</TableCell>
              <TableCell>{card.attribute}</TableCell>
              <TableCell>{card.color}</TableCell>
              <TableCell>{card.bank || "-"}</TableCell>
              <TableCell>{card.strength || "-"}</TableCell>
              <TableCell>{card.agility || "-"}</TableCell>
              <TableCell>{card.magic || "-"}</TableCell>
              <TableCell>{card.intelligence || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardDataTable;
