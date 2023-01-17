import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Score from "./Score";
import { useSelector } from "react-redux";

function Container() {
  const showScore = useSelector((state) => state.typing.showScore);
  return (
    <div className="container h-100">
      <div className="row justify-content-center">
        <Header />
        {showScore ? <Score /> : <Content />}
        <Footer />
      </div>
    </div>
  );
}

export default Container;
