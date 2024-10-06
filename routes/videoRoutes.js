import express from "express";
// const { v4: uuid } = require("uuid");
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
import fs from "fs";

// ROUTE TO GET LIST OF ALL VIDEOS
router.get("/", (req, res)=>{
    try {
        const videoList = fs.readFileSync("./data/videos.json", )
        const parsedVideoData = JSON.parse(videoList);
        res.status(200).json(parsedVideoData);
    } catch (error) {
        res.status(500).json({ message: { error } });
    }
});

// ROUTE FOR GETTING VIDEO DETAILS FOR A SPECIFIC VIDEOID
router.get("/:id", (req, res)=>{
    try {
        const videoDetailsList = fs.readFileSync("./data/video-details.json", )
        const parsedVideoData = JSON.parse(videoDetailsList);
        const videoId = req.params.id;
        const foundVideo = parsedVideoData.find(video=>video.id===videoId);
        res.status(200).json(foundVideo);
    } catch (error) {
        res.status(500).json({ message: { error } });
    }
});

// ROUTE FOR LIKING A VIDEO
router.put("/:videoId/likes", (req, res)=>{
    try {
        const data = fs.readFileSync("./data/video-details.json", );
        let videoData = JSON.parse(data);
        for (let i = 0; i < videoData.length; i++) {
            if (videoData[i].id === req.params.videoId) {
                videoData[i].likes = (parseInt((videoData[i].likes).replaceAll(",", "")) + 1)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData));
        const videoId = req.params.videoId;
        const foundVideo = videoData.find(video=>video.id===videoId);
        res.status(200).json(foundVideo);
        // res.status(200).json(videoData);
    } catch (error) {
        res.status(500).json({ message: { error } });
    }
});

//ROUTE FOR POSTING COMMENTS
router.post("/:videoId/comments", (req, res) => {
    try {
        console.log("Posting comments")
        const data = fs.readFileSync("./data/video-details.json", );
        let videoData = JSON.parse(data);
        const { name, comment } = req.body;
        if (name && comment) {
            const newComment = {
            id: uuidv4(),
            name,
            comment,
            likes: 0,
            timestamp: Date.now(),
            };
            for (let i = 0; i < videoData.length; i++) {
                if (videoData[i].id === req.params.videoId) {
                    videoData[i].comments.push(newComment);
                }
            }
            fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData));
            res.status(201).json(newComment);
        } else {
            res
            .status(400)
            .json("Error! Make sure the comment object has the right structure");
        }
    } catch (error) {
      res.status(500).json({ message: { error } });
    }
});

//ROUTE FOR DELETING COMMENTS
router.delete("/:videoId/comments/:commentId", (req, res) => {
    try {
      const data = fs.readFileSync("./data/video-details.json", "utf-8");
      let videoData = JSON.parse(data);
      const newVideoData = videoData.map((video) => {
        if (video.id === req.params.videoId) {
          const newCommentArr = video.comments.filter(
            (comment) => comment.id !== req.params.commentId
          );
          video.comments = newCommentArr;
        }
        return video;
      });
      fs.writeFileSync("./data/video-details.json", JSON.stringify(newVideoData));
      res.status(200).send("comment deleted");
    } catch (error) {
      res.status(500).send("Problem comes from the server");
    }
});

export default router;