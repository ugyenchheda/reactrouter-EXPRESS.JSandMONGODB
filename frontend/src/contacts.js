import axios from 'axios';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

const BASE_URL = 'http://localhost:3000'; 

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  try {
    const response = await axios.get(`${BASE_URL}/api/contacts`);
    console.log(response);
    let contacts = response.data;
    
    if (query) {
      contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
    }
    return contacts.sort(sortBy('last', 'createdAt'));
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
}

export async function createContact(contactData) {
  await fakeNetwork();
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contactData);
    const newContact = response.data;

    // Update the local cache or storage
    const cachedContacts = await getContactsFromCache(); // Assuming you have a function to retrieve contacts from cache
    const updatedContacts = [...cachedContacts, newContact];
    await set(updatedContacts);

    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}


export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  try {
    const response = await axios.get(`${BASE_URL}/api/contacts/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error('Error getting contact:', error);
    throw error;
  }
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  try {
    const response = await axios.put(`${BASE_URL}/api/contacts/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

export async function deleteContact(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}



function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}