import axios from "axios";
import React from "react";
import { useEffect } from "react";
import RecipeReviewCard from "./RCard";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Reciepi({ search, data, loading, setLoading }) {
  console.log(search);
  let filtered = data.filter((name) =>
    search
      ? name?.name.toLowerCase().includes(search?.toLowerCase()) ||
        name?.cuisine.toLowerCase().includes(search?.toLowerCase())
      : data
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      {filtered.length > 0 ? (
        filtered.map((item, index) => (
          <RecipeReviewCard index={index} key={index} data={item} />
        ))
      ) : (
        <Box
          sx={{
            padding: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              //   backgroundColor: "yellow",
              padding: 5,
              width: "50%",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                variant="overline"
                fontFamily={"Poppins"}
                fontSize={20}
              >
                Oops
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                fontFamily={"Poppins"}
                fontSize={16}
              >
                We could not understand what you mean, try rephrasing the query
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
