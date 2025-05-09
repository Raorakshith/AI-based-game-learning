// import React, { useState } from 'react';
// import { Play, Loader2, Book, Award, RotateCcw } from 'lucide-react';

// const App = () => {
//   const [concept, setConcept] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [selectedGame, setSelectedGame] = useState(null);
//   const [gameData, setGameData] = useState(null);
//   const [activeTab, setActiveTab] = useState('concept');
//   const [error, setError] = useState('');

//   const analyzeHandler = async () => {
//     if (!concept.trim()) {
//       setError('Please enter a concept first');
//       return;
//     }
    
//     setError('');
//     setLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/api/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ concept }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // Handle JSON potentially wrapped in markdown code blocks
//         let responseText = data.response;
        
//         // Remove markdown code blocks if present
//         if (typeof responseText === 'string' && responseText.includes('```')) {
//           // Extract content between code blocks
//           const matches = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
//           if (matches && matches[1]) {
//             responseText = matches[1];
//           }
//         }
        
//         // Parse the JSON string
//         const parsedAnalysis = typeof responseText === 'string' 
//           ? JSON.parse(responseText) 
//           : responseText;
        
//         setAnalysisData(parsedAnalysis);
//         setActiveTab('games');
//       } else {
//         setError(data.error || 'Failed to analyze concept');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateGame = async (gameType, gameDescription) => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch('http://localhost:5000/api/generate-game', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           concept,
//           game_type: gameType,
//           game_description: gameDescription
//         }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // Handle SVG code
//         let svgCode = data.svg_code;
//         if (typeof svgCode === 'string' && svgCode.includes('```')) {
//           // Extract content between code blocks if present
//           const svgMatches = svgCode.match(/```(?:html|svg)?\s*([\s\S]*?)```/);
//           if (svgMatches && svgMatches[1]) {
//             svgCode = svgMatches[1];
//           }
//         }
        
//         // Handle instructions JSON potentially wrapped in markdown
//         let instructionsText = data.instructions;
//         if (typeof instructionsText === 'string' && instructionsText.includes('```')) {
//           // Extract content between code blocks
//           const matches = instructionsText.match(/```(?:json)?\s*([\s\S]*?)```/);
//           if (matches && matches[1]) {
//             instructionsText = matches[1];
//           }
//         }
        
//         // Parse the instructions JSON
//         const parsedInstructions = typeof instructionsText === 'string' 
//           ? JSON.parse(instructionsText) 
//           : instructionsText;
        
//         setGameData({
//           svg: svgCode,
//           instructions: parsedInstructions
//         });
//         setActiveTab('play');
//       } else {
//         setError(data.error || 'Failed to generate game');
//       }
//     } catch (err) {
//       setError('An error occurred while generating the game.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetAll = () => {
//     setConcept('');
//     setAnalysisData(null);
//     setSelectedGame(null);
//     setGameData(null);
//     setActiveTab('concept');
//     setError('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
//         <div className="container mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-white">
//             AI Learning Games
//           </h1>
//           <p className="text-blue-100 mt-2">
//             Transform concepts into interactive learning experiences
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 mb-6">
//           <button 
//             className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
//               activeTab === 'concept' 
//                 ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => setActiveTab('concept')}
//           >
//             <div className="flex items-center">
//               <Book size={16} className="mr-2" />
//               Enter Concept
//             </div>
//           </button>
          
//           <button 
//             className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
//               activeTab === 'games' 
//                 ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => analysisData && setActiveTab('games')}
//             disabled={!analysisData}
//           >
//             <div className="flex items-center">
//               <Award size={16} className="mr-2" />
//               Game Ideas
//             </div>
//           </button>
          
//           <button 
//             className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
//               activeTab === 'play' 
//                 ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//             onClick={() => gameData && setActiveTab('play')}
//             disabled={!gameData}
//           >
//             <div className="flex items-center">
//               <Play size={16} className="mr-2" />
//               Play Game
//             </div>
//           </button>
          
//           <button 
//             className="ml-auto py-2 px-4 text-sm text-gray-600 hover:text-red-600 flex items-center"
//             onClick={resetAll}
//           >
//             <RotateCcw size={16} className="mr-2" />
//             Reset
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {/* Content based on active tab */}
//         <div className="bg-white rounded-lg shadow p-6">
//           {activeTab === 'concept' && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Enter a Concept or Paragraph</h2>
//               <p className="text-gray-600 mb-4">
//                 Describe a concept or paste a paragraph you want to learn about. Our AI will analyze it and suggest interactive learning games.
//               </p>
              
//               <textarea 
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-40"
//                 placeholder="Enter a concept or paragraph here... (e.g., 'The water cycle is the process where water continuously moves from the earth to the atmosphere and back again through evaporation, condensation, and precipitation.')"
//                 value={concept}
//                 onChange={(e) => setConcept(e.target.value)}
//               />
              
//               <button 
//                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center justify-center w-40"
//                 onClick={analyzeHandler}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <><Loader2 size={18} className="mr-2 animate-spin" /> Analyzing...</>
//                 ) : (
//                   <>Analyze</>
//                 )}
//               </button>
//             </div>
//           )}

//           {activeTab === 'games' && analysisData && (
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Concept Analysis</h2>
//               <p className="text-gray-700 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                 {analysisData.analysis}
//               </p>
              
//               <h3 className="text-lg font-medium mb-4">Suggested Games</h3>
              
//               <div className="grid md:grid-cols-3 gap-6">
//                 {analysisData.games.map((game, index) => (
//                   <div 
//                     key={index} 
//                     className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                       selectedGame === index 
//                         ? 'border-blue-500 bg-blue-50 shadow-md' 
//                         : 'border-gray-200 hover:border-blue-300 hover:shadow'
//                     }`}
//                     onClick={() => setSelectedGame(index)}
//                   >
//                     <h4 className="font-semibold text-md mb-2">{game.title}</h4>
//                     <p className="text-sm text-gray-500 mb-1">Type: {game.type}</p>
//                     <p className="text-sm text-gray-700 mb-3">{game.description}</p>
                    
//                     <div className="mt-auto">
//                       <button 
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
//                         onClick={() => generateGame(game.type, game.description)}
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <><Loader2 size={16} className="inline mr-2 animate-spin" /> Generating...</>
//                         ) : (
//                           <>Generate Game</>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'play' && gameData && (
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="md:col-span-2">
//                 <h2 className="text-xl font-semibold mb-4">
//                   {gameData.instructions.title || "Interactive Learning Game"}
//                 </h2>
                
//                 <div className="border border-gray-200 rounded-lg bg-white p-4 flex justify-center">
//                   {/* SVG Game Container */}
//                   <div 
//                     className="w-full" 
//                     dangerouslySetInnerHTML={{ __html: gameData.svg }} 
//                   />
//                 </div>
//               </div>
              
//               <div className="md:col-span-1">
//                 <div className="sticky top-6">
//                   <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
//                     <h3 className="font-semibold text-lg mb-3">How to Play</h3>
//                     <p className="text-sm text-gray-700 mb-4">{gameData.instructions.introduction}</p>
                    
//                     <h4 className="font-medium text-md mb-2">Instructions:</h4>
//                     <ol className="list-decimal pl-5 mb-4 text-sm">
//                       {gameData.instructions.how_to_play.map((step, idx) => (
//                         <li key={idx} className="mb-1">{step}</li>
//                       ))}
//                     </ol>
                    
//                     <h4 className="font-medium text-md mb-2">Learning Objectives:</h4>
//                     <ul className="list-disc pl-5 mb-4 text-sm">
//                       {gameData.instructions.learning_objectives.map((obj, idx) => (
//                         <li key={idx} className="mb-1">{obj}</li>
//                       ))}
//                     </ul>
                    
//                     <div className="mt-4 p-3 bg-white rounded border border-blue-100">
//                       <h4 className="font-medium text-sm mb-2">Connection to Concept:</h4>
//                       <p className="text-sm text-gray-700">{gameData.instructions.concept_connection}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-300 py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p>AI Learning Games Project © {new Date().getFullYear()}</p>
//           <p className="text-sm mt-2">Transform any concept into an interactive learning experience</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;





import React, { useState, useRef, useEffect } from 'react';
import { Play, Loader2, Book, Award, RotateCcw } from 'lucide-react';

const App = () => {
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [activeTab, setActiveTab] = useState('concept');
  const [error, setError] = useState('');
  const gameContainerRef = useRef(null);

  const analyzeHandler = async () => {
    if (!concept.trim()) {
      setError('Please enter a concept first');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle JSON potentially wrapped in markdown code blocks
        let responseText = data.response;
        
        // Remove markdown code blocks if present
        if (typeof responseText === 'string' && responseText.includes('```')) {
          // Extract content between code blocks
          const matches = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (matches && matches[1]) {
            responseText = matches[1];
          }
        }
        
        // Parse the JSON string
        const parsedAnalysis = typeof responseText === 'string' 
          ? JSON.parse(responseText) 
          : responseText;
        
        setAnalysisData(parsedAnalysis);
        setActiveTab('games');
      } else {
        setError(data.error || 'Failed to analyze concept');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateGame = async (gameType, gameDescription) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concept,
          game_type: gameType,
          game_description: gameDescription
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle HTML code
        let htmlCode = data.svg_code; // The backend still uses svg_code as the key name
        if (typeof htmlCode === 'string' && htmlCode.includes('```')) {
          // Extract content between code blocks if present
          const htmlMatches = htmlCode.match(/```(?:html)?\s*([\s\S]*?)```/);
          if (htmlMatches && htmlMatches[1]) {
            htmlCode = htmlMatches[1];
          }
        }
        
        // Handle instructions JSON potentially wrapped in markdown
        let instructionsText = data.instructions;
        if (typeof instructionsText === 'string' && instructionsText.includes('```')) {
          // Extract content between code blocks
          const matches = instructionsText.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (matches && matches[1]) {
            instructionsText = matches[1];
          }
        }
        
        // Parse the instructions JSON
        const parsedInstructions = typeof instructionsText === 'string' 
          ? JSON.parse(instructionsText) 
          : instructionsText;
        
        setGameData({
          html: htmlCode,
          instructions: parsedInstructions
        });
        setActiveTab('play');
      } else {
        setError(data.error || 'Failed to generate game');
      }
    } catch (err) {
      setError('An error occurred while generating the game.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle HTML game initialization after rendering
  useEffect(() => {
    if (gameData && gameData.html && gameContainerRef.current && activeTab === 'play') {
      // Clear previous content
      gameContainerRef.current.innerHTML = '';
      
      // Create a container for the game that's isolated from the React app
      const gameIframe = document.createElement('iframe');
      gameIframe.style.width = '100%';
      gameIframe.style.height = '500px';
      gameIframe.style.border = 'none';
      gameIframe.title = 'Learning Game';
      gameIframe.sandbox = 'allow-scripts allow-popups allow-same-origin';
      
      // Append iframe to container
      gameContainerRef.current.appendChild(gameIframe);
      
      // Wait for iframe to load, then write the HTML content to it
      gameIframe.onload = () => {
        const iframeDocument = gameIframe.contentDocument || gameIframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(gameData.html);
        iframeDocument.close();
      };
      
      // Trigger iframe load
      gameIframe.src = 'about:blank';
    }
  }, [gameData, activeTab]);

  const resetAll = () => {
    setConcept('');
    setAnalysisData(null);
    setSelectedGame(null);
    setGameData(null);
    setActiveTab('concept');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">
            AI Learning Games
          </h1>
          <p className="text-blue-100 mt-2">
            Transform concepts into interactive learning experiences
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'concept' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('concept')}
          >
            <div className="flex items-center">
              <Book size={16} className="mr-2" />
              Enter Concept
            </div>
          </button>
          
          <button 
            className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'games' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => analysisData && setActiveTab('games')}
            disabled={!analysisData}
          >
            <div className="flex items-center">
              <Award size={16} className="mr-2" />
              Game Ideas
            </div>
          </button>
          
          <button 
            className={`py-2 px-4 mr-2 font-medium text-sm rounded-t-lg ${
              activeTab === 'play' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => gameData && setActiveTab('play')}
            disabled={!gameData}
          >
            <div className="flex items-center">
              <Play size={16} className="mr-2" />
              Play Game
            </div>
          </button>
          
          <button 
            className="ml-auto py-2 px-4 text-sm text-gray-600 hover:text-red-600 flex items-center"
            onClick={resetAll}
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Content based on active tab */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'concept' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Enter a Concept or Paragraph</h2>
              <p className="text-gray-600 mb-4">
                Describe a concept or paste a paragraph you want to learn about. Our AI will analyze it and suggest interactive learning games.
              </p>
              
              <textarea 
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-40"
                placeholder="Enter a concept or paragraph here... (e.g., 'The water cycle is the process where water continuously moves from the earth to the atmosphere and back again through evaporation, condensation, and precipitation.')"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
              
              <button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center justify-center w-40"
                onClick={analyzeHandler}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={18} className="mr-2 animate-spin" /> Analyzing...</>
                ) : (
                  <>Analyze</>
                )}
              </button>
            </div>
          )}

          {activeTab === 'games' && analysisData && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Concept Analysis</h2>
              <p className="text-gray-700 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                {analysisData.analysis}
              </p>
              
              <h3 className="text-lg font-medium mb-4">Suggested Games</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {analysisData.games.map((game, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedGame === index 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow'
                    }`}
                    onClick={() => setSelectedGame(index)}
                  >
                    <h4 className="font-semibold text-md mb-2">{game.title}</h4>
                    <p className="text-sm text-gray-500 mb-1">Type: {game.type}</p>
                    <p className="text-sm text-gray-700 mb-3">{game.description}</p>
                    
                    <div className="mt-auto">
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                        onClick={() => generateGame(game.type, game.description)}
                        disabled={loading}
                      >
                        {loading ? (
                          <><Loader2 size={16} className="inline mr-2 animate-spin" /> Generating...</>
                        ) : (
                          <>Generate Game</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'play' && gameData && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {gameData.instructions.title || "Interactive Learning Game"}
                </h2>
                
                <div className="border border-gray-200 rounded-lg bg-white p-4">
                  {/* HTML Game Container - now using iframe for isolation */}
                  <div 
                    ref={gameContainerRef}
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="sticky top-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                    <h3 className="font-semibold text-lg mb-3">How to Play</h3>
                    <p className="text-sm text-gray-700 mb-4">{gameData.instructions.introduction}</p>
                    
                    <h4 className="font-medium text-md mb-2">Instructions:</h4>
                    <ol className="list-decimal pl-5 mb-4 text-sm">
                      {gameData.instructions.how_to_play.map((step, idx) => (
                        <li key={idx} className="mb-1">{step}</li>
                      ))}
                    </ol>
                    
                    <h4 className="font-medium text-md mb-2">Learning Objectives:</h4>
                    <ul className="list-disc pl-5 mb-4 text-sm">
                      {gameData.instructions.learning_objectives.map((obj, idx) => (
                        <li key={idx} className="mb-1">{obj}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                      <h4 className="font-medium text-sm mb-2">Connection to Concept:</h4>
                      <p className="text-sm text-gray-700">{gameData.instructions.concept_connection}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>AI Learning Games Project © {new Date().getFullYear()}</p>
          <p className="text-sm mt-2">Transform any concept into an interactive learning experience</p>
        </div>
      </footer>
    </div>
  );
};

export default App;