var pool = require('../db/index');

exports.chatroomGetAll = (req, res) => {
    const { s_id, isStudyGroup } = req.body

    pool.query(`SELECT chatrooms.chat_id, s_name, icon, content, sent FROM chatrooms JOIN members ON chatrooms.chat_id=members.chat_id JOIN students ON members.s_id=students.s_id LEFT OUTER JOIN messages ON chatrooms.chat_id=messages.chat_id WHERE members.s_id IN (SELECT members.s_id FROM members JOIN students ON members.s_id=students.s_id WHERE chat_id IN (SELECT chat_id FROM members WHERE s_id=${s_id}) AND members.s_id != ${s_id}) AND isStudyGroup=${isStudyGroup} GROUP BY chatrooms.chat_id ORDER BY sent;`, (err, results) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, chatrooms: results });
            }
        }
    });
};

exports.chatroomCreate = (req, res) => {
    const { s_id } = req.body

    pool.query(`INSERT INTO chatrooms (isStudyGroup) VALUES (0); SELECT LAST_INSERT_ID();`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            const chat_id = result[1][0]['LAST_INSERT_ID()']
            pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s_id})`, (err, result) => {
                if (err) {
                    res.json({ error: err })
                }
                else {
                    res.json({ code: 200 })
                }
            });
        }
    });
};

exports.chatroomMemberAdd = (req, res) => {
    const { chat_id, s_id } = req.body

    pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s_id})`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200 })
        }
    });
};

exports.chatroomMemberRemove = (req, res) => {
    const { chat_id, s_id } = req.body

    pool.query(`DELETE FROM members WHERE chat_id=${chat_id} AND s_id=${s_id}`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200 })
        }
    });
};

exports.getMessages = (req, res) => {
    const { chat_id } = req.body;

    pool.query(`SELECT message_id, messages.s_id, s_name, content, sent FROM messages JOIN students ON messages.s_id=students.s_id WHERE chat_id=${chat_id} ORDER BY sent`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200, messages: result });
        }
    });
}

exports.sendMessage = (req, res) => {
    const { chat_id, s_id, content } = req.body;

    pool.query(`INSERT INTO messages (chat_id, s_id, content, sent) VALUES (${chat_id}, ${s_id}, '${content}', CURRENT_TIMESTAMP())`, (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ code: 200 })
        }
    });
}