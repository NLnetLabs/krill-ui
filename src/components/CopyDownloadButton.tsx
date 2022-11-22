import React from 'react';
import clipboard from '../img/clipboard.svg?url';
import download from '../img/download.svg?url';
import useTranslations from '../hooks/useTranslations';
import {Notification, NotificationType} from '../core/types';

export interface CopyDownloadButtonProps {
  xml: string,
  setNotification: (notification: Notification) => void,
}

export default function CopyDownloadButton({xml, setNotification}: CopyDownloadButtonProps) {
  const t = useTranslations();

  const onCopy = () => {
    navigator.clipboard.writeText(xml);

    setNotification({
      type: NotificationType.success,
      message: t.common.copySuccess
    });
  };

  return (
    <>
      <button className="button large icon" type="button" title={t.common.copy} onClick={onCopy}>
        <img src={clipboard} alt={t.common.copy}/>
      </button>
      <a className="button large icon" title={t.common.download}
        href={`data:application/xml;base64,${btoa(xml)}`} download="child_request.xml">
        <img src={download} alt={t.common.download}/>
      </a>
    </>
  );
}