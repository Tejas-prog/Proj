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
      "What is the spacing between your plants? [specify plant name : watermelon/muskmelon/cucumber/pumpkin]",
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
          "🌡️ Ideal temp: 25–35°C for Watermelon/Muskmelon, 20–30°C for Cucumber/Pumpkin.",
          "🌱 Hybrid seeds preferred for better yield and disease resistance.",
          "🧪 Seed treatment (fungicide & biofertilizer) boosts germination health.",
          "📏 Proper spacing is crucial based on crop variety.",
          "🌿 Direct sowing for most, nursery for cucumber.",
          "🧬 Basal NPK important before sowing."
        );
        break;
      case "germination":
        recs.push(
          "🧼 Re-sow gaps if germination is not uniform.",
          "🐛 Monitor for pests and use neem oil or organic sprays.",
          "💧 Keep soil moist, avoid overwatering.",
          "🌾 Mulching helps retain moisture and suppress weeds."
        );
        break;
      case "vegetative":
        recs.push(
          "📏 Plant height should be healthy for your crop.",
          "🍃 Yellowing = nitrogen deficiency. Apply compost/urea.",
          "🧪 Fertilize based on NPK needs of your crop.",
          "🌿 Weed control via mulching or manual methods.",
          "🚨 Wilting = check for root rot, improve drainage."
        );
        break;
      case "flowering":
        recs.push(
          "🌸 Flowering begins around 25–45 days depending on crop.",
          "🌼 Ensure male/female flower balance for good pollination.",
          "🐝 Hand pollination or bees can improve yields.",
          "🍈 Prevent early fruit drop with calcium nitrate.",
          "🌿 Use P & K fertilizers and growth regulators wisely."
        );
        break;
      case "harvesting":
        recs.push(
          "🍉 Watermelon: 80–100 days, Muskmelon: 70–90 days.",
          "✅ Size, color, and firmness indicate ripeness.",
          "🍂 Avoid fruit cracking by uniform irrigation.",
          "💧 Reduce water before harvest for better shelf life."
        );
        break;
      case "postHarvest":
        recs.push(
          "📦 Store in cool, dry places or cold chains.",
          "🚚 Pack in ventilated crates to avoid spoilage.",
          "🛒 Explore local mandis or online agri markets.",
          "📈 Dip in fungicide to increase shelf life."
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
