// import { useState } from "react";
// import "./Chatbot.css";
// import { useNavigate } from "react-router-dom";

// const questionBank = {
//   "summary":[],
//   "pre-sowing": [
//     "How many days have passed since sowing?",
//     "What is your location?",
//     "What type of soil do you have?",
//     "Have you tested the soil pH? (yes/no)",
//     "What is the water availability in your area? (poor/average/good)",
//     "Do you have access to organic manure or chemical fertilizers? (yes/no)",
//     "What is your preferred crop? (watermelon/muskmelon/pumpkin/cucumber)",
//     "Have you tested the soil for nutrient levels? (Yes/No)",
//     "Specify your crop for ideal NPK levels (Specify your crop name)"
//   ],
//   sowing: [
//     "What is the current temperature in your region?",
//     "Are you using hybrid or local seeds? [hybrid/local]",
//     "Have you treated the seeds with fungicide or biofertilizer? [yes/no]",
//     "What is the spacing between your plants? [specify plant name]",
//     "Are you sowing seeds directly or using a nursery? [direct/nursery]",
//     "Have you applied a basal dose of NPK before sowing? [yes/no]"
//   ],
//   germination: [
//     "Have the seeds germinated uniformly? [yes/no]",
//     "Are there any signs of pest attacks or diseases? [yes/no]",
//     "Are you following a regular irrigation schedule? [yes/no]",
//     "Are you using mulch or plastic covers? [yes/no]"
//   ],
//   vegetative: [
//     "How tall are the plants currently? (in meters)",
//     "Are you observing yellowing of leaves? (Yes/No)",
//     "Have you applied fertilizers? (Yes/No)",
//     "Are you using any weed control methods? (Yes/No)",
//     "Is there any unusual wilting or stunted growth? (Yes/No)"
//   ],
//   flowering: [
//     "Have flowers started appearing? (Yes/No)",
//     "Are there enough male and female flowers? (Yes/No)",
//     "Are you observing pollination issues? (Yes/No)",
//     "Have you noticed fruit drop at an early stage? (Yes/No)",
//     "Have you applied any growth regulators? (Yes/No)"
//   ],
//   harvesting: [
//     "How many days since fruit formation?",
//     "Are the fruits reaching expected size and color? (Yes/No)",
//     "Have you observed any cracking or rotting of fruits? (Yes/No)",
//     "Are you following proper irrigation schedules? (Yes/No)"
//   ],
//   "post-harvest": [
//     "Are you using any storage techniques? (Yes/No)",
//     "Do you need guidance on packaging and transportation? (Yes/No)",
//     "Are you interested in connecting with local markets? (Yes/No)",
//     "Do you want tips on increasing shelf life? (Yes/No)"
//   ]
// };

// const Chatbot = () => {
//   const navigate = useNavigate();

//       const handleClick = () => {
//         console.log(answers)
//         console.log(answers["pre-sowing"][0])
//         console.log('check')
//         navigate('/helper', { state: { days1:answers["pre-sowing"][0] } });
//       };
//   const [started, setStarted] = useState(false);
//   const [step, setStep] = useState<keyof typeof questionBank>("pre-sowing");
//   const [answers, setAnswers] = useState<{ [key: string]: string[] }>({ "pre-sowing": [] });
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [recommendations, setRecommendations] = useState<string[]>([]);
//   const [conversation, setConversation] = useState<{ sender: "user" | "bot"; message: string }[]>([]);
//   const [nextStage, setNextStage] = useState<keyof typeof questionBank | null>(null);
// console.log(nextStage)
//   const handleStart = () => {
//     setStarted(true);
//     setConversation([{ sender: "bot", message: questionBank["pre-sowing"][0] }]);
//   };

//   const handleNext = (userAnswer: string) => {
//     const currentAnswers = answers[step] || [];
//     const updatedAnswers = [...currentAnswers, userAnswer];

//     setConversation(prev => [
//       ...prev,
//       { sender: "user", message: userAnswer }
//     ]);

//     setAnswers(prev => ({ ...prev, [step]: updatedAnswers }));

//     if (currentQuestionIndex < questionBank[step].length - 1) {
//       const nextQuestion = questionBank[step][currentQuestionIndex + 1];
//       setConversation(prev => [...prev, { sender: "bot", message: nextQuestion }]);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       if (step === "pre-sowing") {
//         handleSubmitPreSowing(updatedAnswers);
//       } else {
//         setConversation(prev => [
//           ...prev,
//           { sender: "bot", message: "Thank you! Your responses have been recorded." }
//         ]);
//       }
//     }
//   };

//   const handleSubmitPreSowing = (answersArray: string[]) => {
//     const crop = answersArray[6]?.toLowerCase();
//     const nutrientTested = answersArray[7]?.toLowerCase() === "yes";

//     let recs: string[] = [
//       "Location suitability:\n- Watermelon & Muskmelon: Warm, dry, sunny (25-35°C).\n- Cucumber & Pumpkin: Moderate-warm (20-30°C), some humidity.",
//       "Soil recommendations:\n- Watermelon & Muskmelon: Sandy loam, pH 6.0-7.5.\n- Cucumber & Pumpkin: Loamy/sandy loam, rich in organic matter.",
//       "Soil pH: Ideal is 6.0-7.5.\n- Acidic? Use lime.\n- Alkaline? Use gypsum or organic matter.",
//       "Water requirements:\n- Watermelon & Muskmelon: Deep, infrequent irrigation.\n- Cucumber & Pumpkin: Frequent, moderate. Drip is best.",
//       "Fertilizer:\n- Organic preferred.\n- Watermelon/Muskmelon: NPK 60:40:40 kg/ha.\n- Cucumber/Pumpkin: NPK 80:50:50 kg/ha."
//     ];

//     if (nutrientTested) {
//       recs.push("Soil test done: Customize NPK based on test results.");
//     }

//     switch (crop) {
//       case "watermelon":
//         recs.push("Watermelon NPK: N: 60-80, P: 40-50, K: 40-50 kg/ha");
//         break;
//       case "muskmelon":
//         recs.push("Muskmelon NPK: N: 50-70, P: 40-50, K: 50-60 kg/ha");
//         break;
//       case "cucumber":
//         recs.push("Cucumber NPK: N: 80-100, P: 50-60, K: 50-60 kg/ha");
//         break;
//       case "pumpkin":
//         recs.push("Pumpkin NPK: N: 80-100, P: 50-60, K: 60-80 kg/ha");
//         break;
//     }

//     recs.push("Nutrient Sources:\n- Nitrogen: Urea, ammonium sulfate, compost.\n- Phosphorus: SSP, bone meal.\n- Potassium: MOP, wood ash.");

//     setRecommendations(recs);
//     setStep("summary");
//     setConversation(prev => [
//       ...prev,
//       { sender: "bot", message: "Thank you! Here are your recommendations:" }
//     ]);

//   };

//   const handleFollowUpStage = (stage: keyof typeof questionBank) => {
//     setStep(stage);
//     setNextStage(null);
//     setCurrentQuestionIndex(0);
//     setAnswers(prev => ({ ...prev, [stage]: [] }));
//     setConversation(prev => [...prev, { sender: "bot", message: questionBank[stage][0] }]);
//   };
//   console.log(handleFollowUpStage)
//   return (
//     <div className="outer">
//       <div className="chatbot-container">
//         <h2 className="chatbot-title">Crop Advisory Chatbot</h2>

//         {!started ? (
//           <div className="start-screen">
//             <p>Welcome! Click below to start.</p>
//             <button className="start-button" onClick={handleStart}>Start</button>
//           </div>
//         ) : (
//           <>
//             <div className="chat-window">
//               {conversation.map((msg, idx) => (
//                 <div key={idx} className={`chat-bubble ${msg.sender}`}>
//                   {msg.message}
//                 </div>
//               ))}
//             </div>

            
//               <div className="input-section">
//                 <input
//                   type="text"
//                   className="answer-input"
//                   placeholder="Type your answer"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
//                       handleNext(e.currentTarget.value.trim());
//                       e.currentTarget.value = "";
//                     }
//                   }}
//                 />
//               </div>
            

            
//               <>
//                 <div className="recommendation-section">
//                   <h3>Recommendations:</h3>
//                   <ul>
//                     {recommendations.map((rec, idx) => (
//                       <li key={idx}>
//                         <pre>{rec}</pre>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <button onClick={handleClick} className="nextstage">Click for Staged recommendation</button>
//               </>
            
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
import { useState } from "react";
import "./Chatbot.css";
import { useNavigate } from "react-router-dom";

const questionBank = {
  "summary":[],
  "pre-sowing": [
    "How many days have passed since sowing?",
    "What is your location?",
    "What type of soil do you have?(black, red, sandy, loamy, clayey, or silt)",
    "Have you tested the soil pH? (yes/no)",
    "What is the water availability in your area? (poor/average/good)",
    "Do you have access to organic manure or chemical fertilizers? (yes/no)",
    "What is your preferred crop? (watermelon/muskmelon/pumpkin/cucumber)",
    "Have you tested the soil for nutrient levels? (Yes/No)",
    //"Specify your crop for ideal NPK levels (Specify your crop name)"
  ],
  sowing: [
    "What is the current temperature in your region?",
    "Are you using hybrid or local seeds? [hybrid/local]",
    "Have you treated the seeds with fungicide or biofertilizer? [yes/no]",
    "What is the spacing between your plants? [specify plant name]",
    "Are you sowing seeds directly or using a nursery? [direct/nursery]",
    "Have you applied a basal dose of NPK before sowing? [yes/no]"
  ],
  germination: [
    "Have the seeds germinated uniformly? [yes/no]",
    "Are there any signs of pest attacks or diseases? [yes/no]",
    "Are you following a regular irrigation schedule? [yes/no]",
    "Are you using mulch or plastic covers? [yes/no]"
  ],
  vegetative: [
    "How tall are the plants currently? (in meters)",
    "Are you observing yellowing of leaves? (Yes/No)",
    "Have you applied fertilizers? (Yes/No)",
    "Are you using any weed control methods? (Yes/No)",
    "Is there any unusual wilting or stunted growth? (Yes/No)"
  ],
  flowering: [
    "Have flowers started appearing? (Yes/No)",
    "Are there enough male and female flowers? (Yes/No)",
    "Are you observing pollination issues? (Yes/No)",
    "Have you noticed fruit drop at an early stage? (Yes/No)",
    "Have you applied any growth regulators? (Yes/No)"
  ],
  harvesting: [
    "How many days since fruit formation?",
    "Are the fruits reaching expected size and color? (Yes/No)",
    "Have you observed any cracking or rotting of fruits? (Yes/No)",
    "Are you following proper irrigation schedules? (Yes/No)"
  ],
  "post-harvest": [
    "Are you using any storage techniques? (Yes/No)",
    "Do you need guidance on packaging and transportation? (Yes/No)",
    "Are you interested in connecting with local markets? (Yes/No)",
    "Do you want tips on increasing shelf life? (Yes/No)"
  ]
};

const Chatbot = () => {
  const navigate = useNavigate();

const handleClick = () => {
  console.log(answers);
  console.log(answers["pre-sowing"][0]);
  console.log('check');


  navigate('/helper', { state: { days1: answers["pre-sowing"][0], recommendations1: recommendations } });
};

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState<keyof typeof questionBank>("pre-sowing");
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({ "pre-sowing": [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [conversation, setConversation] = useState<{ sender: "user" | "bot"; message: string }[]>([]);
  const [nextStage, setNextStage] = useState<keyof typeof questionBank | null>(null);
console.log(nextStage)
  const handleStart = () => {
    setStarted(true);
    setConversation([{ sender: "bot", message: questionBank["pre-sowing"][0] }]);
  };

  const handleNext = (userAnswer: string) => {
    const currentAnswers = answers[step] || [];
    const updatedAnswers = [...currentAnswers, userAnswer];

    setConversation(prev => [
      ...prev,
      { sender: "user", message: userAnswer }
    ]);

    setAnswers(prev => ({ ...prev, [step]: updatedAnswers }));

    if (currentQuestionIndex < questionBank[step].length - 1) {
      const nextQuestion = questionBank[step][currentQuestionIndex + 1];
      setConversation(prev => [...prev, { sender: "bot", message: nextQuestion }]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (step === "pre-sowing") {
        handleSubmitPreSowing(updatedAnswers);
      } else {
        setConversation(prev => [
          ...prev,
          { sender: "bot", message: "Thank you! Your responses have been recorded." }
        ]);
      }
    }
  };

  const handleSubmitPreSowing = (answersArray: string[]) => {
    const crop = answersArray[6]?.toLowerCase();
    const nutrientTested = answersArray[7]?.toLowerCase() === "yes";

    let recs: string[] = [
       "Location suitability:\n- Watermelon & Muskmelon: Warm regions with dry, sunny weather (25-35°C).",
        "\n- Cucumber & Pumpkin: Moderate to warm climates (20-30°C), can tolerate some humidity.",
        "Soil recommendations:\n- Watermelon & Muskmelon: Sandy loam, well-drained, pH 6.0-7.5.\n- Cucumber & Pumpkin: Loamy or sandy loam, high in organic matter, pH 6.0-7.0.",
        "Ideal soil pH: 6.0-7.5 for all crops.\n- If acidic (low pH), apply lime.\n- If alkaline (high pH), apply gypsum or organic matter.",
        "Water requirements:\n- Watermelon & Muskmelon: Require less frequent but deep irrigation.\n- Cucumber & Pumpkin: Need frequent and moderate irrigation. Drip irrigation is best.",
        "Fertilizer recommendations:\n- Organic manure (compost, cow dung) is best for all crops.\n- Chemical fertilizers:\n  - Watermelon & Muskmelon: NPK (60:40:40 kg/ha).\n  - Cucumber & Pumpkin: NPK (80:50:50 kg/ha).",
    ];

    if (nutrientTested) {
      recs.push("Soil test done: Customize NPK based on test results.");
    }

    switch (crop) {
      case "watermelon":
        recs.push("Watermelon NPK: N: 60-80, P: 40-50, K: 40-50 kg/ha");
        break;
      case "muskmelon":
        recs.push("Muskmelon NPK: N: 50-70, P: 40-50, K: 50-60 kg/ha");
        break;
      case "cucumber":
        recs.push("Cucumber NPK: N: 80-100, P: 50-60, K: 50-60 kg/ha");
        break;
      case "pumpkin":
        recs.push("Pumpkin NPK: N: 80-100, P: 50-60, K: 60-80 kg/ha");
        break;
    }

    recs.push("Increase Nitrogen (N): Apply urea, ammonium sulfate, or compost. Increase Phosphorus (P): Apply single superphosphate (SSP) or bone meal. Increase Potassium (K): Use muriate of potash (MOP) or wood ash.");

    setRecommendations(recs);
    setStep("summary");
    setConversation(prev => [
      ...prev,
      { sender: "bot", message: "Thank you! Here are your recommendations:" }
    ]);

  };

  const handleFollowUpStage = (stage: keyof typeof questionBank) => {
    setStep(stage);
    setNextStage(null);
    setCurrentQuestionIndex(0);
    setAnswers(prev => ({ ...prev, [stage]: [] }));
    setConversation(prev => [...prev, { sender: "bot", message: questionBank[stage][0] }]);
  };
  console.log(handleFollowUpStage)
  return (
    <div className="outer">
      <div className="chatbot-container">
        <h2 className="chatbot-title">Crop Advisory Chatbot</h2>

        {!started ? (
          <div className="start-screen">
            <p>Welcome! Click below to start.</p>
            <button className="start-button" onClick={handleStart}>Start</button>
          </div>
        ) : (
          <>
            <div className="chat-window">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                  {msg.message}
                </div>
              ))}
            </div>

            
              <div className="input-section">
                <input
                  type="text"
                  className="answer-input"
                  placeholder="Type your answer"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                      handleNext(e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            

            
              <>
                <div className="recommendation-section">
                  <h3>Recommendations:</h3>
                  <ul>
                    {recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <pre>{rec}</pre>
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={handleClick} className="nextstage">Click for Staged recommendation</button>
              </>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
