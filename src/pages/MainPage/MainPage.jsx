import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactsList/ContactsList";
import "./MainPage.css";
const MainPage = () => {
  return (
    <div className="main-container">
      <div className="contact-form-container">
        <ContactForm />
      </div>
      <div className="contact-list-container">
        <ContactList />
      </div>
    </div>
  );
};
export default MainPage;
