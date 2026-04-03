export async function getHealth() {
  const response = await fetch("http://localhost:3001/health");

  if (!response.ok) {
    throw new Error("Failed to fetch health");
  }

  return response.json();
}