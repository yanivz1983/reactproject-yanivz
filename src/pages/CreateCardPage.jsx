// CreateCardPage.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CardForm, { fields } from "./CardForm";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    description: "",
    web: "",
    email: "",
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
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    phone: "",
    description: "",
    web: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]:
        value.trim() === ""
          ? `${id.charAt(0).toUpperCase() + id.slice(1)} is required`
          : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    for (const field of fields) {
      if (field.required && !inputsValue[field.id].trim()) {
        formErrors[field.id] = `${field.label} is required`;
      }
    }

    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields correctly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.email,
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
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;
        setErrors(serverErrors);

        // Conditional sentence for displaying error message and instructions
        toast.error("Error creating card. Please review the form for errors.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardForm
      fields={fields}
      inputsValue={inputsValue}
      errors={errors}
      loading={loading}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateCardPage;
