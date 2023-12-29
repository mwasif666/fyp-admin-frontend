import "./animation_scss/background-box-styles.scss";
import { MeteorBlue } from "./graphic_components/MeteorBlue";
import { MeteorPurple } from "./graphic_components/MeteorPurple";
import { Star } from "./graphic_components/Star";

export default function BackgroundBox() {
  return (
    <div className="background-box">
      <div className="element meteorBlue meteorB-ani-1">
        <MeteorBlue />
      </div>
      <div className="element meteorBlue meteorB-ani-2">
        <MeteorBlue />
      </div>
      <div className="element meteorPurple meteorP-ani-1">
        <MeteorPurple />
      </div>
      <div className="element meteorPurple meteorP-ani-2">
        <MeteorPurple />
      </div>
      <div className="element star star-pos-1 star-size-1 star-ani-1">
        <Star />
      </div>
      <div className="element star star-pos-2 star-size-1 star-ani-2">
        <Star />
      </div>
      <div className="element star star-pos-3 star-size-1 star-ani-3">
        <Star />
      </div>
      <div className="element star star-pos-4 star-size-1 star-ani-4">
        <Star />
      </div>
      <div className="element star star-pos-5 star-size-1 star-ani-5">
        <Star />
      </div>
      <div className="element star star-pos-6 star-size-1 star-ani-6">
        <Star />
      </div>
      <div className="element star star-pos-7 star-size-1 star-ani-7">
        <Star />
      </div>
    </div>
  );
}
