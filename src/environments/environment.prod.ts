const API_BACKEND="http://localhost:8000";
export const environment = {
  production: true,
  URL_UPLOAD_FILE: `${API_BACKEND}/uploadfile`,
  URL_READ_FILE: `${API_BACKEND}/private/read_file`,
  URL_UPDATE_FILE:`${API_BACKEND}/private/update`,
  URL_DOWNLOAD:`${API_BACKEND}/private_download`,
};
