import axios from 'axios';
import { LANGUAGE_VERSIONS } from '@/components/files/fileData';

const api = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

type Language = keyof typeof LANGUAGE_VERSIONS;

export const executeCode = async (language: Language, sourceCode: string) => {
    try {
        const response = await api.post('/execute', {
            "language": language,
            "version": LANGUAGE_VERSIONS[language],
            "files": [
              {
                "content": sourceCode,
              }
            ],
        });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        throw new Error('Failed to execute code');
    }
};
