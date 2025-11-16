import React, { useState } from "react";

export default function Form() {

  const [editIndex, setEditIndex] = useState(null);
  const editIngredient = (index) => {
  const ing = recipe.ingredients[index];
  setIngredient(ing);      // Load data into input fields
  setEditIndex(index);     // Set the current index being edited
};
  const addOrUpdateIngredient = () => {
  if (!ingredient.name) return;

  if (editIndex !== null) {
    // UPDATE existing ingredient
    const updatedList = [...recipe.ingredients];
    updatedList[editIndex] = ingredient;

    setRecipe({ ...recipe, ingredients: updatedList });
    setEditIndex(null);  // Exit edit mode
  } else {
    // ADD new ingredient
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient],
    });
  }

  // Reset input
  setIngredient({ name: "", quantity: "", priceRange: "", estimatedPrice: "" });
  };

  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    category: "",
    image: "",
    prepTime: "",
    cookTime: "",
    calories: "",
    protein: "",
    description: "",
    ingredients: [],
    preCookingProcess: [],
    cookingProcess: {},
    postCookingProcess: [],
    nutritionClassification: { protein: "", carbs: "", fats: "", fiber: "" },
    tipsAndTricks: [],
    isHighProtein: false,
    timeOfDay: "",
    start:"",
    end: ""
  });

  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    priceRange: {start: "", end: "" },
    estimatedPrice: 0,
  });

  const handlePriceChange = (field, value) => {
  setIngredient(prev => {
    const updatedRange = { ...prev.priceRange, [field]: Number(value) };

    const avgPrice =
      updatedRange.start && updatedRange.end
        ? (Number(updatedRange.start) + Number(updatedRange.end)) / 2
        : 0;

    return {
      ...prev,
      priceRange: updatedRange,
      estimatedPrice: avgPrice,
    };
  });
};

  {recipe.ingredients.map((item, index) => (
  <div key={index}>
    {item.name} - {item.quantity} - {item.estimatedPrice}

    <button onClick={() => editIngredient(index)}>Edit</button>
    <button onClick={() => removeIngredient(index)}>Remove</button>
  </div>
))}

  const [newPreStep, setNewPreStep] = useState("");
  const [newPostStep, setNewPostStep] = useState("");
  const [cookingKey, setCookingKey] = useState("");
  const [cookingStep, setCookingStep] = useState("");

  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addIngredient = () => {
    if (!ingredient.name) return;
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
    setIngredient({ name: "", quantity: "", priceRange: "", estimatedPrice: "" });
  };

  const removeIngredient = (index) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index),
    });
  };

  const addPreStep = () => {
    if (!newPreStep) return;
    setRecipe({
      ...recipe,
      preCookingProcess: [...recipe.preCookingProcess, newPreStep],
    });
    setNewPreStep("");
  };

  const addPostStep = () => {
    if (!newPostStep) return;
    setRecipe({
      ...recipe,
      postCookingProcess: [...recipe.postCookingProcess, newPostStep],
    });
    setNewPostStep("");
  };

  const addCookingStep = () => {
    if (!cookingKey || !cookingStep) return;
    const process = { ...recipe.cookingProcess };
    if (!process[cookingKey]) process[cookingKey] = [];
    process[cookingKey].push(cookingStep);
    setRecipe({ ...recipe, cookingProcess: process });
    setCookingStep("");
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      nutritionClassification: {
        ...recipe.nutritionClassification,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md max-w-4xl mx-auto space-y-6 font-serif">
      <h1 className="text-2xl font-semibold text-center">Add New Recipe</h1>

      {/* Basic Fields */}
      <div className="grid grid-cols-2 gap-4">
        {["id", "name", "category", "prepTime", "cookTime", "calories", "protein", "timeOfDay"].map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={recipe[key]}
            onChange={handleBasicChange}
            placeholder={key}
            className="border p-2 rounded"
          />
        ))}
      </div>

      <textarea
        name="description"
        value={recipe.description}
        onChange={handleBasicChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      {/* Ingredients */}
      <div>
        <h2 className="font-semibold">Ingredients</h2>
        <div className="flex gap-2 mb-2">
          {["name", "quantity", "priceRange", "estimatedPrice"].map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              value={ingredient[key]}
              onChange={(e) => setIngredient({ ...ingredient, [e.target.name]: e.target.value })}
              placeholder={key}
              className="border p-2 rounded w-full"
            />
          ))}
          <button type="button" onClick={addIngredient} className="bg-green-500 text-white px-3 rounded">
            +
          </button>
        </div>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              {ing.name} - {ing.quantity}
              <button type="button" onClick={() => removeIngredient(i)} className=" text-white bg-red-500 p-1 rounded-2xl w-10 font-bold">x</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Cooking */}
      <div>
        <h2 className="font-semibold">Pre-Cooking Steps</h2>
        <div className="flex gap-2 mb-2">
          <input
            value={newPreStep}
            onChange={(e) => setNewPreStep(e.target.value)}
            placeholder="Add step"
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={addPreStep} className="bg-green-500 text-white px-3 rounded">+</button>
        </div>
        <ul className="list-disc ml-5">
          {recipe.preCookingProcess.map((step, i) => <li key={i}>{step}</li>)}
        </ul>
      </div>

      {/* Cooking Process */}
      <div>
        <h2 className="font-semibold">Cooking Process</h2>
        <input
          type="text"
          placeholder="Section (e.g. Prepare the sauce)"
          value={cookingKey}
          onChange={(e) => setCookingKey(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Step"
            value={cookingStep}
            onChange={(e) => setCookingStep(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={addCookingStep} className="bg-green-500 text-white px-3 rounded">+</button>
        </div>
        <div className="ml-5">
          {Object.entries(recipe.cookingProcess).map(([section, steps]) => (
            <div key={section}>
              <h3 className="font-semibold">{section}</h3>
              <ul className="list-disc ml-5">
                {steps.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Cooking */}
      <div>
        <h2 className="font-semibold">Post-Cooking Steps</h2>
        <div className="flex gap-2 mb-2">
          <input
            value={newPostStep}
            onChange={(e) => setNewPostStep(e.target.value)}
            placeholder="Add step"
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={addPostStep} className="bg-green-500 text-white px-3 rounded">+</button>
        </div>
        <ul className="list-disc ml-5">
          {recipe.postCookingProcess.map((step, i) => <li key={i}>{step}</li>)}
        </ul>
      </div>

      {/* Nutrition */}
      <div>
        <h2 className="font-semibold">Nutrition Classification</h2>
        <div className="grid grid-cols-4 gap-2">
          {["protein", "carbs", "fats", "fiber"].map((key) => (
            <input
              key={key}
              name={key}
              value={recipe.nutritionClassification[key]}
              onChange={handleNutritionChange}
              placeholder={key}
              className="border p-2 rounded"
            />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div>
        <h2 className="font-semibold">Tips & Tricks</h2>
        <textarea
          placeholder="Comma-separated tips"
          value={recipe.tipsAndTricks.join(" ")}
          onChange={(e) => setRecipe({ ...recipe, tipsAndTricks: e.target.value.split(" ").map(t => t.trim( )) })}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <label>High Protein?</label>
        <input type="checkbox" name="isHighProtein" checked={recipe.isHighProtein} onChange={handleBasicChange} />
      </div>

      <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Recipe
      </button>
    </div>
  );
}

// import React, { useState } from "react";

// export default function SimpleRecipeForm() {
//   const [recipe, setRecipe] = useState({
//     id: "",
//     name: "",
//     category: "",
//     image: "",
//     prepTime: "",
//     cookTime: "",
//     calories: "",
//     protein: "",
//     description: "",
//     ingredients: [],
//     preCookingProcess: [],
//     cookingProcess: {},
//     postCookingProcess: [],
//     nutritionClassification: {
//       protein: "",
//       carbs: "",
//       fats: "",
//       fiber: ""
//     },
//     tipsAndTricks: [],
//     isHighProtein: false,
//     timeOfDay: ""
//   });

//   const [ingredient, setIngredient] = useState({
//     name: "",
//     quantity: "",
//     priceRange: "",
//     estimatedPrice: ""
//   });

//   const [ingredientList, setIngredientList] = useState([]);

//   // Add ingredient to list
//   const addIngredient = () => {
//     if (!ingredient.name || !ingredient.quantity) return;
//     setIngredientList([...ingredientList, ingredient]);
//     setIngredient({ name: "", quantity: "", priceRange: "", estimatedPrice: "" });
//   };

//   // Remove ingredient from list
//   const removeIngredient = index => {
//     setIngredientList(ingredientList.filter((_, i) => i !== index));
//   };

//   // Whenever user clicks "Save", collect all data and show JSON
//   const handleSave = e => {
//     e.preventDefault();
//     const finalData = {
//       ...recipe,
//       ingredients: ingredientList
//     };
//     alert(JSON.stringify(finalData, null, 2));
//   };

//   return (
//     <form
//       className="p-6 bg-white rounded max-w-lg mx-auto space-y-4"
//       onSubmit={handleSave}
//     >
//       <h2 className="font-semibold text-xl">Add Recipe</h2>
//       <input type="text" placeholder="ID" value={recipe.id}
//         onChange={e => setRecipe({ ...recipe, id: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Name" value={recipe.name}
//         onChange={e => setRecipe({ ...recipe, name: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Category" value={recipe.category}
//         onChange={e => setRecipe({ ...recipe, category: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Image URL" value={recipe.image}
//         onChange={e => setRecipe({ ...recipe, image: e.target.value })}
//         className="border p-2 w-full" />

//       <textarea placeholder="Description" value={recipe.description}
//         onChange={e => setRecipe({ ...recipe, description: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Prep Time" value={recipe.prepTime}
//         onChange={e => setRecipe({ ...recipe, prepTime: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Cook Time" value={recipe.cookTime}
//         onChange={e => setRecipe({ ...recipe, cookTime: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="number" placeholder="Calories" value={recipe.calories}
//         onChange={e => setRecipe({ ...recipe, calories: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="number" placeholder="Protein" value={recipe.protein}
//         onChange={e => setRecipe({ ...recipe, protein: e.target.value })}
//         className="border p-2 w-full" />

//       <input type="text" placeholder="Time of Day" value={recipe.timeOfDay}
//         onChange={e => setRecipe({ ...recipe, timeOfDay: e.target.value })}
//         className="border p-2 w-full" />

//       {/* Ingredients Section */}
//       <div>
//         <h3>Ingredients</h3>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Name"
//             value={ingredient.name}
//             onChange={e => setIngredient({ ...ingredient, name: e.target.value })}
//             className="border p-2"
//           />
//           <input
//             type="text"
//             placeholder="Quantity"
//             value={ingredient.quantity}
//             onChange={e => setIngredient({ ...ingredient, quantity: e.target.value })}
//             className="border p-2"
//           />
//           <input
//             type="text"
//             placeholder="Price Range (e.g. 100-150)"
//             value={ingredient.priceRange}
//             onChange={e => setIngredient({ ...ingredient, priceRange: e.target.value })}
//             className="border p-2"
//           />
//           <input
//             type="number"
//             placeholder="Estimated Price"
//             value={ingredient.estimatedPrice}
//             onChange={e => setIngredient({ ...ingredient, estimatedPrice: e.target.value })}
//             className="border p-2"
//           />
//           <button type="button" className="bg-green-500 text-white px-2 rounded"
//             onClick={addIngredient}>Add</button>
//         </div>
//         <ul>
//           {ingredientList.map((ing, i) => (
//             <li key={i} className="my-1">
//               {ing.name} - {ing.quantity} - {ing.priceRange} - {ing.estimatedPrice}
//               <button type="button" className="bg-red-500 text-white px-2 mx-2 rounded"
//                 onClick={() => removeIngredient(i)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tips and Nutrition Classification (simplified for brevity) */}
//       <input
//         type="text"
//         placeholder="Tips (comma separated)"
//         value={recipe.tipsAndTricks.join(', ')}
//         onChange={e => setRecipe({ ...recipe, tipsAndTricks: e.target.value.split(',').map(x => x.trim()) })}
//         className="border p-2 w-full"
//       />

//       <input
//         type="checkbox"
//         checked={recipe.isHighProtein}
//         onChange={e => setRecipe({ ...recipe, isHighProtein: e.target.checked })}
//       /> High Protein

//       {/* Save Button */}
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
//         Save Recipe
//       </button>
//     </form>
//   );
// }

