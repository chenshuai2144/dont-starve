import React from "react";

/*
#recipebook .dish.large-dish .pot {
background-image: url(images/pot.png);
}
#recipebook .dish.large-dish .oven {
background-image: url(images/casseroledish.png);
}
#recipebook .dish.large-dish .grill {
background-image: url(images/grill.png);
}
#recipebook .dish.small-dish .pot {
background-image: url(images/pot_small.png);
}
#recipebook .dish.small-dish .oven {
background-image: url(images/casseroledish_small.png);
}
#recipebook .dish.small-dish .grill {
background-image: url(images/grill_small.png);
}
#recipebook .dish.syrup .pot {
background-image: url(images/pot_syrup.png);
}
*/

const COOKER = {
    large: {
        cookpot: 'images/pot.png',
        oven: 'images/casseroledish.png',
        grill: 'images/grill.png',
    },

    small: {
        cookpot: 'images/pot_small.png',
        oven: 'images/casseroledish_small.png',
        grill: 'images/grill_small.png',
    },
    syrup: {
        cookpot: 'images/pot_syrup.png',
    },
};

const Cooker = ({ dishSize, cooker, syrup }) => {
    let img;
    if (syrup) {
        img = COOKER.syrup[cooker];
    } else {
        img = COOKER[dishSize][cooker];
    }

    return (
        <img
            alt={cooker}
            src={`https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/${img}`}
            style={{ width: 20, height: 20, marginTop: -4, marginRight: 3 }}
        />
    );
};

export default Cooker;