/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";

const ContactListItem = ({ contact, handleDelete }) => {
  const { id, avatar_url: avatarUrl, fields, tags } = contact;

  const emailValue = fields.email?.[0]?.value || "No email available";
  const firstNameValue =
    fields["first name"]?.[0]?.value || "No first name available";
  const lastNameValue =
    fields["last name"]?.[0]?.value || "No last name available";

  return (
    <>
      <Link className="contact-link" to={`/contact/${id}`}>
        <img
          className="avatar-image"
          src={avatarUrl}
          alt={`${firstNameValue} ${lastNameValue}`}
        />

        <div>
          <span> {firstNameValue}</span>
          <span> {lastNameValue}</span>
          <p className='contact-email'> {emailValue}</p>
          {tags.length > 0 && (
            <ul className='tags-list'>
              {tags?.map(({ id, tag }) => (
                <li key={id}>{tag}</li>
              ))}
             
            </ul>
          )}
        </div>
      </Link>
      <button className='delete-contact-btn' onClick={() => handleDelete(id)}>
        <img src={DeleteIcon} />
      </button>
    </>
  );
};

export default ContactListItem;
