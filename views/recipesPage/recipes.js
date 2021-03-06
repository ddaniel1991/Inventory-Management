let recipesObj = {
    isPopulated: false,

    display: function(){
        controller.clearScreen();
        controller.recipesStrand.style.display = "flex";

        if(!this.isPopulated){
            this.populateRecipes();
            this.isPopulated = true;
        }
    },

    populateRecipes: function(){
        let body = document.querySelector("#recipesContainer");
        let blankRecipes = 0;

        while(body.children.length > 0){
            body.removeChild(body.firstChild);
        }

        merchant.recipes.sort((a, b) => (a.name > b.name)? 1 : -1);
        
        for(let recipe of merchant.recipes){
            let recipeDiv = document.createElement("div");
            recipeDiv.classList = "recipe-card";
            recipeDiv.onclick = ()=>{singleRecipeObj.display(recipe)};
            body.appendChild(recipeDiv);

            if(recipe.ingredients.length === 0){
                recipeDiv.classList = "recipe-card empty-recipe";
                blankRecipes++;
            }else{
                recipeDiv.classList = "recipe-card";
            }

            let title = document.createElement("h2");
            title.innerText = recipe.name;
            recipeDiv.appendChild(title);

            let ingredientList = document.createElement("ul");
            recipeDiv.appendChild(ingredientList);

            for(let ingredient of recipe.ingredients){
                let ul = document.createElement("li");
                ul.innerText = ingredient.ingredient.name;
                ingredientList.appendChild(ul);
            }
        }

        if(blankRecipes > 0){
            banner.createError(`You have ${blankRecipes} recipes without ingredients, please add ingredients to all recipes`);
        }
    },

    updateRecipes: function(){
        axios.get("/merchant/recipes/update")
            .then((result)=>{
                if(typeof(result.data) === "string"){
                    banner.createError(result.data);
                }else{
                    merchant = result.data;
                    this.populateRecipes();
                    banner.createNotification("Your recipes have been updated successfully");
                }
            })
            .catch((err)=>{
                banner.createError("There was an error and your recipes could not be updated");
            });
    }
}