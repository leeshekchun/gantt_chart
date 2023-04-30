const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/api/data', (req, res) => {
    const sql = `SELECT * FROM gantt_tasks`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
async function serverСonfig() {

  // get all data
  router.get("/data", (req, res) => {
    Promise.all([
        db.query("SELECT * FROM gantt_tasks ORDER BY start_date ASC"),
        db.query("SELECT * FROM gantt_links")
    ]).then(results => {
        let tasks = results[0],
            links = results[1];

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
            tasks[i].open = true;
        }

        res.send({
            data: tasks,
            collections: { links: links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// add new task
router.post("/data/task", (req, res) => { // adds new task to database
    let task = getTask(req.body);

    db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
        .then(result => { /*!*/ // assign max sort order to new task
            let orderIndex = (result[0].maxOrder || 0) + 1;
            return db.query("INSERT INTO gantt_tasks(task, start_date, duration, sortorder) VALUES (?,?,?,?)",
                [task.text, task.start_date, task.duration, orderIndex]);
        })
        .then(result => {
            sendResponse(res, "inserted", result.insertId);
        })
        .catch(error => {
            sendResponse(res, "error", null, error);
        });
});

// update task
router.put("/data/task/:id", (req, res) => {
    let sid = req.params.id,
        target = req.body.target,
        task = getTask(req.body);

    Promise.all([
        db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, duration = ?, WHERE id = ?",
            [task.text, task.start_date, task.duration, sid]),
        updateOrder(sid, target)
    ])
        .then(result => {
            sendResponse(res, "updated");
        })
        .catch(error => {
            sendResponse(res, "error", null, error);
        });
});

// update order
function updateOrder(taskId, target) {
    let nextTask = false;
    let targetOrder;

    target = target || "";

    if (target.startsWith("next:")) {
        target = target.substr("next:".length);
        nextTask = true;
    }

    return db.query("SELECT * FROM gantt_tasks WHERE id = ?",
        [target])
        .then(result => {
            if (!result[0])
                return Promise.resolve();

            targetOrder = result[0].sortorder;
            if (nextTask)
                targetOrder++;

            return db.query("UPDATE gantt_tasks SET sortorder = sortorder + 1 WHERE sortorder >= ?",
                [targetOrder])
                .then(result => {
                    return db.query("UPDATE gantt_tasks SET sortorder = ? WHERE id = ?",
                        [targetOrder, taskId]);
                });
        });
}

// delete task
router.delete("/data/task/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid])
        .then(result => {
            sendResponse(res, "deleted");
        })
        .catch(error => {
            sendResponse(res, "error", null, error);
        });
});

	function getTask(data) {
		return {
			text: data.text,
			start_date: data.start_date.date("YYYY-MM-DD"),
			duration: data.duration
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

serverСonfig();

module.exports = router;