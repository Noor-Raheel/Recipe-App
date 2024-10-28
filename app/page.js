
"use client";
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Card from "./components/Card";
import Layout from "./components/Navbar";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("Chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error before fetching

    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const result = await res.json();
        setRecipes(result?.meals || []); // Fallback in case meals is null
      } catch (err) {
        console.error(err);
        setError("Failed to load recipes."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [name]);

  return (
    <div>
      <Layout>
      <h2 className='text-2xl font-bold mb-4'>Welcome to the Recipe App!</h2>
            <p>Explore various types of recipes from around the world.</p>
   
      </Layout>
      <Search setName={setName} />

      <div className="flex items-center justify-center p-10">
        {loading ? (
          <h1 className="text-center text-3xl">Loading.....</h1>
        ) : error ? ( // Display error message if it exists
          <h1 className="text-center text-3xl text-red-500">{error}</h1>
        ) : (
          <div className="flex flex-wrap flex-col lg:flex-row items-center gap-5">
            {recipes?.map((recipe) => (
              <Card key={recipe?.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
