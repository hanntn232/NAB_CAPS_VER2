import React from "react";
import "./style-modal-checkout.css";
import {useNavigate} from "react-router-dom"

export default function Modal({
  setOpenModal,
  updateCartToServer,
  removeChange,
}) 
{

  const navigate = useNavigate();

  return (
    <div className="modal-cover">
      <div className="modalBackground">
        <div className="modalContainer modalContainerPhone">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <div className="title">
            <h2>Bạn chưa lưu những thay đổi</h2>
          </div>
          <div className="body">
            <div>Bạn có muốn lưu những thay đổi trước khi tiếp tục?</div>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                removeChange();
                navigate("/");
                setOpenModal(false);
              }}
              id="cancelBtn"
              className="buttonPhone"
            >
              Hủy tất cả
            </button>
            <button
              id="saveBtn"
              onClick={() => {
                updateCartToServer();
                navigate("/");
                setOpenModal(false);
              }}
              className="buttonPhone"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
