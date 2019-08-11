import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import uuidv4 from 'uuid/v4'
import './../css/app.css'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [seletedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes ] = useState(sampleRecipes)
  const seletedRecipe = recipes.find(recipe => recipe.id === seletedRecipeId)

  useEffect(()=> {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON !== null ) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  
  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(), 
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: ''
        }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id )
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  const handleRecipeDelete = (id) => {
    if (seletedRecipeId !== null && seletedRecipeId === id ){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id)
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }
  

  return (
    <RecipeContext.Provider value ={recipeContextValue}>
      <RecipeList 
      recipes={recipes}
      />
      {seletedRecipe && <RecipeEdit recipe={seletedRecipe} />}
    </RecipeContext.Provider>
  )
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1.45',
    instructions: "1. Put salt on chicken.\n2. Put chicken in oven. \n3. Eat chicken.",
    ingredients: [{
      id: 1,
      name: 'chicken',
      amount: '2 pounds'
    }, {
      id: 2,
      name: 'salt',
      amount: '1 Tbs'
       }],
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0.45',
    instructions: "1. Put paprika on pork.\n2. Put chicken in oven. \n3. Eat pork.",
    ingredients: [{
      id: 1,
      name: 'pork',
      amount: '3 pounds'
    }, {
      id: 2,
      name: 'paprika',
      amount: '2 Tbs'
       }],
  },

]

export default App
