const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Error adding todo" });
    }
});

// Get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

// Update a todo
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});

module.exports = router;  // ✅ Make sure you're exporting `router`

