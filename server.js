const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 COLOCA AQUI O TEU WEBHOOK
const WEBHOOK_URL = "https://discord.com/api/webhooks/1434250571191160834/Kd9p4Zi8cZrl-zFz3DVBPsAEagwy6DpXJ2KWKmfu7zoDcgxo_2Y215mloSbUVJ8aGrGV";

app.post("/buy", async (req, res) => {
    const { name, price, quantity } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    const total = (price * quantity).toFixed(2);

    const payload = {
        content: "🛒 **Nova Compra Recebida!**",
        embeds: [
            {
                title: "Detalhes da Compra",
                color: 0x00ff99,
                fields: [
                    { name: "Produto", value: name, inline: true },
                    { name: "Preço", value: `${price}€`, inline: true },
                    { name: "Quantidade", value: `${quantity}`, inline: true },
                    { name: "Total", value: `${total}€`, inline: false }
                ]
            }
        ]
    };

    try {
        await axios.post(WEBHOOK_URL, payload);

        return res.json({ message: "Compra enviada com sucesso!" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro no webhook" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
