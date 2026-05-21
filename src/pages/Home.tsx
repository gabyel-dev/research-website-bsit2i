import { TopNav } from "../components/layout/TopNav.js";
import { Hero } from "../components/home/Hero.js";
import { ResearchArticles } from "../components/home/ResearchArticles.js";
import { ResearchersLoggedIn } from "../components/home/ResearchersLoggedIn.js";
import { Contributors } from "../components/home/Contributors.js";
import { Footer } from "../components/layout/Footer.js";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#0A0710] text-mist pb-20">
      <TopNav />
      <main className="flex flex-col">
        <Hero />
        <ResearchArticles />
        <ResearchersLoggedIn />
        <Contributors />
      </main>
      <Footer />
    </div>
  );
};
