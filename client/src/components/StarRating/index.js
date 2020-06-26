//@ts-check
/**@module */
import React from "react";
import Ratings from "react-ratings-declarative";

/**@function Rating */
function StarRating({ children }) {
	return (
		<div className="StarRating" style={{display:"inline"}}>
			<Ratings
				rating={ children}
				widgetRatedColors="green"
				widgetEmptyColors="grey"
				widgetDimensions="20px"
				typeOfWidget="Point"
				widgetSpacings="1px"
			>
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
			</Ratings>
		</div>
	);
}

export default StarRating;
