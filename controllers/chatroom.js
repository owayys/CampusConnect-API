var pool = require('../db/index');

exports.chatroomGetAll = (req, res) => {
    const {s_id} = req.body

    pool.query(`SELECT chatrooms.chat_id, name, icon FROM chatrooms JOIN members ON chatrooms.chat_id=members.chat_id WHERE s_id=${s_id}`, (err, results) => {
        if (err) throw err;
        else {
            if (results.length === 0) {
                res.json({code: 401});
            }
            else if (!results[0]) {
                res.json({code: 401});
            }
            else {
                res.json({code: 200, chatrooms: results});
            }
        }
    });
};

exports.chatroomCreate = (req, res) => {
    const {s_id, name, description, icon} = req.body

    pool.query(`INSERT INTO chatrooms (name, description, icon) VALUES ('${name}', '${description}', '${icon}'); SELECT LAST_INSERT_ID();`, (err, result) => {
        if (err) throw err;
        else {
            const chat_id = result[1][0]['LAST_INSERT_ID()']
            pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s_id})`, (err, result) => {
                if (err) throw err;
                else {
                    res.json({code: 200})
                }
            });
        }
    });
};

exports.getMessages = (req, res) => {
    const { chat_id } = req.body;

    pool.query(`SELECT message_id, s_id, content, sent FROM messages WHERE chat_id=${chat_id} ORDER BY sent`, (err, result) => {
        if (err) throw err;
        else {
            res.json({code: 200, messages: result});
        }
    });
}

exports.sendMessage = (req, res) => {
    const { chat_id, s_id, content } = req.body;

    pool.query(`INSERT INTO messages (chat_id, s_id, content, sent) VALUES (${chat_id}, ${s_id}, '${content}', CURRENT_TIMESTAMP())`, (err, result) => {
        if (err) throw err;
        else {
            res.json({code: 200})
        }
    });
}