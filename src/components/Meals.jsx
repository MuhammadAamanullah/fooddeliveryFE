import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Fetching data ...</p>;
  }
  if (error) {
    return <Error title="failed to fetch message" message={error.message} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} item={meal} />
      ))}
    </ul>
  );
}
