import Reciepi from "./Reciepi";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export default function API() {
  const [rcp, setRcp] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setLoading(true);
    setTimeout(() => {
      setSearch(event.target.value);
      setLoading(false);
    }, 1000);
  };
  const handleSearch = (e) => {
    setLoading(true);
    setTimeout(() => {
      setSearch(e.target.value);
      setLoading(false);
    }, 1000);
    // axios
    //   .get(`https://dummyjson.com/recipes/search?q=${e.target.value}`)
    //   .then(async (res) => {
    //     console.log(res.data.recipes);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/recipes?limit=100")
      .then(async (res) => {
        console.log(res.data.recipes);
        await setRcp(res.data.recipes);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let filter = rcp.map((i) => i.cuisine);
  const uniqueCuisines = [...new Set(filter)];

  // console.log(uniqueCuisines);
  return (
    <div
      style={{
        backgroundColor: "#c07b9936",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        gap={2}
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          label="Search recipe here..."
          type="search"
          color="secondary"
          onChange={handleSearch}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Filter By Cuisine
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            // value={selectedCategory}
            label="Filter By Cuisine"
            onChange={handleChange}
          >
            <MenuItem value={null}>All</MenuItem>
            {uniqueCuisines?.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "45%",
          }}
          size={100}
          color="secondary"
        />
      ) : (
        <Reciepi
          loading={loading}
          setLoading={setLoading}
          data={rcp}
          setData={setRcp}
          search={search}
        />
      )}
    </div>
  );
}
