import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { NEW_EVENT_MUTATİON } from "./queries";

function NewEvent() {
  const [saveEvent, { loading }] = useMutation(NEW_EVENT_MUTATİON);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    date: "",
    from: "",
    to: "",
    location_id: "",
    user_id: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await saveEvent({
        variables: {
          data: inputs,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "50%", mx: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="standard-required"
          name="title"
          label="Title"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.title}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="desc"
          label="Description"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.desc}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="date"
          label="Date"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.date}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="from"
          label="From"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.from}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="to"
          label="To"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.to}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="location_id"
          label="Location ID"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.location_id}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          required
          id="standard-required"
          name="user_id"
          label="User ID"
          variant="standard"
          size="medium"
          margin="normal"
          fullWidth
          value={inputs.user_id}
          onChange={handleChange}
          disabled={loading}
        />
        <LoadingButton
          type="submit"
          color="primary"
          loading={loading}
          loadingPosition="center"
          variant="contained"
          sx={{ marginTop: "20px", marginLeft: "92%" }}
        >
          Save
        </LoadingButton>
      </form>
    </Box>
  );
}

export default NewEvent;