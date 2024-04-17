'use client';
const fetchGuessResult_template = async () => {
    try {
        const response = await fetch('/api/getNum');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching guess result:', error);
        throw error;
    }
};
const fetchGuessResult = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a random guess result
        const result = Math.random() < 0.5;
        resolve(result);
      }, 1000); // Delay of 1000ms
    }) as Promise<boolean>;
  };
export default fetchGuessResult;