import React, { useState } from "react";
import {Pencil, Trash2} from 'lucide-react'

export default function Form() {
  //NUTRITION CLASSIFICATION
  const [nutrition, setNutrition] = useState({ name: "", quantity: "" });
  const [nutritionEditIndex, setNutritionEditIndex] = useState(null);

  const addOrUpdateNutrition = () => {
  if (!nutrition.name || !nutrition.quantity) return;

  const updated = [...recipe.nutritionClassification];

  if (nutritionEditIndex !== null) {
    updated[nutritionEditIndex] = nutrition;
    setNutritionEditIndex(null);
  } else {
    updated.push(nutrition);
  }

  setRecipe({ ...recipe, nutritionClassification: updated });

  setNutrition({ name: "", quantity: "" });
  };


  
  // INGREDIENT EDIT MODE
  const [editIndex, setEditIndex] = useState(null);
  const editIngredient = (index) => {
    const ing = recipe.ingredients[index];
    setIngredient(ing);
    setEditIndex(index);
  };

  // ADD / UPDATE INGREDIENT
  const addOrUpdateIngredient = () => {
    if (!ingredient.name) return;

    if (editIndex !== null) {
      const updatedList = [...recipe.ingredients];
      updatedList[editIndex] = ingredient;

      setRecipe({ ...recipe, ingredients: updatedList });
      setEditIndex(null);
    } else {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      });
    }

    setIngredient({
      name: "",
      quantity: "",
      priceRange: { start: "", end: "" },
      estimatedPrice: 0,
    });
  };

  // MAIN RECIPE STATE
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
    tipsAndTricks: [],
    nutritionClassification: [],
    isHighProtein: false,
    timeOfDay: "",
  });

  // INGREDIENT INPUT STATE
  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    priceRange: { start: "", end: "" },
    estimatedPrice: 0,
  });

  // HANDLE PRICE RANGE + AVERAGE
  const handlePriceChange = (field, value) => {
    setIngredient((prev) => {
      const updatedRange = { ...prev.priceRange, [field]: Number(value) };
      const avgPrice =
        updatedRange.start && updatedRange.end
          ? (updatedRange.start + updatedRange.end) / 2
          : 0;

      return {
        ...prev,
        priceRange: updatedRange,
        estimatedPrice: avgPrice,
      };
    });
  };

  // REMOVE INGREDIENT
  const removeIngredient = (index) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index),
    });
  };

  // OTHER STATES (PRE / POST / TIPS / COOKING)
  const [newPreStep, setNewPreStep] = useState("");
  const [preEditIndex, setPreEditIndex] = useState(null);

  const [newPostStep, setNewPostStep] = useState("");
  const [postEditIndex, setPostEditIndex] = useState(null);

  const [newTip, setNewTip] = useState("");
  const [tipEditIndex, setTipEditIndex] = useState(null);

  const [cookingKey, setCookingKey] = useState("");
  const [cookingStep, setCookingStep] = useState("");
  const [editCookingStepIndex, setEditCookingStepIndex] = useState(null);

  // BASIC CHANGE HANDLER
  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // NUTRITION CHANGE HANDLER
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

  // PRE COOKING
  const addOrEditPreStep = () => {
    if (!newPreStep) return;

    if (preEditIndex !== null) {
      const updated = [...recipe.preCookingProcess];
      updated[preEditIndex] = newPreStep;
      setRecipe({ ...recipe, preCookingProcess: updated });
      setPreEditIndex(null);
    } else {
      setRecipe({
        ...recipe,
        preCookingProcess: [...recipe.preCookingProcess, newPreStep],
      });
    }
    setNewPreStep("");
  };

  const editPreStep = (index) => {
    setNewPreStep(recipe.preCookingProcess[index]);
    setPreEditIndex(index);
  };

  const deletePreStep = (index) => {
    setRecipe({
      ...recipe,
      preCookingProcess: recipe.preCookingProcess.filter((_, i) => i !== index),
    });
  };

  // POST COOKING
  const addOrEditPostStep = () => {
    if (!newPostStep) return;

    if (postEditIndex !== null) {
      const updated = [...recipe.postCookingProcess];
      updated[postEditIndex] = newPostStep;
      setRecipe({ ...recipe, postCookingProcess: updated });
      setPostEditIndex(null);
    } else {
      setRecipe({
        ...recipe,
        postCookingProcess: [...recipe.postCookingProcess, newPostStep],
      });
    }
    setNewPostStep("");
  };

  const editPostStep = (index) => {
    setNewPostStep(recipe.postCookingProcess[index]);
    setPostEditIndex(index);
  };

  const deletePostStep = (index) => {
    setRecipe({
      ...recipe,
      postCookingProcess: recipe.postCookingProcess.filter((_, i) => i !== index),
    });
  };

  // TIPS
  const addOrEditTip = () => {
    if (!newTip) return;

    if (tipEditIndex !== null) {
      const updated = [...recipe.tipsAndTricks];
      updated[tipEditIndex] = newTip;
      setRecipe({ ...recipe, tipsAndTricks: updated });
      setTipEditIndex(null);
    } else {
      setRecipe({
        ...recipe,
        tipsAndTricks: [...recipe.tipsAndTricks, newTip],
      });
    }
    setNewTip("");
  };

  const editTip = (index) => {
    setNewTip(recipe.tipsAndTricks[index]);
    setTipEditIndex(index);
  };

  const deleteTip = (index) => {
    setRecipe({
      ...recipe,
      tipsAndTricks: recipe.tipsAndTricks.filter((_, i) => i !== index),
    });
  };

  // COOKING PROCESS
  const deleteCookingSection = (key) => {
    const updated = { ...recipe.cookingProcess };
    delete updated[key];
    setRecipe({ ...recipe, cookingProcess: updated });
  };

  const editCookingSectionName = (oldKey) => {
    const newKey = prompt("Enter new section name:", oldKey);
    if (!newKey) return;

    const updated = { ...recipe.cookingProcess };
    updated[newKey] = updated[oldKey];
    delete updated[oldKey];

    setRecipe({ ...recipe, cookingProcess: updated });
  };

  const addOrEditCookingStep = () => {
    if (!cookingKey || !cookingStep) return;

    const process = { ...recipe.cookingProcess };

    if (!process[cookingKey]) process[cookingKey] = [];

    if (editCookingStepIndex !== null) {
      process[cookingKey][editCookingStepIndex] = cookingStep;
      setEditCookingStepIndex(null);
    } else {
      process[cookingKey].push(cookingStep);
    }

    setRecipe({ ...recipe, cookingProcess: process });
    setCookingStep("");
  };

  const editCookingStep = (section, index) => {
    setCookingKey(section);
    setCookingStep(recipe.cookingProcess[section][index]);
    setEditCookingStepIndex(index);
  };

  const deleteCookingStep = (section, index) => {
    const process = { ...recipe.cookingProcess };
    process[section] = process[section].filter((_, i) => i !== index);
    setRecipe({ ...recipe, cookingProcess: process });
  };

  // SUBMIT (SAVE TO LOCAL STORAGE)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert recipe to JSON string
    const jsonString = JSON.stringify(recipe, null, 2);

    // Create a Blob (file-like object)
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a temporary download link
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${recipe.name || "recipe"}.json`; // file name

    // Trigger download
    link.click();

    // Clean up
    URL.revokeObjectURL(url);

    // RESET FORM
    setRecipe({
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
      tipsAndTricks: [],
      nutritionClassification: [],
      isHighProtein: false,
      timeOfDay: "",
    });

    setIngredient({ name: "", quantity: "", priceRange: { start: "", end: "" }, estimatedPrice: 0 });
    setNewPreStep("");
    setNewPostStep("");
    setNewTip("");
    setCookingKey("");
    setCookingStep("");
  };

  // RETURN UI
  return (
    <div className="p-8 bg-white rounded-2xl shadow-md max-w-4xl mx-auto space-y-6 font-serif">
      <h1 className="text-2xl font-semibold text-center">Add New Recipe</h1>

      {/* BASIC FIELDS */}
      <div className="grid grid-cols-2 gap-4">
        {["name", "category", "prepTime", "cookTime", "calories", "protein", "timeOfDay"].map((key) => (
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

      {/* NUTRITION CLASSIFICATION */}
      <div>
        <h2 className="font-semibold">Nutrition Info</h2>
        <div>
          <input
            type="text"
            placeholder="Nutrition Name"
            value={nutrition.name}
            onChange={(e) => setNutrition({ ...nutrition, name: e.target.value })}
            className="border p-2 rounded mr-2 mb-2 w-1/4"
          />

          <input
            type="text"
            placeholder="Quantity"
            value={nutrition.quantity}
            onChange={(e) => setNutrition({ ...nutrition, quantity: e.target.value })}
            className="border p-2 rounded mr-2 mb-2 w-1/4"
          />

          <button
            type="button"
            onClick={addOrUpdateNutrition}
            className="bg-green-500 text-white p-2 w-8 rounded"
          >
            {nutritionEditIndex !== null ? "Update" : "+"}
          </button>
        </div>
      </div>

      <ul>
        {recipe.nutritionClassification.map((item, index) => (
          <li key={index} className="flex justify-between py-1">
            {item.name} - {item.quantity}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNutrition(item);
                  setNutritionEditIndex(index);
                }}
                className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
              >
                <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
              </button>

              <button
                onClick={() =>
                  setRecipe({
                    ...recipe,
                    nutritionClassification: recipe.nutritionClassification.filter(
                      (_, i) => i !== index
                    ),
                  })
                }
                className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
              >
                <Trash2 className="stroke-red-500 hover:stroke-white duration-200 "/>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* INGREDIENTS */}
      <div>
        <h2 className="font-semibold">Ingredients</h2>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) =>
              setIngredient({ ...ingredient, name: e.target.value })
            }
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              setIngredient({ ...ingredient, quantity: e.target.value })
            }
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            placeholder="Start Price"
            value={ingredient.priceRange.start}
            onChange={(e) => handlePriceChange("start", e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            placeholder="End Price"
            value={ingredient.priceRange.end}
            onChange={(e) => handlePriceChange("end", e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            type="button"
            onClick={addOrUpdateIngredient}
            className="bg-green-500 text-white px-3 rounded"
          >
            {editIndex !== null ? "Update" : "+"}
          </button>
        </div>

        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between py-1 list-disc">
              {ing.name} - {ing.quantity} - ₹{ing.estimatedPrice}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => editIngredient(i)}
                  className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                >
                  <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                </button>
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                >
                  <Trash2 className="stroke-red-500 hover:stroke-white duration-200 "/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* PRE COOKING */}
      <div>
        <h2 className="font-semibold">Pre-Cooking Process</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add step"
            value={newPreStep}
            onChange={(e) => setNewPreStep(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={addOrEditPreStep}
            className="bg-green-500 text-white px-3 rounded"
          >
            {preEditIndex !== null ? "Update" : "+"}
          </button>
        </div>
        <ul>
          {recipe.preCookingProcess.map((step, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              {step}
              <div className="flex gap-2">
                <button
                  className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                  onClick={() => editPreStep(i)}
                >
                  <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                </button>
                <button
                  className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                  onClick={() => deletePreStep(i)}
                >
                  <Trash2 className="stroke-red-500 hover:stroke-white duration-200"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* COOKING PROCESS */}
      <div>
        <h2 className="font-semibold">Cooking Process</h2>
        <div className="gap-2 mb-2 lg::grid-cols-2 md:grid-cols-3 flex">
          <input
            type="text"
            placeholder="Section Name"
            value={cookingKey}
            onChange={(e) => setCookingKey(e.target.value)}
            className="border p-2 rounded w-full flex"
          />
          <input
            type="text"
            placeholder="Step"
            value={cookingStep}
            onChange={(e) => setCookingStep(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={addOrEditCookingStep}
            className="bg-green-500 w-10 p-2 text-white rounded"
          >
            {editCookingStepIndex !== null ? "Update" : "+"}
          </button>
        </div>
        {Object.keys(recipe.cookingProcess).map((section) => (
          <div key={section} className="border rounded p-3 mb-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">{section}</h3>
              <div className="flex gap-2">
                <button
                  className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                  onClick={() => editCookingSectionName(section)}
                >
                  <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                </button>
                <button
                  className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                  onClick={() => deleteCookingSection(section)}
                >
                  <Trash2 className="stroke-red-500 hover:stroke-white duration-200"/>
                </button>
              </div>
            </div>
            <ul className="mt-2">
              {recipe.cookingProcess[section].map((step, i) => (
                <li key={i} className="flex justify-between border-b py-1">
                  {step}
                  <div className="flex gap-2">
                    <button
                      className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                      onClick={() => editCookingStep(section, i)}
                    >
                      <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                    </button>
                    <button
                      className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                      onClick={() => deleteCookingStep(section, i)}
                    >
                      <Trash2 className="stroke-red-500 hover:stroke-white duration-200"/>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* POST COOKING */}
      <div>
        <h2 className="font-semibold">Post-Cooking Process</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add step"
            value={newPostStep}
            onChange={(e) => setNewPostStep(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={addOrEditPostStep}
            className="bg-green-500 text-white px-3 rounded"
          >
            {postEditIndex !== null ? "Update" : "+"}
          </button>
        </div>
        <ul>
          {recipe.postCookingProcess.map((step, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              {step}
              <div className="flex gap-2">
                <button
                  className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                  onClick={() => editPostStep(i)}
                >
                  <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                </button>
                <button
                  className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                  onClick={() => deletePostStep(i)}
                >
                  <Trash2 className="stroke-red-500 hover:stroke-white duration-200"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* TIPS & TRICKS */}
      <div>
        <h2 className="font-semibold">Tips & Tricks</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add tip"
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={addOrEditTip}
            className="bg-green-500 text-white px-3 rounded"
          >
            {tipEditIndex !== null ? "Update" : "+"}
          </button>
        </div>
        <ul>
          {recipe.tipsAndTricks.map((tip, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              {tip}
              <div className="flex gap-2">
                <button
                  className="p-1 rounded border border-amber-500 hover:bg-amber-500 duration-200"
                  onClick={() => editTip(i)}
                >
                  <Pencil className="stroke-amber-500 hover:stroke-amber-50"/>
                </button>
                <button
                  className="p-1 rounded border hover:bg-red-500 duration-200 border-red-500"
                  onClick={() => deleteTip(i)}
                >
                  <Trash2 className="stroke-red-500 hover:stroke-white duration-200"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-2xl duration-200"
      >
        Save Recipe
      </button>
    </div>
  );
}
