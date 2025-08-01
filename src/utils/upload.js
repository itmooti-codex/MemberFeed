import { API_KEY, HTTP_ENDPOINT } from '../config.js';
export async function requestUploadDetails(file) {
    let accountLowerCase = ACCOUNT_NAME.toLowerCase();
    const base = `https://${accountLowerCase}.vitalstats.app`;
    const params = new URLSearchParams({
        type: file.type,
        name: file.name,
        generateName: '1'
    });
    const res = await fetch(`${base}/api/v1/rest/upload?${params}`, {
        headers: { 'Api-Key': API_KEY }
    });
    const data = await res.json();
    if (!res.ok || data.statusCode !== 200) {
        throw new Error('Failed to obtain upload URL');
    }
    return data.data; // { uploadUrl, url, key }
}

export async function uploadFileToS3(url, file) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
    });
    if (!res.ok) {
        throw new Error('File upload failed');
    }
}

export async function uploadAndGetFileLink(file) {
    const { uploadUrl, url } = await requestUploadDetails(file);
    await uploadFileToS3(uploadUrl, file);
    return url;
}
// export async function uploadAndGetFileLink(file) {
//     const { uploadUrl, key } = await requestUploadDetails(file);
//     await uploadFileToS3(uploadUrl, file);
//     return `https://static-au03.vitalstats.app/${key}`;
// }