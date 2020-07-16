const express = require("express");
const app = express();
const axios = require("axios");
const Anime = require("./Anime");


//calling API

//localhost:5000/getArtist?artist_search=artistName
app.get("/getAnime", (req, res) => {
	const anime_search =
		req.query.anime_search == "" ? "jojo" : req.query.anime_search;

	const querystr = `http://kitsu.io/api/edge/anime/?filter[text]=${anime_search}`;

	axios
		.get(querystr)
		.then((response) => {
	
			res.send(response.data);
	
		})
		.catch((error) => {
			res.status(400).json(error);
		});
});




//localhost:5000/saveArtist?artist_id=artistID
app.get("/saveAnime", (req, res) => {
	const anime_id = req.query.anime_id;

	const querystr = `http://kitsu.io/api/edge/anime/${anime_id}/`;

	axios
		.get(querystr)
		.then((response) => {
			const anime = new Anime({
				ID: response.data.id,
				title: response.data.attributes["canonicalTitle"],
				image: response.data.attributes.posterImage.medium,
				rating: response.data.attributes["averageRating"],
				episodes: response.data.attributes["episodeCount"],
			});

			anime
			.save()
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(400).json(error);
			});

		res.send(response.data);
	})
	.catch((error) => {
		res.status(400).json(error);
	});
});

//localhost:5000/getAllArtist
app.get("/getAllAnime", (req, res) => {
	Anime.find({})
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(400).json(error);
		});
	});


//localhost:5000/getSameArtist
app.get("/getSameAnime", (req, res) => {
	Anime.findOne({ ID: req.query.anime_id })
		.then((response) => {
			if(response) {
				res.send(true);
			} else {
				res.send(false);
			}
			// res.status(200).json(response);
		})
		.catch((error) => {
			res.status(400).json(error);
		});
});



// heroku
if (process.env.NODE_ENV === "production") {
	// Exprees will serve up production assets
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
