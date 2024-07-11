import React, { useState } from "react";
import axios from "axios";
const API_KEY = "AIzaSyCMBWkJwLivkq_SCCk666vo6nV7ytZeBvs";
const card = [
  {
    icon: "far fa-comment",
    heading: "What is Comment Picker?",
    description:
      "Comment Picker is the premier platform offering over 85 free tools for giveaways, contests, and social media. It provides a variety of useful and fun online applications designed to enhance your online presence and engagement. Easily run contests, pick winners, and enjoy seamless social media management .",
    button: "Read our story",
    btn_icon: "fas fa-chevron-circle-right",
  },
  {
    icon: "fa-solid fa-trophy",
    heading: "Contests & giveaways",
    description:
      "Are you ready to select a winner for your giveaway on Instagram, Facebook, YouTube, X (Twitter), TikTok, or Reddit? Our versatile comment picker makes it easy! Simply enter the details, and our tool will help you choose a lucky winner from any of these platforms quickly and effortlessly.",
    button: "View all Giveaway Tools",
    btn_icon: "fas fa-chevron-circle-right",
  },
  {
    icon: "fas fa-question-circle",
    heading: "Help Center",
    description:
      "Learn how to utilize the Comment Picker platform effectively with our comprehensive resources. Access video tutorials, detailed how-to guides,find to the most frequently asked questions. Master the tools and features to seamlessly select winners and enhance your experience with the Comment Picker platform.",
    button: "Go to help center",
    btn_icon: "fas fa-chevron-circle-right",
  },
];
const Home = () => {
  const [data, setData] = useState("");
  const [winner, setWinner] = useState({ name: "....?", comment: "...?" });
  const [tempWinner, setTempWinner] = useState({}); // For displaying changing comments
  const [error, setError] = useState("");

  const getData = async (url) => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&videoId=${url}&part=snippet&maxResults=100`
    );
    let comments = response.data.items;

    let randomNum = Math.floor(Math.random() * comments.length);

    // Temporarily show different comments
    let i = 0;
    let timer = setInterval(() => {
      setTempWinner({
        name: comments[i].snippet.topLevelComment.snippet.authorDisplayName,
        comment: comments[i].snippet.topLevelComment.snippet.textOriginal,
      });
      if (i >= comments.length - 1) i = 0;
      else i++;
    }, 100);

    // Stop the timer after 3 seconds and set the final winner
    setTimeout(() => {
      clearInterval(timer);
      selectWinner(comments[randomNum]);
    }, 5000);
  };

  const selectWinner = (comment) => {
    setWinner({
      name: comment.snippet.topLevelComment.snippet.authorDisplayName,
      comment: comment.snippet.topLevelComment.snippet.textOriginal,
    });
    setWinner({
      name: "Shiyas",
      comment: "welldone",
    });
  };

  const handleSubmit = (e) => {
    setWinner({ name: "....?", comment: "...?" });
    e.preventDefault();
    try {
      const regex =
       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
      var validationErr="";
      if (!data.trim()) {
        validationErr = "Empty Field not allowed";
      } else if (!data.match(regex)) {
        validationErr = "Enter correct format";
      }
      setError(validationErr)
      if (validationErr.length === 0) {
        let url = data.replace("https://www.youtube.com/watch?v=", "");
        console.log(url);
        getData(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-400 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center my-2 bg-[#f5f5f5] mt-6 p-4 rounded-xl">
        <i className="fa-solid fa-trophy border p-3 rounded-3xl"></i>
      </div>
      <div className="max-w-2xl text-center m-3">
        <h2 className="text-xl mt-1 text-white font-bold">
          CONTEST & GIVEAWAY TOOLS
        </h2>
        <p className="text-white text-center text-sm">
          Discover all our free tools to select a winner for a contest, giveaway
        </p>
      </div>

      <div className="flex flex-col items-center p-4 rounded-lg bg-slate-400 my-2 w-full">
        <form className="flex gap-1">
          <input
            type="text"
            className="bg-white rounded-lg p-1"
            placeholder="Enter instgram url here...."
            onChange={(e) => {
              setError(""), setData(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-white rounded-lg p-1 hover:bg-slate-500 hover:text-white"
            onClick={handleSubmit}
          >
            Click
          </button>
        </form>
        {error&&(
            <p className="text-red-600 text-center">*{error}</p>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-medium text-white pb-1 my-4">Winner</h2>
          {winner && (
            <>
              <p className="text-red-700 font-bold">Name: {winner.name}</p>
              <p className="text-red-700 font-bold">Comment:{winner.comment}</p>
            </>
          )}
        </div>
        <div className="text-center my-3">
          <h2 className="text-3xl font-medium text-white pb-4">
            Randomly Picking...
          </h2>
          {tempWinner && (
            <>
              <p className="text-red-700 font-bold">{tempWinner.name}</p>
              <p className="text-red-700 font-bold">{tempWinner.comment}</p>
            </>
          )}
        </div>
      </div>

      {/* card start */}
      <div className="bg-slate-500 w-full py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white my-2">
            RANDOM COMMENT PICKER
          </h1>
          <p className="text-white font-medium">
            Our latest comment picker is here. Effortlessly select our winner
          </p>
        </div>
        <div className="my-3 flex flex-col gap-2 sm:flex-row flex-wrap items-center justify-center">
          {card &&
            card.map((items, idx) => (
              <div
                className="max-w-xs md:max-w-sm h-96 p-5 rounded-lg flex flex-col items-center justify-evenly bg-white"
                key={idx}
              >
                <i
                  className={`my-4 text-white p-3 rounded-lg bg-slate-500 ${items.icon}`}
                ></i>
                <h2 className="text-2xl font-semibold my-2">{items.heading}</h2>
                <p className="text-justify text-sm lg:text-md">
                  {items.description}
                </p>
                <a
                  href=""
                  className="bg-slate-500 p-2 rounded-lg my-4 text-white"
                >
                  {items.button} <i className={items.btn_icon}></i>{" "}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
