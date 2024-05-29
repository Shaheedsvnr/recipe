import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Single from "./SinlgeR";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  //   p: "1px",
  //   maxHeight: "40vh",
};
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

export default function RecipeReviewCard({ data, index }) {
  //   console.log(data);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [single, setSingle] = React.useState(null);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSingle = (n) => {
    setSingle(n);
    setOpen(true);
  };

  return (
    <Box>
      <Card onClick={() => handleSingle(data)} sx={{ width: 400, margin: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.name[0].toUpperCase()}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={data.name}
          subheader={data.cuisine}
        />
        <CardMedia
          component="img"
          height="280"
          image={data.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.mealType}
            <Chip
              color="success"
              size="small"
              sx={{ float: "right", borderRadius: "5px" }}
              label={data.rating}
              icon={<StarIcon />}
            />
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
          <Typography variant="body2" color="text.secondary">
            Tags :
          </Typography>
          {data.tags.map((c, i) => (
            <Chip size="small" sx={{ m: "1px" }} label={c} key={i} />
          ))}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Root>
              <Divider>
                <Typography variant="overline">Ingredients</Typography>
              </Divider>
              {data.ingredients.map((i) => (
                <p key={i}>{i}</p>
              ))}
              <Divider>
                <Typography variant="overline">Instructions</Typography>
              </Divider>
              {data.instructions.map((ing) => (
                <Typography key={ing} paragraph>
                  {ing}
                </Typography>
              ))}
            </Root>
          </CardContent>
        </Collapse> */}
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Single item={single} />
        </Box>
      </Modal>
    </Box>
  );
}
