import Loader from "../Loader/Loader";
import { useEffect } from "react";

import ContactListItem from "../ContactListItem/ContactListItem";
import "./ContactsList.css";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../redux/apiSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  //   const contacts = useSelector((state) => state.contacts.contacts);
  //   const error = useSelector((state) => state.contacts.error);
  const { contacts, loading, error } = useSelector((state) => state.contacts);
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className="contacts-header">Contacts</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul className="contact-list">
          {error && <p>Oops, some error occurred... Message: {error}</p>}
          {contacts?.map((contact) => (
            <li className="contact-list-item" key={contact.id}>
              <ContactListItem contact={contact} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
