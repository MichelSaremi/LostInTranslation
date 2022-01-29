import App from "../App";
import { useParams } from "react-router-dom";

function TranslationView () {
  const props = useParams()

  return (
   <div>Hello from translation view {props.username}</div> 
  );
}

export default TranslationView;