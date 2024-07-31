import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { UserAPI } from "../../services/api";
import ContactListItem from "../ContactListItem/ContactListItem";
import "./ContactsList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const data = await UserAPI.getContacts();
        setContacts(data.resources);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await UserAPI.deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
     <h2>Contacts</h2>
      <ul className='contact-list'>
        {isLoading && <Loader />}
        {error && <p>Oops, some error occurred... Message: {error.message}</p>}
        {contacts.map((contact) => (
          <li className="contact-list-item" key={contact.id}>
            <ContactListItem contact={contact} handleDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       firstName: PropTypes.string.isRequired,
//       lastName: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       avatar: PropTypes.string.isRequired,
//       tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//     })
//   ).isRequired,
// };

export default ContactList;
