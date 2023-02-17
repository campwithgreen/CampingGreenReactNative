import axiosInstance from '../config/axiosInstance';
export function getAllPosts() {
  let endpoint = `v2/community`;
  return axiosInstance.get(endpoint);
}
export function createPost(body) {
  let endpoint = `v2/community`;
  return axiosInstance.post(endpoint, body);
}
export function likePost(data) {
  let endpoint = `v2/community/likePost`;
  return axiosInstance.post(endpoint, data);
}
export function createCommentOnPost(commentData) {
  let endpoint = `v2/community/createComment`;
  return axiosInstance.post(endpoint, commentData);
}
export function fetchPostComments(postId) {
  let endpoint = `v2/community/fetchComments`;
  return axiosInstance.post(endpoint, postId);
}
export function deletePost(postId) {
  let endpoint = `v2/community/deletePost`;
  return axiosInstance.post(endpoint, postId);
}
export function deleteComment(commentId) {
  let endpoint = `v2/community/deleteComment`;
  return axiosInstance.post(endpoint, commentId);
}
export function reportPost(reportContent) {
  let endpoint = `v2/community/reportPost`;
  return axiosInstance.post(endpoint, reportContent);
}
export function getAllPostsReport() {
  let endpoint = `v2/community/fetchAllReports`;
  return axiosInstance.get(endpoint);
}
export function deletePostByAdmin(postId) {
  let endpoint = `v2/community/deletePostbyAdmin`;
  return axiosInstance.post(endpoint, postId);
}
