// pages/api/messages/send.js

import { Message, User } from "../../../models";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { senderId, receiverId, content } = req.body;

    // Check if sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();

    // Add message to sender's and receiver's message lists
    sender.messages.push(message._id);
    receiver.messages.push(message._id);

    await sender.save();
    await receiver.save();

    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
