import Store from "../models/storeModel.js";

// @desc Get all stores
// @route GET /api/v1/stores
// @access private

const getStores = AsyncHandler(async (req, res) => {
  const stores = await Store.find({});
  if (stores) {
    res.status(200).json(stores);
  }
  throw new Error("No store found");
});

// @desc Get a single store
// @route GET /api/v1/stores/:id
// @access private
const getStore = AsyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store) {
    res.status(200).json(store);
  }
  throw new Error("No store found");
});

// @desc Create a store
// @route POST /api/v1/stores
// @access private
const createStore = AsyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const store = await Store.findOne({ name });
  if (store) {
    res.status(404);
    throw new Error("Store already exists");
  }
  const newStore = await Store.create({
    name,
    status,
  });
  if (newStore) {
    res.status(201).json(newStore);
  }
});

// @desc Update store
//  @route PUT /api/v1/stores/:id
// @access private

const updateStore = AsyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store) {
    store.name = store.name || req.body.name;
    store.status = req.body.status;
    const updatedStore = await store.save();
    res.status(200).json(updatedStore);
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

// @desc Delete a store
// @route DELETE /api/v1/stores/:id
const deleteStore = AsyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store) {
    await store.remove();
    res.status(200).json({
      message: "Store deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

export { getStores, getStore, createStore, updateStore, deleteStore };
