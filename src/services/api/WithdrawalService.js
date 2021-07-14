import { apiClient } from "../apiClient";
import { translateUser } from "./translators/translateUser";

async function getAll(qParams = {}) {
  const url = `/wallet/getAllWalletRequestForAdmin`;
  const params = {
    ...qParams,
  };
  const res = apiClient.get(url, { params });
  return res;
}

async function getAllByKyc(qParams = {}, kycFlag) {
  const url = `/admin/getAllUsersByKyc/${kycFlag}`;
  const params = {
    limit: qParams.limit,
    page: qParams.page,
  };
  const res = apiClient.get(url, { params });
  return res;
}

async function getById(userId) {
  const url = `/users/${userId}`;

  const res = await apiClient.get(url);

  return translateUser(res.data);
}

async function create(body) {
  const url = `/users`;

  const res = await apiClient.post(url, body);

  return translateUser(res.data);
}

async function updateKyc(userId) {
  const url = `/admin/userKycApproval/${userId}`;

  const res = await apiClient.put(url);

  return res;
}

async function deleteUser(userId) {
  const url = `/admin/deleteUser?userId=${userId}`;

  const res = await apiClient.delete(url);

  return res;
}

async function getPackageById(userId) {
  const url = `/package/getPackageByUserId/${userId}`;

  const res = await apiClient.get(url);

  return res;
}

export default {
  getAll,
  getAllByKyc,
  getById,
  create,
  updateKyc,
  getPackageById,
  deleteUser
};