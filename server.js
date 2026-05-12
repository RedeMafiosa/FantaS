import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// __dirname fix (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// servir ficheiros estáticos (css, imagens, etc)
app.use(express.static(__dirname));

// rota principal (ISTO resolve o "Cannot GET /")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// webhook (compra)
const webhookURL = "https://discord.com/api/webhooks/1434250571191160834/Kd9p4Zi8cZrl-zFz3DVBPsAEagwy6DpXJ2KWKmfu7zoDcgxo_2Y215mloSbUVJ8aGrGV";

app.post("/compra", async (req, res) => {
    const { produto, preco, quantidade, cliente } = req.body;

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "🛒 Nova compra!",
                embeds: [{
                    fields: [
                        { name: "Produto", value: produto },
                        { name: "Preço", value: preco },
                        { name: "Quantidade", value: String(quantidade) },
                        { name: "Cliente", value: cliente }
                    ]
                }]
            })
        });

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
