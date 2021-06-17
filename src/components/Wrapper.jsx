import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Books from "./Books";
import Categories from "./Categories";
import Memebers from "./Memebers";
import Issues from "./Issues";
import SignUp from "./SignUp";
import SignIn from "./SingIn";
import networkInterceptor from "../network/interceptor";

function Wrapper() {
    networkInterceptor();
    return (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/books" component={Books} />
                    <Route path="/categories" component={Categories} />
                    <Route path="/members" component={Memebers} />
                    <Route path="/issued" component={Issues} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signin" component={SignIn} />
                </Switch>
            </App>
        </Router>
    );
}

export default Wrapper;
