
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Card({ recipe }) {
  return (
    <Link href={`/recipes/${recipe?.idMeal}`}>
      <div className="max-w-sm border-2 border-gray-400 cursor-pointer hover:border-black">
        {recipe?.strMealThumb && (
          <Image
            src={recipe.strMealThumb}
            width={350}
            height={250}
            alt="meal image"
            loading="lazy"
            className="rounded-t-lg"
          />
        )}
        <h1 className="bg-white py-4 text-gray-500 font-semibold text-2xl text-center">
          {recipe?.strMeal}
        </h1>
      </div>
    </Link>
  );
}

export default Card;
