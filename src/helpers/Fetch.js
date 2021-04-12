const Fetch = async (url) => {
  //'https://cors-anywhere.herokuapp.com/'  CORS proxy  if needed
  const fetchUrl = url;

  let result = await fetch(fetchUrl);
  let response = await result.json();
  return response;
};

export default Fetch;
