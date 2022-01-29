import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";

function ProfileView() {

  const props = useParams()

  return (
    <div>{props.username}</div>
  );
}

export default ProfileView;