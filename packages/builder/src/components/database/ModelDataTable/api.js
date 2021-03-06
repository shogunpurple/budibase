import api from "builderStore/api"

export async function createUser(user, appId, instanceId) {
  const CREATE_USER_URL = `/api/${appId}/${instanceId}/users`
  const response = await api.post(CREATE_USER_URL, user)
  const json = await response.json()
  return json.user
}

export async function createDatabase(clientId, appname, instanceName) {
  const CREATE_DATABASE_URL = `/api/${clientId}/${appname}/instances`
  const response = await api.post(CREATE_DATABASE_URL, {
    name: instanceName,
  })
  return await response.json()
}

export async function deleteRecord(record, instanceId) {
  const DELETE_RECORDS_URL = `/api/${instanceId}/records/${record._id}/${record._rev}`
  const response = await api.delete(DELETE_RECORDS_URL)
  return response
}

export async function saveRecord(record, instanceId) {
  const SAVE_RECORDS_URL = `/api/${instanceId}/records`
  const response = await api.post(SAVE_RECORDS_URL, record)

  return await response.json()
}

export async function fetchDataForView(viewName, instanceId) {
  const FETCH_RECORDS_URL = `/api/${instanceId}/${viewName}/records`

  const response = await api.get(FETCH_RECORDS_URL)
  return await response.json()
}
