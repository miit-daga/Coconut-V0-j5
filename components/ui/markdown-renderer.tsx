import React from 'react';

interface MarkdownRendererProps {
    text: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
    // Split the text by newline characters to create paragraphs or line breaks
    const lines = text.split('\n');

    return (
        <div>
            {lines.map((line, lineIndex) => (
                <p key={lineIndex} className="mb-2 last:mb-0">
                    {/* Split each line by the bold marker (**) */}
                    {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            // If the part is bold, render it inside a <strong> tag
                            return <strong key={partIndex} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                        }
                        // Otherwise, render it as plain text
                        return <React.Fragment key={partIndex}>{part}</React.Fragment>;
                    })}
                </p>
            ))}
        </div>
    );
};
