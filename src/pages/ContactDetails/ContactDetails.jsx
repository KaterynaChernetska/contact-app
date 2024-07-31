import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";


const ContactDetail = ({ contacts }) => {
//   const { id } = useParams();
//   const contact = contacts.find((contact) => contact.id === parseInt(id));

//   if (!contact) {
//     return <div>Contact not found</div>;
//   }

  return (
   <div>
       <h2>{contact.firstName} {contact.lastName}</h2>
       <img src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
       <p>Email: {contact.email}</p>
       <p>Tags: {contact.tags.join(', ')}</p>
       Додайте більше інформації за потребою
 </div>
  );
};

// ContactDetail.propTypes = {
//     contacts: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         firstName: PropTypes.string.isRequired,
//         lastName: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//         avatar: PropTypes.string.isRequired,
//         tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//       })
//     ).isRequired,
//   };

export default ContactDetail;
