import ArticleCarousel from "../components/ArticleCarousel";
const HomePage = () => {
  async function callTestEndpoint() {
    try {
      const response = await fetch("https://brain-app-two.vercel.app/api/test");
      const data = await response.json();
      console.log("Response from /api/test:", data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  }

  return (
    <div>
      <ArticleCarousel />
      <button onClick={callTestEndpoint}>Test Notification</button>
    </div>
  );
};
export default HomePage;
