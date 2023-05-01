import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT, PARTİCİPANT_SUBSCRİPTİON } from "./queries";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading";
import { useEffect } from "react";

function EventDetail() {
  const { id } = useParams();
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
    variables: { id },
  });

  useEffect(() => {
    subscribeToMore({
      document: PARTİCİPANT_SUBSCRİPTİON,
      variables: { event_id: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newParticipant = subscriptionData.data.participantAdded;
        return {
          event: {
            ...prev.event,
            participants: [...prev.event.participants, newParticipant],
          },
        };
      },
    });
  }, [subscribeToMore, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Card
        sx={{ minWidth: 275, maxWidth: 1200, marginX: "auto", marginTop: 5 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            {data.event.title}
            <Box component="span" sx={{ fontSize: 15 }}>
              {data.event.date} {" - "}
              <Box component="span" sx={{ fontSize: 15 }}>
                ({data.event.from}
              </Box>
              {"-"}
              <Box component="span" sx={{ fontSize: 15 }}>
                {data.event.to})
              </Box>
            </Box>
          </Typography>
          <Typography variant="body2">{data.event.desc}</Typography>
          <Typography sx={{ marginTop: 2 }}>
            Event Owner: {data.event.user.username}
          </Typography>
          <Typography sx={{ marginTop: 2 }}>- Event Location -</Typography>
          <Typography>Location Lat: {data.event.location.lat}</Typography>
          <Typography>Location Lng: {data.event.location.lng}</Typography>
          {data.event.participants.length === 0 ? (
            <Typography sx={{ marginTop: 2 }}>No Participant</Typography>
          ) : (
            <Typography sx={{ marginTop: 2 }}>- Participants -</Typography>
          )}
          {data.event.participants &&
            data.event.participants.map((participant, idx) => (
              <Typography key={idx}>* {participant.user.username}</Typography>
            ))}
        </CardContent>
        <CardActions sx={{ margin: 1 }}>
          <Link to="/">Back</Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default EventDetail;