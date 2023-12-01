import { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";

const CreateCardPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    mail: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.mail,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });

      toast.success("You've created a business card!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.error("Error creating card:", err);

      toast.error("Error creating card. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Create - Cards
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <form onSubmit={handleSubmit}>
        <Grid container flexDirection={"column"}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.title}
            required
            error={inputsValue.title.trim() === ""}
          />

          <TextField
            id="subtitle"
            label="SubTitle"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.subtitle}
            required
            error={inputsValue.subtitle.trim() === ""}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.phone}
            required
            error={inputsValue.phone.trim() === ""}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.description}
            required
            error={inputsValue.description.trim() === ""}
          />
          <TextField
            id="web"
            label="Web"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.web}
          />
          <TextField
            id="mail"
            label="Email"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.mail}
            required
            error={inputsValue.mail.trim() === ""}
          />

          <TextField
            id="url"
            label="Url"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.url}
          />
          <TextField
            id="alt"
            label="Alt"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.alt}
          />

          <TextField
            id="state"
            label="State"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.state}
          />
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.country}
            required
            error={inputsValue.country.trim() === ""}
          />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.city}
            required
            error={inputsValue.city.trim() === ""}
          />
          <TextField
            id="street"
            label="Street"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.street}
            required
            error={inputsValue.street.trim() === ""}
          />
          <TextField
            id="houseNumber"
            label="House Number"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.houseNumber}
            required
            error={inputsValue.houseNumber.trim() === ""}
          />
          <TextField
            id="zip"
            label="Zip"
            variant="outlined"
            sx={{ mt: "10px" }}
            onChange={handleInputChange}
            value={inputsValue.zip}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={8} xs>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "darkblue",
                color: "white",
              }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Card"}
            </Button>
          </Grid>
          <Grid item xs>
            <Link to={ROUTES.HOME}>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100%",
                  ml: "0%",
                  bgcolor: "navy",
                  color: "gray",
                }}
              >
                Discard
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateCardPage;
