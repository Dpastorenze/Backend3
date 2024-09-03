import fs from 'fs/promises';

export const readFile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
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
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        throw error;
    }
};
