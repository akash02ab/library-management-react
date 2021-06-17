import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CategoryIcon from "@material-ui/icons/Category";
import PeopleIcon from "@material-ui/icons/People";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Link } from "react-router-dom";

const StyledDrawer = withStyles({
    paper: {
        width: "180px",
        padding: "20px",
    },
})(SwipeableDrawer);

const StyledList = withStyles({
    button: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "18px",
    },
})(ListItem);

const icons = [
    <LibraryBooksIcon />,
    <CategoryIcon />,
    <PeopleIcon />,
    <BookmarkIcon />,
];

export default function SwipeableTemporaryDrawer({ handleClose, isOpen }) {
    const list = () => (
        <List>
            {["Books", "Categories", "Members", "Issued"].map((text, index) => (
                <Link to={text.toLowerCase()} style={{textDecoration: 'none'}} key={text}>
                    <StyledList button >
                        {icons[index]}
                        <ListItemText primary={text} />
                    </StyledList>
                </Link>
            ))}
        </List>
    );

    return (
        <React.Fragment>
            <StyledDrawer
                open={isOpen}
                onOpen={handleClose}
                onClose={handleClose}
            >
                {list()}
            </StyledDrawer>
        </React.Fragment>
    );
}
