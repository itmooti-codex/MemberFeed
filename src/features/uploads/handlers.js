export let pendingFile = null;
export let fileTypeCheck = "";
export let pendingGifUrl = null;
let ignoreNextChange = false;

export function setPendingFile(file) {
  pendingFile = file;
}

export function setFileTypeCheck(type) {
  fileTypeCheck = type;
}

export function setPendingGifUrl(url) {
  pendingGifUrl = url;
}
export function setIgnoreNextChange(val) {
  ignoreNextChange = val;
}
$(document).on("change", ".file-input, #file-input", function (e) {
  if (ignoreNextChange) {
    ignoreNextChange = false;
    return;
  }
  pendingFile = e.target.files[0] || null;
  pendingGifUrl = null;
  if (pendingFile) {
    const type = pendingFile.type;
    if (type.startsWith("audio/")) {
      fileTypeCheck = "Audio";
    } else if (type.startsWith("video/")) {
      fileTypeCheck = "Video";
    } else if (type.startsWith("image/")) {
      fileTypeCheck = "Image";
    } else {
      fileTypeCheck = "File";
    }
  }
});

