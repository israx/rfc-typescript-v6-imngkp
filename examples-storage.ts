import * as Storage from './storage';

/*
EXAMPLE: Introduction of object reference types
*/
// Get first public photo
const getFirstPublicPhoto = async () => {
  let listResponse = await Storage.list({
    path: Storage.getPathReference('photos/', { level: 'public' }),
  });

  return listResponse.files?.[0];
};

/*
As a note, APIs will allow developers to specify keys by string if they do not need to override the access level. For
example, the following operation will list all files for the current user.
*/
const listPrivatePhotos = async () => {
  const listResponseDefault = await Storage.list({
    path: 'photos/',
  });
};

// Copy the first photo returned to the current user's private prefix
const copyPhotos = async () => {
  const firstPhoto = await getFirstPublicPhoto();

  if (firstPhoto) {
    await Storage.copy({
      source: firstPhoto,
      destination: Storage.copyObjectReference(firstPhoto, {
        level: 'private',
      }),
    });
  }
};

/*
EXAMPLE: Splitting up the `get` API
*/
const downloadPhoto = async () => {
  const firstPhoto = await getFirstPublicPhoto();

  // Generate a pre-signed URL for a file
  const presignedUrl = await Storage.getUrl({ key: firstPhoto });

  // Download a file
  const downloadResult = await Storage.download({ key: firstPhoto });
};

/*
EXAMPLE: Changes to the `put` return object
*/
const uploadPhoto = async () => {
  const fileBlob = new Blob();

  // Upload a public file with resumability enabled by default
  const uploadTask = Storage.upload({
    key: Storage.getObjectReference('movie.mpg', { level: 'public' }),
    content: fileBlob,
  });

  // Pause & resume upload
  let currentTransferStatus = uploadTask.pause();
  currentTransferStatus = uploadTask.resume();

  // Get the current progress of the upload
  const currentTransferProgress = uploadTask.getProgress();

  // Wait for the upload to finish (or fail)
  const uploadedObjectReference = await uploadTask.result;
};
