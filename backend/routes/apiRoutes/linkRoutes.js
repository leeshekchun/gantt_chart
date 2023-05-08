const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

async function serverСonfig() {

    // add link
	router.post("/data/link", (req, res) => {
		let link = getLink(req.body);

		db.query("INSERT INTO gantt_links(source, target) VALUES (?,?)",
			[link.source, link.target])
			.then(result => {
				sendResponse(res, "inserted", result.insertId);
			})
			.catch(error => {
				sendResponse(res, "error", null, error);
			});
	});

	// update link
	router.put("/data/link/:id", (req, res) => {
		let sid = req.params.id,
			link = getLink(req.body);

		db.query("UPDATE gantt_links SET source = ?, target = ?, WHERE id = ?",
			[link.source, link.target, sid])
			.then(result => {
				sendResponse(res, "updated");
			})
			.catch(error => {
				sendResponse(res, "error", null, error);
			});
	});

	// delete link
	router.delete("/data/link/:id", (req, res) => {
		let sid = req.params.id;
		db.query("DELETE FROM gantt_links WHERE id = ?",
			[sid])
			.then(result => {
				sendResponse(res, "deleted");
			})
			.catch(error => {
				sendResponse(res, "error", null, error);
			});
	});

	function getLink(data) {
		return {
			source: data.source,
			target: data.target
		};
	}

	function sendResponse(res, action, tid, error) {

		if (action === "error")
			console.log(error);

		let result = {
			action: action
		};
		if (tid !== undefined && tid !== null)
			result.tid = tid;

		res.send(result);
	}
};

serverСonfig()

module.exports = router;