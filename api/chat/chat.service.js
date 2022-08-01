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

async function getById(chatId) {
  try {
    const collection = await dbService.getCollection("chat")
    const chat = collection.findOne({ _id: ObjectId(chatId) })
    return chat
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
    console.log("updating chat")
    var id = ObjectId(chat._id)
    console.log(id)
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

  if (filterBy.name) {
    criteria.name = { $regex: filterBy.name, $options: "i" }
  }

  return criteria
}

function _sort(filteredChats, sortBy) {
  if (!sortBy) return
  if (sortBy === "time")
    filteredChats = filteredChats.sort(
      (t1, t2) => t1.createdAt - t2.createdAt
    )
  else if (filterBy.sortBy === "price")
    filteredChats = filteredChats.sort((t1, t2) => t1.price - t2.price)
  else if (filterBy.sortBy === "name")
    filteredChats = filteredChats.sort((t1, t2) => {
      return t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1
    })
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}
