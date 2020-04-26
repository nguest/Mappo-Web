/** @jsx jsx */
import React, { useCallback, useState } from 'react';
import { func, bool } from 'prop-types';
import { jsx } from '@emotion/core';
import { useDropzone } from 'react-dropzone';
import Icon from '../Icon';
import Loader from '../Loader';
import styles from './styles';

const renderDropzoneText = (isDragActive, acceptedFile) => {
  if (acceptedFile) return `${acceptedFile.name} / ${acceptedFile.type}`;
  return isDragActive
    ? 'Drop the files here ...'
    : 'Drag & drop a file here, or click to select files';
};

function FileUploader({ isLoading, onUploadFile }) {
  const [acceptedFile, setAcceptedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFile(acceptedFiles[0]);
    onUploadFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isLoading) {
    return <Loader isLoading type="trackUpload" />;
  }

  return (
    <div {...getRootProps()} css={styles.container(isDragActive)}>
      <input {...getInputProps()} />
      <p>{ renderDropzoneText(isDragActive, acceptedFile) }</p>
      <Icon name="cloud-upload" size={40} />
    </div>
  );
}

FileUploader.propTypes = {
  isLoading: bool,
  onUploadFile: func,
};

export default FileUploader;
