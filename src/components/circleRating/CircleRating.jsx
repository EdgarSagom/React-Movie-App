import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./CircleRating.css";

export function CircleRating({ rating }) {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export function CircleRatingPeople({ rating }) {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={150}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 30 ? "red" : rating <70 ? "orange" : rating<110 ? 'yellow' : "green",
                })}
            />
        </div>
    );
};
