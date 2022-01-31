import { BrowserRouter, NavLink } from "react-router-dom";
import LoginView from "../views/LoginView";

function CheckUser(TargetComponent) {
    return (
        function(props) {
            const userName = localStorage.getItem("userName");
            console.log("userName", userName);
            const isUserCheckedIn = (userName != undefined && userName != null && userName != "");
            if(isUserCheckedIn) { 
                return (
                    <TargetComponent {...props} />
                ); 
            }
            else {
                return (
                    <div>
                        You are not logged in...<br />
                        <NavLink to="/">Go to Login</NavLink>
                    </div>
                )
            }
        }
    )
}

export default CheckUser;