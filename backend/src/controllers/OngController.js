const connection = require("../database/connection");
const generateUniqueId = require("../utils/generateUniqueId");

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      created_at: new Date(),
    });

    res.json({ id });
  },

  async index(req, res) {
    var result = await connection("ongs").select("*");

    res.json(result);
  },
};
