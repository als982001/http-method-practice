const BASE_PATH = "http://localhost:3001/test";

export const getAllTexts = async () => {
  const response = await fetch(BASE_PATH);
  const json = response.json();

  return json;
};

export const getResultById = async (id) => {
  const response = await fetch(`${BASE_PATH}/${id}`);

  if (response.status !== 200) {
    return { status: response.status, statusText: response.statusText };
  }

  const json = await response.json();

  return json;
};

export const getResultByQueryId = async (id) => {
  const response = await fetch(`${BASE_PATH}?id=${id}`);

  if (response.status !== 200) {
    console.log("Error!");
    return { status: response.status, statusText: response.statusText };
  }

  const json = await response.json();

  return json;
};

export const getResultByQueryText = async (text) => {
  const response = await fetch(`${BASE_PATH}?text=${text}`);

  if (response.status !== 200) {
    return { status: response.status, statusText: response.statusText };
  }

  const json = await response.json();

  return json;
};

export const postText = async (id, text) => {
  const newText = { id, text };

  try {
    await fetch(`${BASE_PATH}`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(newText),
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putText = async (id, text) => {
  const updated = { text };

  const response = await fetch(`${BASE_PATH}/${id}`, {
    method: "PUT",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(updated),
  });

  return response.status;
};

export const patchText = async (id, text) => {
  const updated = { text };

  const response = await fetch(`${BASE_PATH}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(updated),
  });

  return response.status;
};

export const deleteText = async (id) => {
  const response = await fetch(`${BASE_PATH}/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "Application/json" },
  });

  return response.status;
};
