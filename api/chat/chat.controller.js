const chatService = require('./chat.service.js')

// GET LIST
async function getChats(req, res) {
  try {
    var queryParams = req.query
    const chats = await chatService.query(queryParams)
    res.json(chats)
  } catch (err) {
    console.log('Failed to get chats', err)
    res.status(500).send({ err: 'Failed to get chats' })
  }
}

// GET BY ID
async function getChatById(req, res) {
  try {
    const chatId = req.params.id
    const chat = await chatService.getById(chatId)
    res.json(chat)
  } catch (err) {
    console.log('Failed to get chat', err)
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

// POST (add chat)
async function addChat(req, res) {
  try {
    const chat = req.body
    const addedChat = await chatService.add(chat)
    res.json(addedChat)
  } catch (err) {
    console.log('Failed to add chat', err)
    res.status(500).send({ err: 'Failed to add chat' })
  }
}

// PUT (Update chat)
async function updateChat(req, res) {
  try {
    const chat = req.body
    const updatedChat = await chatService.update(chat)
    res.json(updatedChat)
  } catch (err) {
    console.log('Failed to update chat', err)
    res.status(500).send({ err: 'Failed to update chat' })
  }
}

// DELETE (Remove chat)
async function removeChat(req, res) {
  try {
    const chatId = req.params.id
    const removedId = await chatService.remove(chatId)
    res.send(removedId)
  } catch (err) {
    console.log('Failed to remove chat', err)
    res.status(500).send({ err: 'Failed to remove chat' })
  }
}

module.exports = {
  getChats,
  getChatById,
  addChat,
  updateChat,
  removeChat,
}
