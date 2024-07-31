import './ContactForm.css';


const ContactForm = () => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }
  return (
    <>
      <h2>Create Contact</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <input />
        <input />
        <input />
        <button type="submit">Add Contact</button>
      </form>
    </>
  );
};

export default ContactForm;
