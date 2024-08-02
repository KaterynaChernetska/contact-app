import { useEffect, useState } from "react";
import "./ContactDetails.css";
import { getOneContact, updateContactTags } from "../../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newTags, setNewTags] = useState("");
  const { avatar, firstName, lastName, email, tags } = useSelector(
    (state) => state.contacts.contact
  );
  const error = useSelector((state) => state.contacts.error);
  const loading = useSelector((state) => state.contacts.loading);

  useEffect(() => {
    dispatch(getOneContact(id));
  }, [id, dispatch]);

  const handleTagsChange = (e) => {
    setNewTags(e.target.value);
  };

  const handleAddTags = () => {
    const tagsArray = newTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tagsArray.length > 0) {
      dispatch(updateContactTags({ id, tags: tagsArray }));
      setNewTags("");
    }
  };

  return (
    <>
      {error && (
        <p className="error-message">
          Oops, some error occurred... Message: {error}
        </p>
      )}
      <button className="go-back" onClick={() => navigate(-1)}>
        <img className="arrow-icon" src={Arrow} alt="Arrow Back Icon" /> Go Back
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div className="contact-detail">
          <div className="contact-header">
            <img
              src={avatar}
              alt={`${firstName} ${lastName}`}
              className="contact-avatar"
            />
            <h2 className="contact-name">
              {firstName} {lastName}
            </h2>
          </div>
          <p className="contact-email"> {email}</p>
          <div className="contact-tags">
            <h3>Tags</h3>
            <ul>
              {tags.length > 0 &&
                tags.map(({ id, tag }) => (
                  <li key={id} className="tag-item">
                    {tag}
                  </li>
                ))}
            </ul>
            <div className="add-tag">
              <input
                type="text"
                value={newTags}
                onChange={handleTagsChange}
                placeholder="Add new tag"
              />
              <button onClick={handleAddTags}>Add Tag</button>
            </div>
            <p className="info">
              * To add more than one tag at once separate them with a comma
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetail;
