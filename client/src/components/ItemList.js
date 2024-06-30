import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || '';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/items`);
      setItems(res.data);
      console.log('Fetched items:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/items`, { name: itemName });
      setItems([...items, res.data]);
      setItemName('');
      console.log('Added item:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log('Deleting item with id:', id);
      await axios.delete(`${baseURL}/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
      console.log('Deleted item with id:', id);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async () => {
    try {
      console.log('Updating item with id:', editItemId);
      const res = await axios.put(`${baseURL}/api/items/${editItemId}`, { name: editItemName });
      setItems(items.map(item => (item._id === editItemId ? res.data : item)));
      setEditItemId(null);
      setEditItemName('');
      console.log('Updated item:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} 
            <button onClick={() => deleteItem(item._id)}>Delete</button>
            <button onClick={() => {
              setEditItemId(item._id);
              setEditItemName(item.name);
            }}>Edit</button>
          </li>
        ))}
      </ul>
      {editItemId && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />
          <button onClick={updateItem}>Update Item</button>
        </div>
      )}
    </div>
  );
};

export default ItemList;