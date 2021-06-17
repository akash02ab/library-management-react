import {
    CircularProgress,
    List,
    ListItemText,
    Paper,
    withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import AlertDialog from "./AlertDialog";

const url = "http://localhost:8000/books";

function Books() {
    let [loading, setLoading] = useState(true);
    let [books, setBooks] = useState([]);
    let [toDel, setToDel] = useState({});
    const [open, setOpen] = useState(false);

    const getBooks = async () => {
        let response = await axios.get(url);
        console.log(response.status)
        setBooks(response.data.books);
        setLoading(false);
    };

    useEffect(() => {
        getBooks();
    }, []);

    const handleDelete = (title, index) => {
        setOpen(true);
        setToDel({ title: title, index: index });
    };

    const deleteBook = async (title) => {
        await fetch(`http://localhost:8000/books/${title}`, {
            method: "DELETE",
        });
    };

    const handleClose = (arg) => {
        if (arg) {
            let {title, index} = toDel;
            deleteBook(title);
            let booksCopy = [...books];
            booksCopy.splice(index, 1);
            setBooks(booksCopy);
        }
        setOpen(false);
    };

    const StyledPaper = withStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            marginTop: "1.5rem",
        },
    })(Paper);

    const StyledList = withStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            marginTop: "1rem",
            boxShadow: "1px 1px 4px 1px gray",
        },
    })(List);

    return (
        <StyledPaper elevation={3}>
            <h1>List of Books:</h1>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {books.map((book, index) => (
                        <StyledList key={index}>
                            <ListItemText
                                primary={book.title}
                                secondary={book.authors}
                            />
                            <DeleteIcon
                                onClick={() => handleDelete(book.title, index)}
                                style={{ cursor: "pointer" }}
                            />
                        </StyledList>
                    ))}
                </List>
            )}
            <AlertDialog open={open} handleClose={handleClose} />
        </StyledPaper>
    );
}
export default Books;
