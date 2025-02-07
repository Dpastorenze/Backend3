// import fs from 'fs/promises';

// export const readFile = async (path) => {
//   try {
//     const data = await fs.readFile(path, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       await fs.writeFile(path, '[]', 'utf-8');
//       return [];
//     } else {
//       throw error;
//     }
//   }
// };

// export const writeFile = async (path, data) => {
//   await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
// };
import fs from 'fs/promises';

export const readFile = async (path) => {
  try {
    if (typeof path !== 'string') {
      throw new TypeError('Path must be a string');
    }

    const data = await fs.readFile(path, 'utf-8');
    try {
      return JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return [];
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(path, '[]', 'utf-8');
      return [];
    } else {
      throw error;
    }
  }
};

export const writeFile = async (path, data) => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  
  await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
};
