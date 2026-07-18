const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
    res.send("WCET Backend Running...");
});

const PORT = 5000;

app.get("/api/analysis", (req, res) => {

    if (!global.lastUploadedFile) {

        return res.status(404).json({
            message: "No program uploaded."
        });

    }

    const code = global.lastUploadedFile.content;

    const lines = code.split("\n").length;

    const loops =
        (code.match(/for\s*\(/g) || []).length +
        (code.match(/while\s*\(/g) || []).length +
        (code.match(/do\s*\{/g) || []).length;

    const ifStatements =
        (code.match(/if\s*\(/g) || []).length;

    const functions =
        (code.match(/\w+\s+\w+\s*\([^)]*\)\s*\{/g) || []).length;

    const variables =
        (code.match(/\b(int|float|char|double|long)\b/g) || []).length;

    const instructions =
        code
            .split("\n")
            .filter(line => line.trim() !== "").length;

    const wcet =
        instructions * 2 +
        loops * 10 +
        ifStatements * 3;

    res.json({

        filename: global.lastUploadedFile.filename,

        lines,

        functions,

        loops,

        ifStatements,

        variables,

        instructions,

        wcet

    });

});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});