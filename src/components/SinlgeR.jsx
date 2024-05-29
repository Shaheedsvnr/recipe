import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { CardActions, Chip, Collapse, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MediaControlCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: { xs: "auto", sm: "100%" },
        }}
        image={item?.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Box>
              <Typography component="div" variant="h5">
                {item?.name}
              </Typography>
            </Box>
            <Box>
              <Chip
                color="success"
                size="small"
                sx={{ float: "right", borderRadius: "5px" }}
                label={item.rating}
                icon={<StarIcon />}
              />
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item?.cuisine} - {item?.mealType}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            Tags :
            {item.tags.map((c, i) => (
              <Chip size="small" sx={{ m: "1px" }} label={c} key={i} />
            ))}
          </Typography>
          <Root>
            <Divider>
              <Typography variant="overline">Ingredients</Typography>
            </Divider>
            {item.ingredients.map((i) => (
              <span key={i}>{i},</span>
            ))}
          </Root>
        </CardContent>
        <CardActions disableSpacing>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Root>
                <Divider>
                  <Typography variant="overline">Instructions</Typography>
                </Divider>
                {item.instructions.map((ing) => (
                  <Typography key={ing} paragraph>
                    {ing}
                  </Typography>
                ))}
              </Root>
            </CardContent>
          </Collapse>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Box>
    </Card>
  );
}
