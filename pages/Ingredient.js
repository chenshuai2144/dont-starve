import React from "react";
import { Tooltip } from "antd";
import locale from '../data/locale.json';

const RECIPES = {}
RECIPES.quagmire_foliage_cooked = 'images/ingredients/foliage.png';
RECIPES.quagmire_onion_cooked = 'images/ingredients/onion.png';
RECIPES.quagmire_carrot_cooked = 'images/ingredients/carrot.png';
RECIPES.quagmire_mushrooms_cooked = 'images/ingredients/mushrooms.png';
RECIPES.quagmire_crabmeat_cooked = 'images/ingredients/crabmeat.png';
RECIPES.quagmire_potato_cooked = 'images/ingredients/potato.png';
RECIPES.quagmire_salmon_cooked = 'images/ingredients/salmon.png';
RECIPES.quagmire_cookedsmallmeat = 'images/ingredients/smallmeat.png';
RECIPES.twigs = 'images/ingredients/twigs.png';
RECIPES.quagmire_turnip_cooked = 'images/ingredients/turnip.png';
RECIPES.quagmire_sap = 'images/ingredients/sap.png';
RECIPES.rocks = 'images/ingredients/rocks.png';
RECIPES.quagmire_goatmilk = 'images/ingredients/goatmilk.png';
RECIPES.quagmire_syrup = 'images/ingredients/syrup.png';
RECIPES.quagmire_flour = 'images/ingredients/flour.png';
RECIPES.quagmire_garlic_cooked = 'images/ingredients/garlic.png';
RECIPES.berries_cooked = 'images/ingredients/berries.png';
RECIPES.cookedmeat = 'images/ingredients/meat.png';
RECIPES.quagmire_tomato_cooked = 'images/ingredients/tomato.png';
RECIPES.quagmire_spotspice_ground = 'images/ingredients/spotspice_ground.png';

const Ingredient = ({ ingredient }) => {
  return (
    <Tooltip title={locale[ingredient]}>
        <img
            src={`https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/${RECIPES[ingredient]}`}
            alt={locale[ingredient]}
            style={{ width: 18, height: 18 }}
        />
    </Tooltip>
  );
};

  export default Ingredient;