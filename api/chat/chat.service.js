const userService = require('../user/user.service')
const dbService = require("../../services/db.service")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection("chat")
    var chats = await collection.find(criteria).toArray()
    // _sort(chats, filterBy.sortBy) // add back if relevant
    return chats
  } catch (err) {
    console.log("cannot find chats", err)
    throw err
  }
}

async function getById(currUserId, chatId) {
  try {
    const collection = await dbService.getCollection("chat")
    const chats = await collection.find({ $or: [{ sentById: currUserId, sentToId: chatId }, { sentById: chatId, sentToId: currUserId }]}).toArray()
    return chats
  } catch (err) {
    console.log(`while finding chat ${chatId}`, err)
    throw err
  }
}

async function remove(chatId) {
  try {
    const collection = await dbService.getCollection("chat")
    await collection.deleteOne({ _id: ObjectId(chatId) })
    return chatId
  } catch (err) {
    console.log(`cannot remove chat ${chatId}`, err)
    throw err
  }
}

async function add(chat) {
  const sentByUser = await userService.getById(chat.sentById)
  chat.sentByName = sentByUser.fullname
  chat.sentAt = Date.now()
  try {
    const collection = await dbService.getCollection("chat")
    const addedChat = await collection.insertOne(chat)
    chat._id = addedChat.insertedId
    return chat
  } catch (err) {
    console.log("cannot insert chat", err)
    throw err
  }
}
async function update(chat) {
  try {
    var id = ObjectId(chat._id)
    delete chat._id
    const collection = await dbService.getCollection("chat")
    await collection.updateOne({ _id: id }, { $set: { ...chat } })
    chat._id = id
    return chat
  } catch (err) {
    console.log(`cannot update chat ${chatId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

 

  return criteria
}



module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}
