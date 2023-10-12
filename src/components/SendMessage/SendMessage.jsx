import { useParams } from "react-router-dom";
import imgS from "../../assets//images/avatar.png";
import { useFormik } from "formik";
import axios from "axios";
// import styles from "./SendMessage.module.css";
import { useState } from "react";

const SendMessage = () => {
  let idUser = useParams();
  const [send, setSend] = useState(null);
  async function AddNewMessage(values) {
    try {
      let data = {
        ...values,
        receivedId: idUser.id,
      };
      let res = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/message",
        data
      );

      console.log("data message", res.data);
      setSend(res.data.messaged);
      setTimeout(() => {
        setSend(null);
      }, 2000);
    } catch (error) {
      setSend(null);
      console.error("Axios request failed:", error);
    }
  }

  let formik = useFormik({
    initialValues: {
      messageContent: "",
    },
    onSubmit: (values) => {
      AddNewMessage(values);
      formik.values.messageContent = "";
    },
  });

  // useEffect(() => {
  //   setSend(send);
  // }, [send]);
  return (
    <>
      <div className="container text-center py-5 my-5 ">
        {send == "Added" ? (
          <div className="alert alert-success" role="alert">
            This is a success alert—check it out!
          </div>
        ) : null}
        <div className=" py-5 mb-5">
          <span data-toggle="modal" data-target="#profile">
            <img src={imgS} className="w-20 m-auto" alt="profile" />
          </span>
          <h3 className="py-2">User Name</h3>
          <div className="container w-50 m-auto">
            <form onSubmit={formik.handleSubmit}>
              <textarea
                className="form-control"
                name="messageContent"
                value={formik.values.messageContent}
                onChange={formik.handleChange}
                cols={10}
                rows={9}
                placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
              />
              <button className="btn btn-outline-info mt-3">
                <i className="far fa-paper-plane" /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessage;
