import Image from 'next/image';

async function getData(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  return res.json();
}

export default async function Page({ params }) {
  // Awaiting the params to access the id
  const { id } = await params;

  let data;

  try {
    data = await getData(id);
  } catch (error) {
    return <div className="text-center text-red-500">Failed to load recipe data. Please try again later.</div>;
  }

  const meal = data?.meals?.[0];

  return (
    <div className="container mx-auto my-20">
      <div className="flex border-2 border-gray-400 cursor-pointer p-4">
        <div className="relative w-[50%] h-[500px] mr-8">
          {meal?.strMealThumb && (
            <Image
              src={meal.strMealThumb}
              fill
              style={{ objectFit: 'cover' }}
              alt="meal image"
            />
          )}
        </div>
        <div className="w-[50%]">
          <h1 className="bg-white py-4 text-gray-500 font-semibold text-2xl text-center mb-4">
            {meal?.strMeal}
          </h1>

          {/* Ingredients Card */}
          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
              const ingredient = meal?.[`strIngredient${index}`];
              const measurement = meal?.[`strMeasure${index}`];
              return ingredient && measurement ? (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{ingredient}:</span> {measurement}
                </div>
              ) : null;
            })}
          </div>

          {/* Steps Card */}
          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Steps:</h2>
            <ol className="list-decimal pl-4">
              {meal?.strInstructions?.split('\r\n').map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* YouTube Video */}
          {meal?.strYoutube && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={meal.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
