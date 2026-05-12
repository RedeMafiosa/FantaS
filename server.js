import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const webhookURL = "https://discord.com/api/webhooks/1503760282546077916/f7-AvZ61hYJaZRaIRUAp9qCohoZE2OWz9w-sjsRcsO2tpNBm7p0f3em4P2TkLFqLxFRg";

app.post("/compra", async (req, res) => {
    const { produto, preco, quantidade, cliente } = req.body;

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
});

app.listen(3000);