const Messages = require("../models/messageModel");

const messageCtrl = {
  getMessages: async (req, res) => {
    try {
      const messages = await Messages.find({ user_id: req.user.id }).sort({ date: -1 });
      res.json(messages);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createMessage: async (req, res) => {
    try {
      const { title, date } = req.body;
      const newMessage = new Messages({
        title,
        date,
        user_id: req.user.id,
      });
      await newMessage.save();
      res.json({ msg: "Created a message" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      await Messages.findByIdAndDelete(req.params.id);
      res.json({ msg: "Message deleted successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateMessage: async (req, res) => {
    try {
      const { title, description, date } = req.body;
      await Messages.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          date,
        }
      );
      res.json({msg: "Message updated successfully"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMessage: async (req, res) => {
    try {
      const message = await Messages.findById(req.params.id);
      res.json(message);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = messageCtrl;
