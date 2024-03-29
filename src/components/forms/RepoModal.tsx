import React from 'react';
import useTranslations from '../../hooks/useTranslations';
import Modal from './Modal';
import upload from '../../img/upload.svg?url';
import NotificationPopup from '../NotificationPopup';
import useRepositoryActions from '../../hooks/useRepositoryActions';
import CopyDownloadButton from '../CopyDownloadButton';

export default function RepoModal() {
  const t = useTranslations();
  const {
    notification,
    setNotification,
    request,
    setRequest,
    response,
    setResponse,
    onSubmit,
    onClose,
    handleUpload,
  } = useRepositoryActions();

  return (
    <Modal onClose={onClose}>
      {notification && (
        <NotificationPopup
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <h3>{t.caDetails.repoTab.addRepo}</h3>
      <form onSubmit={onSubmit} method="POST">
        <div>
          <label>{t.caDetails.repoTab.request}</label>
          <textarea name="request" readOnly value={request} id="request" onChange={(e) => setRequest(e.target.value)} />
          <div>
            <CopyDownloadButton xml={request} name='publisher_request' setNotification={setNotification}/>
          </div>
        </div>
        <div>
          <label>{t.caDetails.repoTab.response}</label>
          <textarea name="response" value={response} onChange={(e) => setResponse(e.target.value)}/>
          <input type="file" id="upload" onChange={handleUpload} />
          <label className="button large icon" htmlFor="upload" title={t.common.dropOrClick}>
            <img src={upload} alt={t.common.dropOrClick} />
          </label>
        </div>
        <div className="actions">
          <button type="button" className="button outline" onClick={onClose}>
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
