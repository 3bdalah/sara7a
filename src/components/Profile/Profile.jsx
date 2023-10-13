import styles from "./Profile.module.css";
import imgS from "../../assets/images/avatar.png";
import jwtDecode from "jwt-decode";
// import axios from "axios";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages  } from "../../Redux/MessagesSlice";
// const getMessages = async () => {
//   let { data } = await axios.get(
//     "https://sara7aiti.onrender.com/api/v1/message",
//     { headers: { token: localStorage.getItem("userToken") } }
//   );
//   console.log("data is : ", data);
//   return data.allMessages;
// };

const Profile = () => {
  let { messages } = useSelector((state) => state.allMessages);
  const [messagesList, setMessagesList] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const { data } = useQuery(
  //   ["messages", localStorage.getItem("userToken")],
  //   getMessages
  // );

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  function getUserId() {
    const decoded = jwtDecode(localStorage.getItem("userToken"));
    return decoded.id;
  }

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    console.log("all messages by redux", messages);
    setMessagesList(messages);
  }, [messages]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Link Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {window.location.hostname}:{window.location.port}/message/
          {getUserId()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container my-5 text-center">
        <div className="card pt-5">
          <Link
            to="/profile"
            data-toggle="modal"
            data-target="#profile"
            className="avatar mx-auto"
          >
            <img src={imgS} className={styles.avatar} alt="etes" />
          </Link>
          <h3 className="py-2">Nourhan Saeed</h3>

          <Button
            variant="primary"
            onClick={handleShow}
            className={"btn share_profile " + styles.share_profile}
          >
            Share My Profile
          </Button>
        </div>

        <div className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-md mt-10">
          {messagesList.length > 0 ? (
            <div>
              <h4 className="text-lg font-bold">Recent Messages:</h4>
              <ul className="mt-4">
                {messagesList.map((message, index) => (
                  <li key={index} className="mb-2">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {message.messageContent}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-gray-600">You dont have any messages...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
