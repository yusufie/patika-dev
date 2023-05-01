import { useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import Loading from "../../components/Loading";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENTS_SUBSCRİPTİON } from "./queries";
import Box from "@mui/material/Box";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    subscribeToMore({
      document: EVENTS_SUBSCRİPTİON,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          events: [...prev.events, subscriptionData.data.eventCreated],
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <Box
        sx={{
          textAlign: "right",
          paddingRight: "150px",
          py: "20px",
          fontSize: "18px",
        }}
      >
        <Link to="/addevent" style={{ color: "green", textDecoration: "none" }}>
          Add Event
        </Link>
      </Box>
      {data &&
        data.events.map((event, idx) => <EventCard key={idx} event={event} />)}
    </div>
  );
}

export default Home;