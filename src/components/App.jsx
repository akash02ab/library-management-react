import { Container } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SwipeableTemporaryDrawer from "./Drawer";
import MenuAppBar from "./MenuAppBar";

function App(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const loginHandler = () => {
        if(loggedIn) {
            setLoggedIn(false);
        }
        else {
            history.push("/signin");
        }
    }

    return (
        <div>
            <MenuAppBar handleClick={toggleDrawer} loginHandler={loginHandler} />
            <SwipeableTemporaryDrawer
                handleClose={toggleDrawer}
                isOpen={drawerOpen}
            />
            <Container fixed>{props.children}</Container>
        </div>
    );
}

export default App;
