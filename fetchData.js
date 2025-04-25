export const fetchData = async () => {
  const response = await fetch("./data.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = response.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};
