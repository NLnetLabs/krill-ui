import React from 'react';
import useTranslations from '../../hooks/useTranslations';
import Modal from './Modal';
import upload from '../../img/upload.svg?url';
import useParentActions from '../../hooks/useParentActions';
import NotificationPopup from '../NotificationPopup';
import CopyDownloadButton from '../CopyDownloadButton';

export default function ParentModal() {
  const t = useTranslations();
  const {
    notification,
    setNotification,
    name,
    setName,
    request,
    setRequest,
    response,
    setResponse,
    onSubmit,
    onClose,
    handleUpload,
  } = useParentActions();

  return (
    <Modal onClose={onClose}>
      {notification && (
        <NotificationPopup
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <h3>{t.caDetails.parentsTab.addParent}</h3>
      <form onSubmit={onSubmit} method="POST">
        <div>
          <label>{t.caDetails.parentsTab.request}</label>
          <textarea name="request" readOnly value={request} id="request" onChange={(e) => setRequest(e.target.value)} />
          <div>
            <CopyDownloadButton xml={request} name='child_request' setNotification={setNotification}/>
          </div>
        </div>
        <div>
          <label>{t.caDetails.parentsTab.response}</label>
          <textarea name="response" value={response} onChange={(e) => setResponse(e.target.value)}/>
          <input type="file" id="upload" onChange={handleUpload} />
          <label className="button large icon" htmlFor="upload" title={t.common.dropOrClick}>
            <img src={upload} alt={t.common.dropOrClick} />
          </label>
        </div>
        <div>
          <label>{t.caDetails.parentsTab.name}</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="actions">
          <button className="button outline" onClick={onClose}>
            {t.common.cancel}
          </button>
          <button type="submit" className="button">
            {t.common.confirm}
          </button>
        </div>
      </form>
    </Modal>
  );
}
