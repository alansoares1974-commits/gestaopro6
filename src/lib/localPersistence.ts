// src/lib/localPersistence.ts

import { v4 as uuidv4 } from 'uuid';

const getLocalStorageKey = (entityName: string) => `app_${entityName}`;

export const getLocalData = (entityName: string) => {
  const data = localStorage.getItem(getLocalStorageKey(entityName));
  return data ? JSON.parse(data) : [];
};

export const saveLocalData = (entityName: string, data: any) => {
  localStorage.setItem(getLocalStorageKey(entityName), JSON.stringify(data));
};

export const saveLocalRecord = (entityName: string, record: any) => {
  let data = getLocalData(entityName);
  
  if (record.id) {
    // Update
    data = data.map((item: any) => item.id === record.id ? record : item);
  } else {
    // Create
    record.id = uuidv4();
    data.push(record);
  }
  
  saveLocalData(entityName, data);
  return record;
};

export const deleteLocalRecord = (entityName: string, id: string) => {
  let data = getLocalData(entityName);
  data = data.filter((item: any) => item.id !== id);
  saveLocalData(entityName, data);
};
