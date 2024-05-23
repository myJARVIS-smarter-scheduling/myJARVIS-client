const fetchData = (endpoint: string, accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers,
  };

  return fetch(endpoint, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => console.error(error));
};

export default fetchData;
