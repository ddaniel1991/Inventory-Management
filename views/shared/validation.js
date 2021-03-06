let validator = {
    ingredient: {
        name: function(ingName, createBanner = true){
            //Check for special chars
            if(!validator.isSanitary(ingName)){
                if(createBanner){
                    banner.createError("Your inputs contain illegal characters");
                }
                return false
            }

            //Check for length
            if(ingName.length < 2){
                if(createBanner){
                    banner.createError("Ingredient name must contain at least 2 characters");
                }
                return false;
            }

            return true;
        },

        category: function(ingCategory, createBanner = true){
            //Check for special chars
            if(!validator.isSanitary(ingCategory)){
                if(createBanner){
                    banner.createError("Your inputs contain illegal characters");
                }

                return false;
            }

            //Check for length
            if(ingCategory.length < 3){
                if(createBanner){
                    banner.createError("Category name must contain at least 3 characters");
                }
                return false;
            }

            return true;
        },

        quantity: function(num, createBanner = true){
            if(isNaN(num) || num === ""){
                if(createBanner){
                    banner.createError("Must enter a valid number");
                }

                return false;
            }

            if(num < 0){
                if(createBanner){
                    banner.createError("Quantity cannot be a negative number");
                }

                return false;
            }

            return true;
        },

        unit: function(ingUnit, createBanner = true){
            //Check for special chars
            if(!validator.isSanitary(ingUnit)){
                if(createBanner){
                    banner.createError("Your inputs contain illegal characters");
                }

                return false;
            }

            return true;
        },

        //Check all parts of ingredient, return true if all pass
        //Quantity passed seperately and optional
        all: function(ingObject, quantity = 0, createBanner = true){
            let nameCheck = this.name(ingObject.name, createBanner);
            let categoryCheck = this.category(ingObject.category, createBanner);
            let unitCheck = this.unit(ingObject.unit, createBanner);
            let quantityCheck = this.quantity(quantity, createBanner);

            if(!nameCheck || !categoryCheck || !quantityCheck || !unitCheck){
                return false;
            }

            return true;
        }
    },

    merchant: {
        password: function(pass, confirmPass, createBanner = true){
            if(pass !== confirmPass){
                if(createBanner){
                    banner.createError("Your passwords do not match");
                }
                return false;
            }

            if(pass.length < 15){
                if(createBanner){
                    banner.createError("Your password must contain at least 15 characters");
                }
                return false;
            }

            return true;
        }
    },

    isSanitary: function(str){
        let disallowed = ["\\", "<", ">", "$"];

        for(let char of disallowed){
            if(str.includes(char)){
                return false;
            }
        }

        return true;
    }
}