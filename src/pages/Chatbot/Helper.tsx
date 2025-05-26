// import { useState } from "react";
// import "./helper.css";
// import { useLocation } from "react-router-dom";

// const CropHelper = ({ sowingDate = "" }) => {
//   const location = useLocation();
//   const { days1 } = location.state || { days1: 0 };
//   const {recommendations1}=location.state;
//   const [answers, setAnswers] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [messages, setMessages] = useState<any>([]);
//   console.log('saddkj ',recommendations);
// console.log(sowingDate)
//   const getStage = (days = 1) => {
//     if (days <= 10) return "sowing";
//     if (days <= 20) return "germination";
//     if (days <= 40) return "vegetative";
//     if (days <= 60) return "flowering";
//     if (days <= 90) return "harvesting";
//     return "postHarvest";
//   };

//   const stage = getStage(days1);

//   const questionBank = {
//     sowing: [
//       "What is the current temperature in your region?",
//       "Are you using hybrid or local seeds? [hybrid/local]",
//       "Have you treated the seeds with fungicide or biofertilizer? [yes/no]",
//       "What is the spacing between your plants? [specify plant name : watermelon/muskmelon/cucumber/pumpkin]",
//       "Are you sowing seeds directly or using a nursery? [direct/nursery]",
//       "Have you applied a basal dose of NPK before sowing? [yes/no]",
//     ],
//     germination: [
//       "Have the seeds germinated uniformly? [yes/no]",
//       "Are there any signs of pest attacks or diseases? [yes/no]",
//       "Are you following a regular irrigation schedule? [yes/no]",
//       "Are you using mulch or plastic covers? [yes/no]",
//     ],
//     vegetative: [
//       "How tall are the plants currently? (in meters)",
//       "Are you observing yellowing of leaves? (Yes/No)",
//       "Have you applied fertilizers? (Yes/No)",
//       "Are you using any weed control methods? (Yes/No)",
//       "Is there any unusual wilting or stunted growth? (Yes/No)",
//     ],
//     flowering: [
//       "Have flowers started appearing? (Yes/No)",
//       "Are there enough male and female flowers? (Yes/No)",
//       "Are you observing pollination issues? (Yes/No)",
//       "Have you noticed fruit drop at an early stage? (Yes/No)",
//       "Have you applied any growth regulators? (Yes/No)",
//     ],
//     harvesting: [
//       "How many days since fruit formation?",
//       "Are the fruits reaching expected size and color? (Yes/No)",
//       "Have you observed any cracking or rotting of fruits? (Yes/No)",
//       "Are you following proper irrigation schedules? (Yes/No)",
//     ],
//     postHarvest: [
//       "Are you using any storage techniques? (Yes/No)",
//       "Do you need guidance on packaging and transportation? (Yes/No)",
//       "Are you interested in connecting with local markets? (Yes/No)",
//       "Do you want tips on increasing shelf life? (Yes/No)",
//     ],
//   };

//   const handleAnswer = (index=0, value="") => {
//     const updatedAnswers:any = [...answers];
//     updatedAnswers[index] = value;
//     setAnswers(updatedAnswers);

//     const newMessages:any = [...messages];
//     newMessages.push({ from: "user", text: value });

//     if (index + 1 < questionBank[stage].length) {
//       newMessages.push({ from: "bot", text: questionBank[stage][index + 1] });
//     }

//     setMessages(newMessages);
//   };

//   const handleStart = () => {
//     setMessages([
//       {
//         from: "bot",
//         text: `🌾 Crop Stage: ${stage.charAt(0).toUpperCase() + stage.slice(1)}`,
//       },
//       { from: "bot", text: questionBank[stage][0] },
//     ]);
//   };

//   const handleSubmit = () => {
//   const recs:any = getRecommendations(stage, answers);

//   // Combine recommendations1 (from location.state) and recs (stage based)
//   const combinedRecs:any = [
//     ...(recommendations1 || []), // existing recommendations1 if any
//     ...recs,
//   ];

//   setRecommendations(combinedRecs);

//   setMessages((prev:any) => [
//     ...prev,
//     { from: "bot", text: `📋 Recommendations for ${stage.toUpperCase()} Stage:` },
//     ...combinedRecs.map((r:any) => ({ from: "bot", text: r })),
//   ]);
//   setSubmitted(true);
// };


//   const getRecommendations = (stage:any, responses:any) => {
//     console.log(responses)
//     const recs = [];
//     switch (stage) {
//       case "sowing":
//         recs.push(
//           "🌡️ Ideal temp: 25–35°C for Watermelon/Muskmelon, 20–30°C for Cucumber/Pumpkin.",
//           "🌱 Hybrid seeds preferred for better yield and disease resistance.",
//           "🧪 Seed treatment (fungicide & biofertilizer) boosts germination health.",
//           "📏 Proper spacing is crucial based on crop variety.",
//           "🌿 Direct sowing for most, nursery for cucumber.",
//           "🧬 Basal NPK important before sowing."
//         );
//         break;
//       case "germination":
//         recs.push(
//           "🧼 Re-sow gaps if germination is not uniform.",
//           "🐛 Monitor for pests and use neem oil or organic sprays.",
//           "💧 Keep soil moist, avoid overwatering.",
//           "🌾 Mulching helps retain moisture and suppress weeds."
//         );
//         break;
//       case "vegetative":
//         recs.push(
//           "📏 Plant height should be healthy for your crop.",
//           "🍃 Yellowing = nitrogen deficiency. Apply compost/urea.",
//           "🧪 Fertilize based on NPK needs of your crop.",
//           "🌿 Weed control via mulching or manual methods.",
//           "🚨 Wilting = check for root rot, improve drainage."
//         );
//         break;
//       case "flowering":
//         recs.push(
//           "🌸 Flowering begins around 25–45 days depending on crop.",
//           "🌼 Ensure male/female flower balance for good pollination.",
//           "🐝 Hand pollination or bees can improve yields.",
//           "🍈 Prevent early fruit drop with calcium nitrate.",
//           "🌿 Use P & K fertilizers and growth regulators wisely."
//         );
//         break;
//       case "harvesting":
//         recs.push(
//           "🍉 Watermelon: 80–100 days, Muskmelon: 70–90 days.",
//           "✅ Size, color, and firmness indicate ripeness.",
//           "🍂 Avoid fruit cracking by uniform irrigation.",
//           "💧 Reduce water before harvest for better shelf life."
//         );
//         break;
//       case "postHarvest":
//         recs.push(
//           "📦 Store in cool, dry places or cold chains.",
//           "🚚 Pack in ventilated crates to avoid spoilage.",
//           "🛒 Explore local mandis or online agri markets.",
//           "📈 Dip in fungicide to increase shelf life."
//         );
//         break;
//       default:
//         recs.push("No recommendations found.");
//     }
//     return recs;
//   };

//   return (
//     <div className="outer">
//       <div className="chatbot-container">
//         <h2 className="title">🌱 Crop Helper Assistant</h2>

//         {!messages.length && (
//           <button className="start-button" onClick={handleStart}>
//             Start Diagnosis
//           </button>
//         )}

//         <div className="chat-box">
//           {messages.map((msg:any, idx:any) => (
//             <div key={idx} className={`msg ${msg.from}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {!submitted &&
//   messages.length > 1 &&
//   answers.length < questionBank[stage].length && (
//     <div className="input-area">
//       <input
//         type="text"
//         placeholder="Your answer"
//         onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
//           if (e.key === "Enter") {
//             handleAnswer(answers.length, e.currentTarget.value);
//             e.currentTarget.value = "";
//           }
//         }}
//       />
//     </div>
//   )}


//         {!submitted && answers.length === questionBank[stage].length && (
//           <button className="submit-button" onClick={handleSubmit}>
//             Get Recommendations
//           </button>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default CropHelper;
import { useState } from "react";
import "./helper.css";
import { useLocation } from "react-router-dom";

const CropHelper = ({ sowingDate = "" }) => {
  const location = useLocation();
  const { days1 } = location.state || { days1: 0 };
  const {recommendations1}=location.state;
  const [answers, setAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  console.log('saddkj ',recommendations);
console.log(sowingDate)
  const getStage = (days = 1) => {
    if (days <= 10) return "sowing";
    if (days <= 20) return "germination";
    if (days <= 40) return "vegetative";
    if (days <= 60) return "flowering";
    if (days <= 90) return "harvesting";
    return "postHarvest";
  };

  const stage = getStage(days1);

  const questionBank = {
    sowing: [
      "What is the current temperature in your region?",
      "Are you using hybrid or local seeds? [hybrid/local]",
      "Have you treated the seeds with fungicide or biofertilizer? [yes/no]",
      "What is the spacing between your plants? [in meters]",
      "Are you sowing seeds directly or using a nursery? [direct/nursery]",
      "Have you applied a basal dose of NPK before sowing? [yes/no]",
    ],
    germination: [
      "Have the seeds germinated uniformly? [yes/no]",
      "Are there any signs of pest attacks or diseases? [yes/no]",
      "Are you following a regular irrigation schedule? [yes/no]",
      "Are you using mulch or plastic covers? [yes/no]",
    ],
    vegetative: [
      "How tall are the plants currently? (in meters)",
      "Are you observing yellowing of leaves? (Yes/No)",
      "Have you applied fertilizers? (Yes/No)",
      "Are you using any weed control methods? (Yes/No)",
      "Is there any unusual wilting or stunted growth? (Yes/No)",
    ],
    flowering: [
      "Have flowers started appearing? (Yes/No)",
      "Are there enough male and female flowers? (Yes/No)",
      "Are you observing pollination issues? (Yes/No)",
      "Have you noticed fruit drop at an early stage? (Yes/No)",
      "Have you applied any growth regulators? (Yes/No)",
    ],
    harvesting: [
      "How many days since fruit formation?",
      "Are the fruits reaching expected size and color? (Yes/No)",
      "Have you observed any cracking or rotting of fruits? (Yes/No)",
      "Are you following proper irrigation schedules? (Yes/No)",
    ],
    postHarvest: [
      "Are you using any storage techniques? (Yes/No)",
      "Do you need guidance on packaging and transportation? (Yes/No)",
      "Are you interested in connecting with local markets? (Yes/No)",
      "Do you want tips on increasing shelf life? (Yes/No)",
    ],
  };

  const handleAnswer = (index=0, value="") => {
    const updatedAnswers:any = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);

    const newMessages:any = [...messages];
    newMessages.push({ from: "user", text: value });

    if (index + 1 < questionBank[stage].length) {
      newMessages.push({ from: "bot", text: questionBank[stage][index + 1] });
    }

    setMessages(newMessages);
  };

  const handleStart = () => {
    setMessages([
      {
        from: "bot",
        text: `🌾 Crop Stage: ${stage.charAt(0).toUpperCase() + stage.slice(1)}`,
      },
      { from: "bot", text: questionBank[stage][0] },
    ]);
  };

  const handleSubmit = () => {
  const recs:any = getRecommendations(stage, answers);

  // Combine recommendations1 (from location.state) and recs (stage based)
  const combinedRecs:any = [
    ...(recommendations1 || []), // existing recommendations1 if any
    ...recs,
  ];

  setRecommendations(combinedRecs);

  setMessages((prev:any) => [
    ...prev,
    { from: "bot", text: `📋 Recommendations for ${stage.toUpperCase()} Stage:` },
    ...combinedRecs.map((r:any) => ({ from: "bot", text: r })),
  ]);
  setSubmitted(true);
};


  const getRecommendations = (stage:any, responses:any) => {
    console.log(responses)
    const recs = [];
    switch (stage) {
      case "sowing":
        recs.push(
          // "🌡️ Ideal temp: 25–35°C for Watermelon/Muskmelon, 20–30°C for Cucumber/Pumpkin.",
          // "🌱 Hybrid seeds preferred for better yield and disease resistance.",
          // "🧪 Seed treatment (fungicide & biofertilizer) boosts germination health.",
          // "📏 Proper spacing is crucial based on crop variety.",
          // "🌿 Direct sowing for most, nursery for cucumber.",
          // "🧬 Basal NPK important before sowing."
           "if 25<temp<35 then Ideal temperature for Watermelon & Muskmelon.\n If 20<temp<30 then Ideal temperature for Cucumber & Pumpkin.\nElse Temperature may not be ideal; consider protective measures to maintain ideal temperatures: Watermelon & Muskmelon: 25-35°C. Cucumber & Pumpkin: 20-30°C.",
         "If using hybrid seeds, Good choice! Hybrid seeds offer better yield and disease resistance.\nIf using local seeds Consider using hybrid seeds for better yield and disease resistance.",
           "Fungicide and biofertilizer help in healthy germination\nIf no treatment with  fungicide or biofertilizers then Treat seeds with Carbendazim or Trichoderma viride for disease prevention. Use Azospirillum for nitrogen fixation.",
         "Recommended spacing for ",
        '"watermelon": "1.5m x 1m"',
        '"muskmelon": "1.5m x 1m"',
        '"cucumber": "60cm x 45cm"',
        '"pumpkin": "2m x 1m"',
        "Ensure correct method for each crop: Direct sowing (Watermelon, Muskmelon, Pumpkin), Nursery (Cucumber).",
        "Recommended 50% N, full P, and 50% K before sowing for strong root growth.\nApply biofertilizers like Azospirillum to fix nitrogen and phosphate-solubilizing bacteria for phosphorus uptake.",
        );
        break;
      case "germination":
        recs.push(
          // "🧼 Re-sow gaps if germination is not uniform.",
          // "🐛 Monitor for pests and use neem oil or organic sprays.",
          // "💧 Keep soil moist, avoid overwatering.",
          // "🌾 Mulching helps retain moisture and suppress weeds."
           " If days<10 then it's too early for germination. Keep soil moist and wait.\n If days>10 then Germination should have started. Check for uniformity.\nIf no germination after 10th day, consider re-sowing.",
         "If seeds have not germinated uniformly,Re-sow in gaps for uniform plant distribution.",
          "Recommended spacing for ",
        '"watermelon": "1.5m x 1m"',
        '"muskmelon": "1.5m x 1m"',
        '"cucumber": "60cm x 45cm"',
        '"pumpkin": "2m x 1m"',
         "If there are signs of pest attack or diseases,\nCommon pests: Aphids, whiteflies, red beetles. Use neem oil or insecticides. For diseases like damping-off or downy mildew, apply Bordeaux mixture.",
         "If not following a regular irrigation schedule,Keep soil moist but avoid waterlogging. Drip irrigation is best.",
         "Mulching helps retain moisture and prevent weeds. Consider using it.",
         "Apply biofertilizers like Azospirillum to fix nitrogen and phosphate-solubilizing bacteria for phosphorus uptake.",
        );
        break;
      case "vegetative":
        recs.push(
         "Ideal plant height:\n- Watermelon & Muskmelon: 30-50 cm\n- Cucumber & Pumpkin: 40-70 cm.",
           "Yellowing leaves may indicate nitrogen deficiency or overwatering. Apply urea (1%) or compost.",
           "Apply balanced NPK fertilizers to support healthy growth.",
            "Watermelon & Muskmelon: NPK (60:40:40 kg/ha).\n  - Cucumber & Pumpkin: NPK (80:50:50 kg/ha).",
           "Use hand weeding or mulching for weed control. Avoid chemical herbicides.",
           "Wilting or stunted growth may be caused by root rot. Improve drainage and apply Trichoderma.",
        );
        break;
      case "flowering":
        recs.push(
          // "🌸 Flowering begins around 25–45 days depending on crop.",
          // "🌼 Ensure male/female flower balance for good pollination.",
          // "🐝 Hand pollination or bees can improve yields.",
          // "🍈 Prevent early fruit drop with calcium nitrate.",
          // "🌿 Use P & K fertilizers and growth regulators wisely."
           "Flowering time:\n- Watermelon & Muskmelon: 25-30 days.\n- Cucumber: 30-40 days.\n- Pumpkin: 35-45 days.",
            "If female flowers are low, apply Gibberellic Acid (GA3) 50 ppm to improve flowering balance.",
            "To improve pollination, introduce honeybees or use hand pollination methods.",
            "Early fruit drop could indicate calcium deficiency. Apply calcium nitrate to strengthen fruit development.",
            "For better fruit setting, use Naphthalene Acetic Acid (NAA) at 20 ppm.",
            "Apply a high potassium (K) and phosphorus (P) fertilizer at the flowering stage.",
            "Reduce excess nitrogen (N), which promotes leaf growth over flowers. Increase phosphorus (P) and potassium (K) for better flowering and fruit set.",
        );
        break;
      case "harvesting":
        recs.push(
          // "🍉 Watermelon: 80–100 days, Muskmelon: 70–90 days.",
          // "✅ Size, color, and firmness indicate ripeness.",
          // "🍂 Avoid fruit cracking by uniform irrigation.",
          // "💧 Reduce water before harvest for better shelf life."
          "Expected maturity time:\n- Watermelon: 80-100 days\n- Muskmelon: 75-90 days\n- Cucumber: 50-70 days\n- Pumpkin: 90-120 days.",
        "If fruits are small, increase potassium fertilizer application.",
        "To prevent cracking or rotting, reduce excess watering and avoid direct sun exposure.",
        "Reduce watering before harvest to improve shelf life.",
        "Nitrogen (N): Too much can delay fruit ripening.\nPhosphorus (P) & Potassium (K): Improve fruit size, color, and sweetness.",
        "Reduce nitrogen before harvest to improve fruit shelf life and apply a final dose of potassium for sweetness.",
        );
        break;
      case "postHarvest":
        recs.push(
          // "📦 Store in cool, dry places or cold chains.",
          // "🚚 Pack in ventilated crates to avoid spoilage.",
          // "🛒 Explore local mandis or online agri markets.",
          // "📈 Dip in fungicide to increase shelf life."
          "Storage recommendations:\n- Cucumber & Muskmelon: Refrigeration at 10°C.\n- Watermelon & Pumpkin: Store in dry, cool places.",
        "Use ventilated crates during packaging and transportation to avoid damage.",
        "Consider selling through government portals or contract farming for better market access.",
        "Wax coating or cool storage can help increase shelf life and retain freshness.",
        );
        break;
      default:
        recs.push("No recommendations found.");
    }
    return recs;
  };

  return (
    <div className="outer">
      <div className="chatbot-container">
        <h2 className="title">🌱 Crop Helper Assistant</h2>

        {!messages.length && (
          <button className="start-button" onClick={handleStart}>
            Start Diagnosis
          </button>
        )}

        <div className="chat-box">
          {messages.map((msg:any, idx:any) => (
            <div key={idx} className={`msg ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {!submitted &&
  messages.length > 1 &&
  answers.length < questionBank[stage].length && (
    <div className="input-area">
      <input
        type="text"
        placeholder="Your answer"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleAnswer(answers.length, e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  )}


        {!submitted && answers.length === questionBank[stage].length && (
          <button className="submit-button" onClick={handleSubmit}>
            Get Recommendations
          </button>
        )}
        
      </div>
    </div>
  );
};

export default CropHelper;
