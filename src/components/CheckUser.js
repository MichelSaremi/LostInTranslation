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
                    <LoginView />
                )
            }
        }
    )
}

export default CheckUser;