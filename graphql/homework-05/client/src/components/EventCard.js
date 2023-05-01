import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 1200, marginX: "auto", marginBottom: 1 }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {event.title}
          <Box component="span" sx={{ fontSize: 15 }}>
            {event.date} {" - "}
            <Box component="span" sx={{ fontSize: 15 }}>
              ({event.from}
            </Box>
            {"-"}
            <Box component="span" sx={{ fontSize: 15 }}>
              {event.to})
            </Box>
          </Box>
        </Typography>
        <Typography variant="body2">{event.desc}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`event/${event.id}`}>Learn More</Link>
      </CardActions>
    </Card>
  );
}

export default EventCard;