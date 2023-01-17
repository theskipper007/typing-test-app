import Header from "./Header";
import Content from "./Content";
import Score from "./Score";
import { useSelector } from "react-redux";

function Container() {
  const showScore = useSelector((state) => state.typing.showScore);
  return (
    <div className="container h-100">
      <div className="row justify-content-center">
        <Header />
        {showScore ? <Score /> : <Content />}
      </div>
    </div>
  );
}

export default Container;
