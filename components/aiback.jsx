import React, { useState } from 'react';

const AiBack = ({ setBackground }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const generateImages = async () => {
        setLoading(true);
        setError('');
        // Revok existing Urls for mem leaks
        images.forEach((image) => URL.revokeObjectURL(image));
        setImages([]);

        try {
            const responses = [];
            for (let i = 0; i < 3; i++) {
                const promptVariation = `${text} variation #${i + 1}`;
                const response = await fetch('/api/aiBg', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ inputs: promptVariation }),
                });
                if (!response.ok) throw new Error('Failed to fetch image.');
                const blob = await response.blob();
                responses.push(blob);
                await delay(500); 
            }

            const imageUrls = responses.map((blob) => URL.createObjectURL(blob));
            setImages(imageUrls);
        } catch (error) {
            console.error('Error generating images:', error);
            setError('Failed to generate images. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="aiback-container">
            <input
                type="text"
                placeholder="Enter text for background"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-input w-full mb-2 p-2 border rounded"
            />
            <button
                onClick={generateImages}
                disabled={loading || !text.trim()}
                className={`bg-green-500 text-white p-2 rounded-md font-semibold ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
            >
                {loading ? 'Generating...' : 'Generate Images'}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Generated background ${index + 1}`}
                            className="cursor-pointer w-full h-32 object-cover rounded-md border"
                            onClick={() => setBackground(image)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AiBack;
