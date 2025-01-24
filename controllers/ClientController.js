const { Client } = require("../models"); // Adjust the path to match your folder structure

// CREATE: Add a new client
const createClient = async (req, res) => {
  try {
    const { name, phoneNo, email, DOB, address, category, description } = req.body;
    const newClient = await Client.create({
      name,
      phoneNo,
      email,
      DOB,
      address,
      category,
      description,
    });
    return res.json({
      status:200,
      success: true,
      data: newClient,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating client", details: error.message });
  }
};

// READ: Get all clients
const getClient = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clients", details: error.message });
  }
};

// READ: Get a single client by ID
const getClientbyid = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Error fetching client", details: error.message });
  }
};

// UPDATE: Update a client's information
const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const updatedData = req.body;
    const [updatedRows] = await Client.update(updatedData, { where: { clientId } });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Client not found or no changes made" });
    }
    const updatedClient = await Client.findByPk(clientId);
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: "Error updating client", details: error.message });
  }
};

// DELETE: Remove a client
const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const deletedRows = await Client.destroy({ where: { clientId } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting client", details: error.message });
  }
};

module.exports = { deleteClient, updateClient, getClientbyid, getClient, createClient };
