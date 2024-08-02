import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact, getContacts } from "../../redux/apiSlice";
import "./ContactForm.css";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName && !lastName) {
      setError("At least one of First Name or Last Name is required.");
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("A valid email is required.");
      return;
    }

    setError("");
    const placeholderLastName = lastName || "N/A";
    const placeholderFirstName = firstName || "N/A";
    const newContactData = {
      fields: {
        "first name": [
          { value: placeholderFirstName, modifier: "", label: "first name" },
        ],
        "last name": [
          { value: placeholderLastName, modifier: "", label: "last name" },
        ],
        email: [{ value: email, modifier: "", label: "email" }],
      },
      record_type: "person",
      privacy: { edit: null, read: null },
      owner_id: null,
    };

    await dispatch(createContact(newContactData));
    dispatch(getContacts());

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Create New Contact</h2>
      <div className="form">
        {error && <p className="form-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          Create Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
