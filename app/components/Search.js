"use client";
import React, { useState } from "react";

function Search({ setName, setRecipes }) {
  const [categories, setCategories] = useState("");
  const [search, setSearch] = useState("");

  const searchRecipes = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const result = await res.json();
      setRecipes(result?.meals);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 mb-4">
      <select
        value={categories}
        onChange={(e) => {
          setCategories(e.target.value);
          setName(e.target.value);
        }}
        className="border-2 border-gray-400 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      >
        <option value="Chicken">Chicken</option>
        <option value="Beef">Beef</option>
        <option value="Lamb">Lamb</option>
        <option value="Seafood">Seafood</option>
      </select>
      <h1 className="text-xl text-center mx-4 text-gray-500">OR</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-gray-400 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text"
        placeholder="Search for a recipe"
      />
      <button
        onClick={searchRecipes}
        className="bg-black hover:bg-green-950 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
