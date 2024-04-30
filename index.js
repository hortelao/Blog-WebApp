import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let arrData = [{ index: 0, title: 'This is the Blog Post Title', author: 'André Hortelão', text: `This project doesn't have persistence yet! So, this text is being saved directly on the backend server...` }];
let index = 1;

app.get("/", (req, res) => {
    res.render("index.ejs", 
    {
        data : arrData
    }
);
});

app.get("/addPost", (req, res) => {
    res.render("addPost.ejs");
});

app.post("/addPost", (req, res) => {
    let elem = {
        index : index,
        title : req.body.title,
        author : req.body.author,
        text : req.body.text
    }
    arrData.push(elem);
    index++;
    res.render("index.ejs",
    {
        data : arrData
    }
);
});

app.post("/edit", (req, res) => {
    res.render("editPost.ejs",
    {
        index : req.body.index,
        title : req.body.title,
        author : req.body.author,
        text : req.body.text
    }
);
});

app.post("/savePost", (req, res) => {
    arrData[req.body.index] = {
        index : req.body.index,
        title : req.body.title,
        author : req.body.author,
        text : req.body.text
    }
    res.render("index.ejs",
    {
        data : arrData
    }
);
});

app.get("/clear", (req, res) => {
    arrData = [];
    res.render("index.ejs",
    {
        data : arrData
    }
);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});