"use client";
import React, { useState } from "react";
import { CodeBlock } from "./code-block";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type CollapsibleCodeBlockProps = {
  language: string;
  filename: string;
  code: string;
  initialVisibleLines?: number;
  highlightLines?: number[];
};

export const CollapsibleCodeBlock = ({
  language,
  filename,
  code,
  initialVisibleLines = 20,
  highlightLines = [],
}: CollapsibleCodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Split the code by new lines to count them
  const codeLines = code.split("\n");
  const totalLines = codeLines.length;
  
  // Create truncated version of the code
  const truncatedCode = codeLines.slice(0, initialVisibleLines).join("\n");
  
  return (
    <div className="flex flex-col">
      <CodeBlock
        language={language}
        filename={filename}
        code={isExpanded ? code : truncatedCode}
        highlightLines={highlightLines}
      />
      
      {totalLines > initialVisibleLines && (
        <div className="mt-2 flex flex-col items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <IconChevronUp size={18} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <IconChevronDown size={18} />
                <span>Show full code</span>
              </>
            )}
          </button>
          <p className="mt-4 text-sm text-gray-400 max-w-2xl text-center px-4">
            This example notebook demonstrates how to load the datasets, convert them to data frames, prepare them for model training, and create a medical chatbot. You can adapt this code to your specific requirements and integrate it into your AI development workflow.
          </p>
        </div>
      )}
    </div>
  );
}; 